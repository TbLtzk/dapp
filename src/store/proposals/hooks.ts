import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ProposalStatus } from '@q-dev/q-js-sdk';
import { ContractType, ProposalEvent } from 'typings/contracts';
import { CreateProposalForm } from 'typings/forms';
import { FormProposalType, Proposal, ProposalType, VotingType } from 'typings/proposals';
import { TransactionReceipt } from 'web3-eth';

import { setBaseVotingWeightInfo, setConstitutionHash, setMinimalActiveBlock, setProposals } from './reducer';

import { getUserAddress, useAppSelector } from 'store';
import { useQVault } from 'store/q-vault/hooks';

import { getConstitutionVotingInstance, getInstance, getVotingWeightProxyInstance } from 'contracts/contract-instance';
import { getMinimalActiveBlockHeight } from 'contracts/helpers/block-number';
import { createProposal, getProposalEvents } from 'contracts/helpers/voting';

import { dateToUnix } from 'utils/date';
import { captureError } from 'utils/errors';

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

  const newParameter = useAppSelector(({ proposals }) => proposals.newParameter);
  const constitutionHash = useAppSelector(({ proposals }) => proposals.constitutionHash);
  const baseVotingWeightInfo = useAppSelector(({ proposals }) => proposals.baseVotingWeightInfo);

  async function getConstitutionHash () {
    try {
      const contract = await getConstitutionVotingInstance();
      const hash = await contract.constitutionHash();
      dispatch(setConstitutionHash(hash));
    } catch (error) {
      captureError(error);
    }
  }

  async function getBaseVotingWeightInfo () {
    try {
      const contract = await getVotingWeightProxyInstance();
      const result = await contract.getBaseVotingWeightInfo(getUserAddress(), String(dateToUnix()));
      dispatch(setBaseVotingWeightInfo({ ...result }));
    } catch (error) {
      captureError(error);
    }
  }

  return {
    newParameter,
    constitutionHash,
    baseVotingWeightInfo,

    getConstitutionHash,
    getBaseVotingWeightInfo
  };
}

export function useProposals () {
  const dispatch = useDispatch();
  const { loadDelegationInfo, loadLockInfo } = useQVault();
  const { getBaseVotingWeightInfo } = useBaseVotingWeightInfo();

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
      const newProposals = await getProposalEvents(type, proposals, lastBlock);

      dispatch(setProposals({
        type,
        proposals: newProposals,
        lastBlock: Number(lastBlockHeight)
      }));
      dispatch(setMinimalActiveBlock(minimalActiveBlockHeight));
    } catch (error) {
      captureError(error);
    }
  }

  async function createNewProposal (form: CreateProposalForm) {
    const userAddress = getUserAddress();
    const receipt = await createProposal(form, userAddress);

    getBaseVotingWeightInfo();
    loadDelegationInfo(userAddress);

    const proposalType = getProposalTypeFromFormType(form.type);
    getProposals(proposalType);

    return receipt;
  }

  async function voteForProposal ({ proposal, type, isVotedFor }: {
    proposal: Proposal;
    type: VotingType;
    isVotedFor?: boolean;
  }) {
    const userAddress = getUserAddress();
    const contract = await getInstance(proposal.contract)();

    let receipt = {} as TransactionReceipt;
    switch (type) {
      case 'approve':
        if ('aprove' in contract) {
          receipt = await contract.aprove(proposal.id, { from: userAddress });
        }
        break;
      case 'constitution':
        if ('veto' in contract) {
          receipt = await contract.veto(proposal.id, { from: userAddress });
        }
        break;
      case 'basic':
        if ('voteFor' in contract && 'voteAgainst' in contract) {
          receipt = isVotedFor
            ? await contract.voteFor(proposal.id, { from: userAddress })
            : await contract.voteAgainst(proposal.id, { from: userAddress });
        }
        break;
    }

    getBaseVotingWeightInfo();
    loadDelegationInfo(userAddress);
    loadLockInfo(userAddress);

    return receipt;
  }

  async function executeProposal (proposal: Proposal) {
    const userAddress = getUserAddress();
    const contract = await getInstance(proposal.contract)();

    let receipt = {} as TransactionReceipt;
    const promiseStatus = await contract.getStatus(proposal.id);

    if (promiseStatus === ProposalStatus.PASSED && 'execute' in contract) {
      receipt = await contract.execute(proposal.id, { from: userAddress });
    }

    getProposalsByContract(proposal.contract);
    getBaseVotingWeightInfo();
    loadDelegationInfo(userAddress);

    return receipt;
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
