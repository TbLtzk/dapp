import { useEffect, useState } from 'react';

import { ProposalEvent } from 'typings/contracts';
import Icon from 'ui/Icon';
import Progress from 'ui/Progress';
import Tag from 'ui/Tag';

import ProposalCardSkeleton from '../ProposalCardSkeleton';
import VotingPeriods from '../VotingPeriods';

import { ProposalCardLink } from './styles';

import { getProposal } from 'contracts/helpers/voting-helpers/base-voting-helper';

import { formatPercent } from 'func/formatters';

function ProposalCard ({ proposal }: { proposal: ProposalEvent }) {
  const [proposalInfo, setProposalInfo] = useState<any>(null);

  useEffect(() => {
    loadProposal();

    return () => {
      setProposalInfo(null);
    };
  }, []);

  async function loadProposal () {
    const result = await getProposal(proposal.contract, proposal.id);
    setProposalInfo(result);
  }

  const getStatusState = () => {
    switch (proposalInfo?.status) {
      case 'Pending':
        return 'pending';
      case 'Rejected':
      case 'Expired':
        return 'rejected';
      default:
        return 'approved';
    }
  };

  const leftQuorum = Math.max(
    Number(proposalInfo?.requiredQuorum) - Number(proposalInfo?.currentQuorum),
    0
  );

  return proposalInfo
    ? (
      <ProposalCardLink
        className="block"
        to={{
          pathname: `/governance/proposal/${proposal.contract}/${proposal.id}`,
          state: { from: 'list' },
        }}
      >
        <div className="proposal-card__head">
          <p className="proposal-card__id text-md">
            <span className="font-light">Proposal ID</span>
            <span>{proposal.id}</span>
          </p>

          {proposalInfo.status && <Tag state={getStatusState()}>{proposalInfo.status}</Tag>}
        </div>

        <h2
          className="proposal-card__title text-h2 text-ellipsis"
          title={proposalInfo.title}
        >
          {proposalInfo.title}
        </h2>

        <div className="proposal-card__voting">
          <div className="proposal-card__quorum">
            <p className="text-md">
              {`Quorum ${formatPercent(proposalInfo.requiredQuorum)}`}
            </p>
            <p className="text-md">
              {leftQuorum
                ? `${formatPercent(leftQuorum)} left`
                : <Icon name="double-check" />
              }
            </p>
          </div>

          <Progress
            className="proposal-card__progress"
            value={Number(proposalInfo.currentQuorum)}
            max={Number(proposalInfo.requiredQuorum)}
          />

          <VotingPeriods
            className="proposal-card__periods"
            proposal={proposalInfo}
          />
        </div>
      </ProposalCardLink>
    )
    : <ProposalCardSkeleton />;
}

export default ProposalCard;
