import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RootNodesInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/rootNodes/RootNodesInstance';
import { RootNodesSlashingVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/rootNodes/RootNodesSlashingVotingInstance';
import { ValidatorsInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/validators/ValidatorsInstance';
import { ValidatorsSlashingVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/validators/ValidatorsSlashingVotingInstance';

import { useSlashingActions } from 'pages/Governance/hooks/useSlashingActions';

import { useTransaction } from 'store/transaction/hooks';
import { useUser } from 'store/user/hooks';

import { getRootNodesInstance, getRootNodesSlashingVotingInstance, getValidatorsInstance, getValidatorsSlashingVotingInstance } from 'contracts/contract-instance';

import { isAddress } from 'utils/strings';

function usePurgeSlashing (address: string, isRootSlashing: boolean) {
  const { t } = useTranslation();
  const { purgeSlashing: purgeSlashingAction } = useSlashingActions(isRootSlashing);

  const user = useUser();
  const { successMessage, submitTransaction } = useTransaction();

  const [shouldPurge, setShouldPurge] = useState(false);

  useEffect(() => {
    if (!isAddress(address)) {
      setShouldPurge(false);
      return;
    }

    if (isRootSlashing) {
      checkRootNodesSlashing();
    } else {
      checkValidatorsSlashing();
    }

    return () => setShouldPurge(false);
  }, [address, successMessage, isRootSlashing]);

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

  return { shouldPurge, purgeSlashing };
}

export default usePurgeSlashing;
