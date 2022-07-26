import { useTranslation } from 'react-i18next';

import { useTheme } from 'styled-components';
import { Proposal } from 'typings/proposals';
import Progress from 'ui/Progress';
import Tooltip from 'ui/Tooltip';

import useEndTime from '../../hooks/useEndTime';

import { getVotingColor } from './colors';
import { StyledProposalVoting } from './styles';

import { formatNumber, formatPercent } from 'func/formatters';

function ProposalVoting ({ proposal }: { proposal: Proposal }) {
  const { t } = useTranslation();
  const theme = useTheme();

  const votingEndTime = useEndTime(new Date(proposal.votingEndTime * 1000));
  const totalVotes = Number(proposal.votesFor) + Number(proposal.votesAgainst);

  return (
    <StyledProposalVoting className="block">
      <div className="block__header">
        <h2 className="text-h2">{t('VOTING')}</h2>
        <Tooltip
          placement="bottom"
          trigger={(
            <p className="text-md font-light">{votingEndTime.relative}</p>
          )}
        >
          {votingEndTime.formatted}
        </Tooltip>
      </div>

      <div className="block__content">
        <p className="proposal-voting__majority text-md">
          {t('MAJORITY_REQUIREMENT', {
            majority: formatPercent(proposal.requiredMajority)
          })}
        </p>

        <Progress
          className="proposal-voting__progress"
          value={Number(proposal.votesFor || 0)}
          max={totalVotes}
          trackColor={getVotingColor(theme, 'voteAgainst')}
          valueColor={getVotingColor(theme, 'voteFor')}
        />

        <div className="proposal-voting__votes">
          <div className="proposal-voting__vote">
            <div
              className="proposal-voting__vote-bg"
              style={{ backgroundColor: getVotingColor(theme, 'voteFor') }}
            />
            <p className="text-md">{t('YES')}</p>
            <p className="text-md proposal-voting__vote-val">
              {formatPercent(proposal.votesFor / totalVotes * 100 || 0)}
            </p>
            <p className="text-md proposal-voting__vote-val">
              {formatNumber(proposal.votesFor, 4)}
            </p>
          </div>

          <div className="proposal-voting__vote">
            <div
              className="proposal-voting__vote-bg"
              style={{ backgroundColor: getVotingColor(theme, 'voteAgainst') }}
            />
            <p className="text-md">{t('NO')}</p>
            <p className="text-md proposal-voting__vote-val">
              {formatPercent(proposal.votesAgainst / totalVotes * 100 || 0)}
            </p>
            <p className="text-md proposal-voting__vote-val">
              {formatNumber(proposal.votesAgainst, 4)}
            </p>
          </div>
        </div>
      </div>
    </StyledProposalVoting>
  );
}

export default ProposalVoting;
