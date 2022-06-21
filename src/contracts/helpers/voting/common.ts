import { ProposalStatus } from '@q-dev/q-js-sdk';
import { uniqBy } from 'lodash';
import { ProposalEvent, ProposalsContract } from 'typings/contracts';

export async function getContractProposals ({
  proposals,
  contract,
  lastBlock,
  contractName
}: {
  proposals: ProposalEvent[],
  contract: ProposalsContract,
  lastBlock: number,
  contractName: string
}): Promise<ProposalEvent[]> {
  const contractProposals = proposals.filter(({ contract }) => contract === contractName);
  const activeProposals = contractProposals.filter(({ status }) => status === 'active');

  const newProposals = await getProposalEvents(contract, {
    fromBlock: lastBlock,
    contractName
  });

  const proposalsToCheck = [...activeProposals, ...newProposals];
  const result = await Promise.all(proposalsToCheck.map(async (proposal) => {
    const status = await contract.getStatus(proposal.id);
    if (status === ProposalStatus.NONE) return { ...proposal, status };

    const isActive = [
      ProposalStatus.PENDING,
      ProposalStatus.ACCEPTED,
      ProposalStatus.PASSED
    ].includes(status);

    return {
      ...proposal,
      status: isActive ? 'active' : 'ended'
    };
  }));

  return uniqBy([...result, ...contractProposals], 'id');
}

export async function getProposalEvents (
  contract: ProposalsContract,
  { fromBlock = 0, toBlock = 'latest', contractName = '' }
): Promise<ProposalEvent[]> {
  const pastEvents = await contract.instance.getPastEvents(
    'ProposalCreated',
    { fromBlock, toBlock }
  );

  return pastEvents.map((evt) => ({
    blockNumber: evt.blockNumber,
    id: evt.returnValues._id || evt.returnValues._proposalId,
    contract: contractName
  }));
}
