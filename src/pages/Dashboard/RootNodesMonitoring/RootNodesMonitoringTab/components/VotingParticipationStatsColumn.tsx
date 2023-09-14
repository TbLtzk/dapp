
import { useTranslation } from 'react-i18next';

import { Icon, Tooltip } from '@q-dev/q-ui-kit';
import { formatNumber, formatPercent } from '@q-dev/utils';
import styled from 'styled-components';
import { VotingParticipationStats } from 'typings/root-nodes';

interface Props {
  stats: VotingParticipationStats;
}

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  .voting-participation-stats-column__tooltip-content {
    display: grid;
    gap: 8px;
  }

  .voting-participation-stats-column__tooltip-content-item {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }
`;

function VotingParticipationStatsColumn ({ stats }: Props) {
  const { t } = useTranslation();

  return (
    <StyledWrapper>
      <span>
        {formatPercent(stats.aggregatePercentage, 2)}
      </span>
      <Tooltip trigger={<Icon name="info" className="text-md color-secondary" />}>
        <div className="voting-participation-stats-column__tooltip-content">
          <div>
            <h4 className="text-md font-semibold">
              {t('RN_VOTINGS')}
            </h4>
            <div className="voting-participation-stats-column__tooltip-content-item">
              <span className="text-sm">{t('TOTAL')}</span>
              <span className="text-md font-semibold">
                {formatNumber(stats.rootNodeVotings.total)}
              </span>
            </div>
            <div className="voting-participation-stats-column__tooltip-content-item">
              <span className="text-sm">{t('USER')}</span>
              <span className="text-md font-semibold">
                {formatNumber(stats.rootNodeVotings.totalOfUser)}
              </span>
            </div>
            <div className="voting-participation-stats-column__tooltip-content-item">
              <span className="text-sm">{t('PARTICIPATION')}</span>
              <span className="text-md font-semibold">
                {formatPercent(stats.rootNodeVotings.participationPercentage, 2)}
              </span>
            </div>
          </div>
          <div>
            <h4 className="text-md font-semibold">
              {t('QTH_VOTINGS')}
            </h4>
            <div className="voting-participation-stats-column__tooltip-content-item">
              <span className="text-sm">{t('TOTAL')}</span>
              <span className="text-md font-semibold">
                {formatNumber(stats.qTHVotings.total)}
              </span>
            </div>
            <div className="voting-participation-stats-column__tooltip-content-item">
              <span className="text-sm">{t('USER')}</span>
              <span className="text-md font-semibold">
                {formatNumber(stats.qTHVotings.totalOfUser)}
              </span>
            </div>
            <div className="voting-participation-stats-column__tooltip-content-item">
              <span className="text-sm">{t('PARTICIPATION')}</span>
              <span className="text-md font-semibold">
                {formatPercent(stats.qTHVotings.participationPercentage, 2)}
              </span>
            </div>
          </div>
          <div>
            <h4 className="text-md font-semibold">
              {t('RN_PROPOSALS')}
            </h4>
            <div className="voting-participation-stats-column__tooltip-content-item">
              <span className="text-sm">{t('USER')}</span>
              <span className="text-md font-semibold">
                {formatNumber(stats.rootNodeProposals.totalOfUser)}
              </span>
            </div>
          </div>
        </div>
      </Tooltip>
    </StyledWrapper>
  );
}

export default VotingParticipationStatsColumn;
