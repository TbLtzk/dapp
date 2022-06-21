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
  proposals: ProposalEvent[],
  lastBlock: number
) {
  const newProposals = await Promise.all([
    getContractProposals({
      proposals,
      contract: await getEpqfiMembershipVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.ePQFIMembershipVoting
    }),
    getContractProposals({
      proposals,
      contract: await getEpdrMembershipVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.ePDRMembershipVoting
    }),
    getContractProposals({
      proposals,
      contract: await getEpqfiParametersVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.ePQFIParametersVoting
    }),
    getContractProposals({
      proposals,
      contract: await getEpdrParametersVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.ePDRParametersVoting
    }),
    getContractProposals({
      proposals,
      contract: await getEprsParametersVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.ePRSParametersVoting
    }),
    getContractProposals({
      proposals,
      contract: await getEprsMembershipVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.ePRSMembershipVoting
    })
  ]);

  return flatten(newProposals);
}
