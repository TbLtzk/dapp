import { flatten } from 'lodash';
import { ProposalEvent } from 'typings/contracts';

import { getContractProposals } from './common';

import {
  getEpdrMembershipVotingInstance,
  getEpdrParametersVotingInstance,
  getEpqfiMembershipVotingInstance,
  getEpqfiParametersVotingInstance,
  getEprsMembershipVotingInstance,
  getEprsParametersVotingInstance
} from 'contracts/contract-instance';

import { CONTRACTS_NAMES } from 'constants/contracts';

export async function getExpertProposals (
  activeProposals: ProposalEvent[],
  lastActiveBlock: number
) {
  const proposals = await Promise.all([
    getContractProposals({
      activeProposals,
      contract: await getEpqfiMembershipVotingInstance(),
      lastBlock: lastActiveBlock,
      contractName: CONTRACTS_NAMES.ePQFIMembershipVoting
    }),
    getContractProposals({
      activeProposals,
      contract: await getEpdrMembershipVotingInstance(),
      lastBlock: lastActiveBlock,
      contractName: CONTRACTS_NAMES.ePDRMembershipVoting
    }),
    getContractProposals({
      activeProposals,
      contract: await getEpqfiParametersVotingInstance(),
      lastBlock: lastActiveBlock,
      contractName: CONTRACTS_NAMES.ePQFIParametersVoting
    }),
    getContractProposals({
      activeProposals,
      contract: await getEpdrParametersVotingInstance(),
      lastBlock: lastActiveBlock,
      contractName: CONTRACTS_NAMES.ePDRParametersVoting
    }),
    getContractProposals({
      activeProposals,
      contract: await getEprsParametersVotingInstance(),
      lastBlock: lastActiveBlock,
      contractName: CONTRACTS_NAMES.ePRSParametersVoting
    }),
    getContractProposals({
      activeProposals,
      contract: await getEprsMembershipVotingInstance(),
      lastBlock: lastActiveBlock,
      contractName: CONTRACTS_NAMES.ePRSMembershipVoting
    })
  ]);

  return flatten(proposals);
}
