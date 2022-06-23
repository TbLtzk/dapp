import { useEffect, useState } from 'react';

import { ProposalEvent } from 'typings/contracts';

import SkeletonProposalsLoading from 'components/Base/SkeletonLoading';

import ProposalStatus from '../ProposalStatus';
import VotingPeriods from '../VotingPeriods';

import { ProposalCardLink } from './styles';

import { getProposal } from 'contracts/helpers/voting-helpers/base-voting-helper';

function ProposalCard ({ proposal }: { proposal: ProposalEvent }) {
  const [proposalInfo, setProposalInfo] = useState<any>(null);

  useEffect(() => {
    loadProposal();
  }, []);

  async function loadProposal () {
    const result = await getProposal(proposal.contract, proposal.id);
    setProposalInfo(result);
  }

  return proposalInfo
    ? (
      <ProposalCardLink
        to={{
          pathname: `/governance/proposal/${proposal.contract}/${proposal.id}`,
          state: { from: 'list' },
        }}
      >
        <div className="proposal-card__head">
          <p>Proposal ID: {proposal.id}</p>
          {proposalInfo.status && <ProposalStatus status={proposalInfo.status} />}
        </div>

        <h3 className="proposal-card__title" title={proposalInfo.title}>
          {proposalInfo.title}
        </h3>

        <div className="proposal-card__body">
          <VotingPeriods proposal={proposalInfo} />
        </div>
      </ProposalCardLink>
    )
    : <SkeletonProposalsLoading />;
}

export default ProposalCard;
