import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { ProposalStatus } from '@q-dev/q-js-sdk';
import axios from 'axios';
import { useWeb3Context } from 'context/Web3ContextProvider';
import { ContractTransaction } from 'ethers';
import { ErrorHandler } from 'helpers';
import { ContractType, ProposalEvent } from 'typings/contracts';
import { CreateProposalForm } from 'typings/forms';
import { FormProposalType, Proposal, ProposalType, VotingType } from 'typings/proposals';

import { useDAOSubgraph } from 'hooks/useDAOSubgraph';
import useNetworkConfig from 'hooks/useNetworkConfig';

import {
  setActiveDAOProposalsCount,
  setBaseVotingWeightInfo,
  setConstitutionHash,
  setConstitutionUpdateDate,
  setMinimalActiveBlock,
  setProposals
} from './reducer';

import { useAppSelector } from 'store';
import { useQVault } from 'store/q-vault/hooks';

import { getConstitutionVotingInstance, getInstance, getVotingWeightProxyInstance } from 'contracts/contract-instance';
import { getMinimalActiveBlockHeight } from 'contracts/helpers/block-number';
import { createProposal, getProposalEvents } from 'contracts/helpers/voting';

import { dateToUnix } from 'utils/date';

function getProposalTypeFromFormType (type: CreateProposalForm['type']): FormProposalType {
  switch (type) {
    case 'constitution':
    case 'general':
    case 'emergency':
      return 'q';

    case 'add-root-node':
    case 'remove-root-node':
    case 'exit-root-node':
      return 'rootNode';

    case 'root-slashing':
    case 'validator-slashing':
      return 'slashing';

    case 'add-expert':
    case 'remove-expert':
    case 'parameter-vote':
      return 'expert';
  }
}

function isProposalActive (item: ProposalEvent, minBlock: number) {
  return item.status === 'active' && item.blockNumber >= minBlock;
}

