import { useTranslation } from 'react-i18next';

import { ValidatorMetric } from '@q-dev/q-js-sdk';
import { formatNumber, formatPercent } from '@q-dev/utils';
import styled from 'styled-components';

import Icon from 'ui/Icon';
import Tooltip from 'ui/Tooltip';

const StyledTooltip = styled(Tooltip)`
  .metric-tooltip-content {
    display: grid;
    gap: 4px;
  }

  .metric-tooltip-item {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }
`;

function MetricTooltip ({ metric }: { metric?: ValidatorMetric }) {
  const { t } = useTranslation();

  return (
    <StyledTooltip trigger={<Icon name="info" className="text-md color-secondary" />}>
      <div className="metric-tooltip-content">
        <div className="metric-tooltip-item">
          <span className="text-sm">{t('DUE_BLOCKS')}</span>
          <span className="text-md font-semibold">{formatNumber(metric?.dueBlocks || 0)}</span>
        </div>

        <div className="metric-tooltip-item">
          <span className="text-sm">{t('IN_TURN_BLOCKS')}</span>
          <span className="text-md font-semibold">{formatNumber(metric?.inTurnBlocks || 0)}</span>
        </div>

        <div className="metric-tooltip-item">
          <span className="text-sm">{t('OUT_OF_TURN_BLOCKS')}</span>
          <span className="text-md font-semibold">{formatNumber(metric?.outOfTurnBlocks || 0)}</span>
        </div>

        <div className="metric-tooltip-item">
          <span className="text-sm">{t('IN_TURN_AVAILABILITY')}</span>
          <span className="text-md font-semibold">
            {formatPercent(Math.min(metric?.inTurnAvailability || 0, 1) * 100, 2)}
          </span>
        </div>

        <div className="metric-tooltip-item">
          <span className="text-sm">{t('TOTAL_AVAILABILITY')}</span>
          <span className="text-md font-semibold">
            {formatPercent(Math.min(metric?.totalAvailability || 0, 1) * 100, 2)}
          </span>
        </div>
      </div>
    </StyledTooltip>
  );
}

export default MetricTooltip;
