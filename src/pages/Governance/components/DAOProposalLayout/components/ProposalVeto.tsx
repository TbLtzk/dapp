import { useTranslation } from 'react-i18next';

import { Progress, Tooltip } from '@q-dev/q-ui-kit';
import { formatFraction, formatNumber, formatPercent, unixToDate } from '@q-dev/utils';
import styled from 'styled-components';
import { DAOProposal } from 'typings/proposals';

import useEndTime from 'pages/Governance/hooks/useEndTime';

export const StyledProposalVeto = styled.div`
  .proposal-veto__progress {
    margin-top: 8px;
  }

  .proposal-veto__votes {
    margin-top: 24px;
    display: grid;
    gap: 16px;
  }

  .proposal-veto__vote {
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr;
    gap: 8px;
  }

  .proposal-veto__vote-val {
    text-align: right;
  }
`;

function ProposalVeto ({ proposal }: { proposal: DAOProposal }) {
  const { t } = useTranslation();

  const vetoEndTime = useEndTime(unixToDate(proposal.vetoEndTimestamp));
  const participantsCount = proposal.participants.length;
  const vetoedCount = proposal.vetoed.length;
  const noVote = participantsCount - vetoedCount;

  return (
    <StyledProposalVeto className="block">
      <div className="block__header">
        <h2 className="text-h2">{t('VETO')}</h2>
        <Tooltip
          placement="bottom"
          trigger={(
            <p className="text-md font-light">{vetoEndTime.relative}</p>
          )}
        >
          {vetoEndTime.formatted}
        </Tooltip>
      </div>

      <div className="block__content">
        <p className="text-md">
          {t('THRESHOLD', {
            threshold: formatFraction(proposal.requiredVetoQuorum),
          })}
        </p>

        <Progress
          className="proposal-veto__progress"
          value={vetoedCount}
          max={participantsCount}
        />

        <div className="proposal-veto__votes">
          <div className="proposal-veto__vote">
            <p className="text-md">{t('OBJECTION')}</p>
            <p className="text-md proposal-veto__vote-val">
              {formatPercent(vetoedCount / participantsCount * 100)}
            </p>
            <p className="text-md proposal-veto__vote-val">
              {formatNumber(vetoedCount)}
            </p>
          </div>

          <div className="proposal-veto__vote">
            <p className="text-md">{t('DID_NOT_VOTE')}</p>
            <p className="text-md proposal-veto__vote-val">
              {formatPercent(noVote / participantsCount * 100)}
            </p>
            <p className="text-md proposal-veto__vote-val">
              {formatNumber(noVote)}
            </p>
          </div>
        </div>
      </div>
    </StyledProposalVeto>
  );
}

export default ProposalVeto;
