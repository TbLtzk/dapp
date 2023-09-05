
import { useTranslation } from 'react-i18next';

import { Icon, Tooltip } from '@q-dev/q-ui-kit';
import { formatNumber, formatPercent } from '@q-dev/utils';
import styled from 'styled-components';
import { CosignatureStats } from 'typings/root-nodes';

interface Props {
  cosignatureStats: CosignatureStats;
}

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  .cosignature-stats-column__tooltip-tooltip-content {
    display: grid;
    gap: 4px;
  }

  .cosignature-stats-column__tooltip-content-item {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }
`;

function CosignatureStatsColumn ({ cosignatureStats }: Props) {
  const { t } = useTranslation();

  return (
    <StyledWrapper>
      <span>
        {formatPercent(cosignatureStats.availability, 2)}
      </span>
      <Tooltip trigger={<Icon name="info" className="text-md color-secondary" />}>
        <div className="cosignature-stats-column__tooltip-content">
          <div className="cosignature-stats-column__tooltip-content-item">
            <span className="text-sm">{t('DUE_APPROVALS')}</span>
            <span className="text-md font-semibold">{formatNumber(cosignatureStats.dueCycles)}</span>
          </div>

          <div className="cosignature-stats-column__tooltip-content-item">
            <span className="text-sm">{t('ACTUAL_APPROVALS')}</span>
            <span className="text-md font-semibold">{formatNumber(cosignatureStats.actualApprovals)}</span>
          </div>

          <div className="cosignature-stats-column__tooltip-content-item">
            <span className="text-sm">{t('AVAILABILITY')}</span>
            <span className="text-md font-semibold">{formatPercent(cosignatureStats.availability, 2)}</span>
          </div>
        </div>
      </Tooltip>
    </StyledWrapper>
  );
}

export default CosignatureStatsColumn;
