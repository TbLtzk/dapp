
import { useTranslation } from 'react-i18next';

import { Icon, Tooltip } from '@q-dev/q-ui-kit';
import { formatNumber, formatPercent } from '@q-dev/utils';
import styled from 'styled-components';
import { CosignatureStats } from 'typings/root-nodes';

interface Props {
  cosignatureStats: CosignatureStats | null;
}

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  .cosignature-stats-column__tooltip-content {
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
        {cosignatureStats
          ? formatPercent(cosignatureStats.availability, 2)
          : 'N/a'
        }
      </span>
      <Tooltip trigger={<Icon name="info" className="text-md color-secondary" />}>
        <div className="cosignature-stats-column__tooltip-content">
          <div className="cosignature-stats-column__tooltip-content-item">
            <span className="text-sm">{t('DUE_APPROVALS')}</span>
            <span className="text-md font-semibold">
              {cosignatureStats
                ? formatNumber(cosignatureStats.dueCycles)
                : 'N/a'
              }
            </span>
          </div>

          <div className="cosignature-stats-column__tooltip-content-item">
            <span className="text-sm">{t('ACTUAL_APPROVALS')}</span>
            <span className="text-md font-semibold">
              {cosignatureStats
                ? formatNumber(cosignatureStats.actualApprovals)
                : 'N/a'
              }
            </span>
          </div>

          <div className="cosignature-stats-column__tooltip-content-item">
            <span className="text-sm">{t('AVAILABILITY')}</span>
            <span className="text-md font-semibold">
              {cosignatureStats
                ? formatPercent(cosignatureStats.availability, 2)
                : 'N/a'
              }
            </span>
          </div>
        </div>
      </Tooltip>
    </StyledWrapper>
  );
}

export default CosignatureStatsColumn;
