import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootNodesInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/rootNodes/RootNodesInstance';
import { RootNodesSlashingVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/rootNodes/RootNodesSlashingVotingInstance';
import { ValidatorsInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/validators/ValidatorsInstance';
import { ValidatorsSlashingVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/validators/ValidatorsSlashingVotingInstance';
import { isAddress } from 'web3-utils';

import { successMessageSelector } from 'store/transaction-handler/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';
import { setPurgeSlashing } from 'store/voting/slashing/actions';

import { getRootNodesInstance, getRootNodesSlashingVotingInstance, getValidatorsInstance, getValidatorsSlashingVotingInstance } from 'contracts/contract-instance';

import { CONTRACT_TYPES } from 'constants/contracts';

function usePurgeSlashing (address: string, isRootSlashing: boolean) {
  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);
  const successMessage = useSelector(successMessageSelector);

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
      .filter((_, i) => proposalOwners[i] === userAddress);
    return pendingProposalIds.length > 0;
  };

  const purgeSlashing = () => {
    if (!shouldPurge) return;

    const contractType = isRootSlashing
      ? CONTRACT_TYPES.rootNodes
      : CONTRACT_TYPES.validators;
    dispatch(setPurgeSlashing(address, contractType));
  };

  return { shouldPurge, purgeSlashing };
}

export default usePurgeSlashing;
