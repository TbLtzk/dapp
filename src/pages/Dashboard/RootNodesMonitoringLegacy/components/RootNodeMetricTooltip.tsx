import { useTranslation } from 'react-i18next';

import { OnchainRootNodeMetric } from '@q-dev/q-js-sdk';
import { Icon, Tooltip } from '@q-dev/q-ui-kit';
import { formatNumber } from '@q-dev/utils';
import styled from 'styled-components';

import { formatDate } from 'utils/date';

const StyledTooltip = styled(Tooltip)`
  .root-node-metric-tooltip__content {
    display: grid;
    gap: 4px;
  }

  .root-node-metric-tooltip__content-item {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }
`;

function RootNodeMetricTooltip ({ metric }: { metric: OnchainRootNodeMetric }) {
  const { t } = useTranslation();

  return (
    <StyledTooltip trigger={<Icon name="info" className="text-md color-secondary" />}>
      <div className="root-node-metric-tooltip__content">
        <div className="root-node-metric-tooltip__content-item">
          <span className="text-sm">{t('JOIN_DATE')}</span>
          <span className="text-md font-semibold">{formatDate(metric.attributes.startTime * 1000)}</span>
        </div>

        <div className="root-node-metric-tooltip__content-item">
          <span className="text-sm">{t('JOIN_BLOCK')}</span>
          <span className="text-md font-semibold">{formatNumber(metric.attributes.startBlock)}</span>
        </div>
      </div>
    </StyledTooltip>
  );
}

export default RootNodeMetricTooltip;