export function useBaseVotingWeightInfo () {
  const dispatch = useDispatch();
  const { constitutionUrl } = useNetworkConfig();
  const { address: accountAddress } = useWeb3Context();

  const newParameter = useAppSelector(({ proposals }) => proposals.newParameter);
  const constitutionHash = useAppSelector(({ proposals }) => proposals.constitutionHash);
  const constitutionUpdateDate = useAppSelector(({ proposals }) => proposals.constitutionUpdateDate);
  const baseVotingWeightInfo = useAppSelector(({ proposals }) => proposals.baseVotingWeightInfo);

  async function getConstitutionHash () {
    try {
      const contract = await getConstitutionVotingInstance();
      const hash = await contract.constitutionHash();
      dispatch(setConstitutionHash(hash));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getConstitutionUpdateDate () {
    try {
      const contract = await getConstitutionVotingInstance();
      const constitutionCaller = axios.create({ baseURL: constitutionUrl });
      const [constitutionsHash, constitutionsRes] = await Promise.all([
        await contract.constitutionHash(),
        constitutionCaller.get('/constitution/list')
      ]);
      const constitution = constitutionsRes.data.find(({ hash }: { hash: string }) => constitutionsHash === `0x${hash}`);
      dispatch(setConstitutionUpdateDate((constitution?.time || 0) * 1000));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function getBaseVotingWeightInfo () {
    try {
      const contract = await getVotingWeightProxyInstance();
      const result = await contract.getBaseVotingWeightInfo(accountAddress, String(dateToUnix()));
      dispatch(setBaseVotingWeightInfo({ ...result }));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  return {
    newParameter,
    constitutionHash,
    baseVotingWeightInfo,

    getConstitutionHash,
    getBaseVotingWeightInfo,
    getConstitutionUpdateDate,
    constitutionUpdateDate,
  };
}

export function useProposals () {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loadDelegationInfo, loadLockInfo } = useQVault();
  const { getBaseVotingWeightInfo } = useBaseVotingWeightInfo();
  const { address: accountAddress, chainId } = useWeb3Context();
  const { loadActiveDAOProposalsCount } = useDaoProposals();

  const minimalActiveBlock = useAppSelector(({ proposals }) => proposals.minimalActiveBlock);
  const proposalsMap = useAppSelector(({ proposals }) => proposals.proposalsMap);
  const proposalValues = useAppSelector(({ proposals }) => Object.values(proposals.proposalsMap));

  const getActiveProposalsByType = (type: ProposalType) => {
    return proposalsMap[type].proposals
      .filter(item => isProposalActive(item, minimalActiveBlock));
  };

  const getEndedProposalsByType = (type: ProposalType) => {
    return proposalsMap[type].proposals
      .filter(item => !isProposalActive(item, minimalActiveBlock));
  };

  const allProposals = proposalValues.reduce((acc, { proposals }) => {
    acc.push(...proposals);
    return acc;
  }, [] as ProposalEvent[]);

  const basicProposals = [...proposalsMap.q.proposals, ...proposalsMap.rootNode.proposals];
  const isProposalsLoading = proposalValues.some(({ isLoading }) => isLoading);
  const activeProposalsCount = allProposals.filter(item => isProposalActive(item, minimalActiveBlock)).length;
  const endedProposalsCount = allProposals.filter(item => !isProposalActive(item, minimalActiveBlock)).length;

  async function getProposals (type: ProposalType) {
    try {
      const { minimalActiveBlockHeight, lastBlockHeight } = await getMinimalActiveBlockHeight();
      const { proposals, lastBlock } = proposalsMap[type];
      const newProposals = await getProposalEvents(type, proposals, lastBlock, chainId);

      dispatch(setProposals({
        type,
        proposals: newProposals,
        lastBlock: Number(lastBlockHeight)
      }));
      dispatch(setMinimalActiveBlock(minimalActiveBlockHeight));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  async function createNewProposal (form: CreateProposalForm) {
    const tx = await createProposal(form, accountAddress);

    return {
      tx,
      onSuccess: () => {
        getBaseVotingWeightInfo();
        loadDelegationInfo(accountAddress);

        const proposalType = getProposalTypeFromFormType(form.type);
        getProposals(proposalType);
      }
    };
  }

  async function voteForProposal ({ proposal, type, isVotedFor }: {
    proposal: Proposal;
    type: VotingType;
    isVotedFor?: boolean;
  }) {
    const contract = await getInstance(proposal.contract)();

    let tx: ContractTransaction | undefined;
    let methodError: string | undefined;
    switch (type) {
      case 'approve':
        if ('approve' in contract) {
          tx = await contract.approve(proposal.id, { from: accountAddress });
        } else {
          methodError = 'approve';
        }
        break;
      case 'constitution':
        if ('veto' in contract) {
          tx = await contract.veto(proposal.id, { from: accountAddress });
        } else {
          methodError = 'veto';
        }
        break;
      case 'basic':
        if ('voteFor' in contract && 'voteAgainst' in contract) {
          tx = isVotedFor
            ? await contract.voteFor(proposal.id, { from: accountAddress })
            : await contract.voteAgainst(proposal.id, { from: accountAddress });
        } else {
          methodError = isVotedFor ? 'voteFor' : 'voteAgainst';
        }
        break;
    }

    if (methodError && !tx) {
      throw new Error(t('ERROR_METHOD_MISSING_FROM_CONTRACT', { method: methodError }));
    }

    return {
      tx: tx as ContractTransaction,
      onSuccess: () => {
        getBaseVotingWeightInfo();
        loadDelegationInfo(accountAddress);
        loadLockInfo(accountAddress);
      }
    };
  }

  async function executeProposal (proposal: Proposal) {
    const contract = await getInstance(proposal.contract)();

    let tx: ContractTransaction | undefined;
    const promiseStatus = await contract.getStatus(proposal.id);

    if (promiseStatus === ProposalStatus.PASSED) {
      if ('execute' in contract) {
        tx = await contract.execute(proposal.id, { from: accountAddress });

        return {
          tx,
          onSuccess: () => {
            getProposalsByContract(proposal.contract);
            getBaseVotingWeightInfo();
            loadDelegationInfo(accountAddress);
          }
        };
      } else {
        throw new Error(t('ERROR_METHOD_MISSING_FROM_CONTRACT', { method: 'execute' }));
      }
    } else {
      getProposalsByContract(proposal.contract);
      getBaseVotingWeightInfo();
      loadDelegationInfo(accountAddress);
    }
  }

  function getProposalsByContract (type: ContractType) {
    switch (type) {
      case 'constitutionVoting':
      case 'emergencyUpdateVoting':
      case 'generalUpdateVoting':
        return getProposals('q');
      case 'rootNodesMembershipVoting':
        return getProposals('rootNode');
      case 'rootNodesSlashingVoting':
      case 'validatorsSlashingVoting':
        return getProposals('slashing');
      case 'epqfiMembershipVoting':
      case 'epdrMembershipVoting':
      case 'epqfiParametersVoting':
      case 'epdrParametersVoting':
      case 'eprsMembershipVoting':
      case 'eprsParametersVoting':
        return getProposals('expert');
      case 'addressVoting':
      case 'upgradeVoting':
        return getProposals('contractUpdate');
    }
  }

  async function getAllProposals () {
    loadActiveDAOProposalsCount();
    getProposals('q');
    // Delay for localstorage sync with lastblock
    setTimeout(() => getProposals('rootNode'), 100);
    setTimeout(() => getProposals('expert'), 200);
    setTimeout(() => getProposals('slashing'), 300);
    setTimeout(() => getProposals('contractUpdate'), 400);

    setTimeout(() => getAllProposals(), 240_000);
  }

  return {
    proposalsMap,
    basicProposals,
    isProposalsLoading,
    activeProposalsCount,
    endedProposalsCount,

    getActiveProposalsByType,
    getEndedProposalsByType,

    getAllProposals: useCallback(getAllProposals, []),
    getProposals: useCallback(getProposals, []),
    getProposalEvents: useCallback(getProposalEvents, []),
    createNewProposal: useCallback(createNewProposal, []),
    voteForProposal: useCallback(voteForProposal, []),
    executeProposal: useCallback(executeProposal, []),
  };
}

export function useDaoProposals () {
  const dispatch = useDispatch();
  const { getActiveDaoProposalsCount } = useDAOSubgraph();

  const activeDAOProposalsCount = useAppSelector(({ proposals }) => proposals.activeDAOProposalsCount);

  async function loadActiveDAOProposalsCount () {
    try {
      const count = await getActiveDaoProposalsCount();
      dispatch(setActiveDAOProposalsCount(count));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  return {
    activeDAOProposalsCount,

    loadActiveDAOProposalsCount: useCallback(loadActiveDAOProposalsCount, []),
  };
}
