import { useTranslation } from 'react-i18next';

import { Tooltip } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import { InfoIcon } from 'components/Tooltips/InfoTooltip/styles';

interface Props {
  assetInfo: {
    decimals: number | string;
    symbol: string;
    name: string;
  };
}

const StyledTooltip = styled(Tooltip)`
  .asset-info-tooltip__header {
    margin-bottom: 6px;
  }

  .asset-info-tooltip__content {
    display: grid;
    gap: 4px;
  }

  .asset-info-tooltip__item {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }
`;

function AssetInfoTooltip ({ assetInfo }: Props) {
  const { t } = useTranslation();

  return (
    <StyledTooltip
      trigger={(
        <InfoIcon className="mdi mdi-information" />
      )}
    >
      <h4 className="text-md font-bold asset-info-tooltip__header">
        {t('ERC20_INFO')}
      </h4>
      <div className="asset-info-tooltip__content">
        <div className="asset-info-tooltip__item">
          <span className="text-sm">{t('NAME')}</span>
          <span className="text-md font-semibold">{assetInfo.name || '...'}</span>
        </div>

        <div className="asset-info-tooltip__item">
          <span className="text-sm">{t('SYMBOL')}</span>
          <span className="text-md font-semibold">{assetInfo.symbol || '...'}</span>
        </div>

        <div className="asset-info-tooltip__item">
          <span className="text-sm">{t('DECIMALS')}</span>
          <span className="text-md font-semibold">{assetInfo.decimals || '...'}</span>
        </div>
      </div>
    </StyledTooltip>
  );
}

export default AssetInfoTooltip;
