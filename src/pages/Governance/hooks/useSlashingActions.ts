
import { getFixedPercentage } from '@q-dev/utils';

import { getUserAddress } from 'store';

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
  async function castObjection ({ remark, proposalId }: { remark: string; proposalId: string }) {
    const contract = await getEscrowContractInstance(isRootNode);
    return contract.castObjection(proposalId, remark, { from: getUserAddress() });
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
      { from: getUserAddress() }
    );
  }

  async function proposeRemark ({ remark, isAppealConfirmed, proposalId }: {
    remark: string;
    isAppealConfirmed: boolean;
    proposalId: string;
  }) {
    const contract = await getEscrowContractInstance(isRootNode);
    return contract.setProposerRemark(proposalId, remark, isAppealConfirmed, {
      from: getUserAddress(),
    });
  }

  async function confirmDecision (proposalId: string) {
    const contract = await getEscrowContractInstance(isRootNode);
    const { decision } = await contract.arbitrationInfos(proposalId);
    return contract.confirmDecision(proposalId, decision.hash, { from: getUserAddress() });
  }

  async function recallDecision (proposalId: string) {
    const contract = await getEscrowContractInstance(isRootNode);
    return contract.recallProposedDecision(proposalId, { from: getUserAddress() });
  }

  async function executeDecision (proposalId: string) {
    const contract = await getEscrowContractInstance(isRootNode);
    return contract.execute(proposalId, { from: getUserAddress() });
  }

  async function purgeSlashing (address: string) {
    const contract = isRootNode
      ? await getRootNodesInstance()
      : await getValidatorsInstance();
    return contract.purgePendingSlashings(address, { from: getUserAddress() });
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
