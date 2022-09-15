import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RootNodesInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/rootNodes/RootNodesInstance';
import { RootNodesSlashingVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/rootNodes/RootNodesSlashingVotingInstance';
import { ValidatorsInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/validators/ValidatorsInstance';
import { ValidatorsSlashingVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/validators/ValidatorsSlashingVotingInstance';
import { ContractType } from 'typings/contracts';

import { useSlashingActions } from 'pages/Governance/hooks/useSlashingActions';

import { useProposals } from 'store/proposals/hooks';
import { useTransaction } from 'store/transaction/hooks';
import { useUser } from 'store/user/hooks';

import {
  getInstance,
  getRootNodesInstance,
  getRootNodesSlashingVotingInstance,
  getValidatorsInstance,
  getValidatorsSlashingVotingInstance
} from 'contracts/contract-instance';

import { isAddress } from 'utils/strings';

function usePurgeSlashing (address: string, isRootSlashing: boolean) {
  const { t } = useTranslation();
  const { purgeSlashing: purgeSlashingAction } = useSlashingActions(isRootSlashing);

  const user = useUser();
  const { getActiveProposalsByType } = useProposals();
  const { successMessage, submitTransaction } = useTransaction();

  const [shouldPurge, setShouldPurge] = useState(false);
  const [hasActiveProposal, setHasActiveProposal] = useState(false);

  const slashingContractType: ContractType = isRootSlashing
    ? 'rootNodesSlashingVoting'
    : 'validatorsSlashingVoting';
  const proposalEvents = getActiveProposalsByType('slashing')
    .filter((proposal) => proposal.contract === slashingContractType);

  const checkActiveProposals = async () => {
    const slashingContract = await getInstance(slashingContractType)();
    const proposals = await Promise.all(proposalEvents.map(p => slashingContract.getProposal(p.id)));
    setHasActiveProposal(proposals.some(p => p.candidate === address));
  };

  useEffect(() => {
    if (!isAddress(address)) {
      setShouldPurge(false);
      return;
    }

    checkActiveProposals().then(() => {
      if (isRootSlashing) {
        checkRootNodesSlashing();
      } else {
        checkValidatorsSlashing();
      }
    });

    return () => {
      setShouldPurge(false);
      setHasActiveProposal(false);
    };
  }, [address, successMessage, isRootSlashing, proposalEvents.length]);

  const checkRootNodesSlashing = async () => {
    const instance = await getRootNodesInstance();
    const slashingInstance = await getRootNodesSlashingVotingInstance();
    const shouldPurge = await checkPendingProposals(instance, slashingInstance);
    setShouldPurge(shouldPurge);
  };

  const checkValidatorsSlashing = async () => {
    const instance = await getValidatorsInstance();
    const slashingInstance = await getValidatorsSlashingVotingInstance();
    const shouldPurge = await checkPendingProposals(instance, slashingInstance);
    setShouldPurge(shouldPurge);
  };

  const checkPendingProposals = async (
    instance: RootNodesInstance | ValidatorsInstance,
    slashingInstance: RootNodesSlashingVotingInstance | ValidatorsSlashingVotingInstance
  ) => {
    const proposalIds = await instance.getSlashingProposalIds(address);
    const proposalOwners = await Promise.all(
      proposalIds.map(id => slashingInstance.getSlashingProposer(id))
    );

    const pendingProposalIds = proposalIds
      .filter((_, i) => proposalOwners[i] === user.address);
    return pendingProposalIds.length > 0;
  };

  const purgeSlashing = () => {
    if (!shouldPurge) return;

    submitTransaction({
      successMessage: t('PURGE_SUCCESS'),
      submitFn: async () => purgeSlashingAction(address)
    });
  };

  return { shouldPurge, hasActiveProposal, purgeSlashing };
}

export default usePurgeSlashing;
