
import { getFixedPercentage } from '@q-dev/utils';
import { useWeb3Context } from 'context/Web3ContextProvider';

import {
  getRootNodesInstance,
  getRootNodeSlashingEscrowInstance,
  getValidatorsInstance,
  getValidatorSlashingEscrowInstance,
} from 'contracts/contract-instance';

function getEscrowContractInstance (isRootNode: boolean) {
  return isRootNode
    ? getRootNodeSlashingEscrowInstance()
    : getValidatorSlashingEscrowInstance();
}

export function useSlashingActions (isRootNode: boolean) {
  const { address: accountAddress } = useWeb3Context();

  async function castObjection ({ remark, proposalId }: { remark: string; proposalId: string }) {
    const contract = await getEscrowContractInstance(isRootNode);
    return contract.castObjection(proposalId, remark, { from: accountAddress });
  }

  async function proposeDecision ({ percentage, isAppealNeglected, externalLink, proposalId }: {
    percentage: string;
    isAppealNeglected: boolean;
    externalLink: string;
    proposalId: string;
  }) {
    const contract = await getEscrowContractInstance(isRootNode);
    return contract.proposeDecision(
      proposalId,
      getFixedPercentage(percentage),
      isAppealNeglected,
      externalLink,
      { from: accountAddress }
    );
  }

  async function proposeRemark ({ remark, isAppealConfirmed, proposalId }: {
    remark: string;
    isAppealConfirmed: boolean;
    proposalId: string;
  }) {
    const contract = await getEscrowContractInstance(isRootNode);
    return contract.setProposerRemark(proposalId, remark, isAppealConfirmed, {
      from: accountAddress,
    });
  }

  async function confirmDecision (proposalId: string) {
    const contract = await getEscrowContractInstance(isRootNode);
    const { decision } = await contract.arbitrationInfos(proposalId);
    return contract.confirmDecision(proposalId, decision.hash, { from: accountAddress });
  }

  async function recallDecision (proposalId: string) {
    const contract = await getEscrowContractInstance(isRootNode);
    return contract.recallProposedDecision(proposalId, { from: accountAddress });
  }

  async function executeDecision (proposalId: string) {
    const contract = await getEscrowContractInstance(isRootNode);
    return contract.execute(proposalId, { from: accountAddress });
  }

  async function purgeSlashing (address: string) {
    const contract = isRootNode
      ? await getRootNodesInstance()
      : await getValidatorsInstance();
    return contract.purgePendingSlashings(address, { from: accountAddress });
  }

  return {
    castObjection,
    proposeDecision,
    proposeRemark,
    confirmDecision,
    recallDecision,
    executeDecision,
    purgeSlashing,
  };
}
