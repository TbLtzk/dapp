
import { useTranslation } from 'react-i18next';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Tooltip from 'ui/Tooltip';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { AliasIcon, TooltipContent } from './styles';

function AliasTooltip ({ alias = '' }) {
  const { featureFlags } = useNetworkConfig();
  const { t } = useTranslation();

  return featureFlags.aliases && alias
    ? (
      <Tooltip trigger={<AliasIcon>A</AliasIcon>}>
        <TooltipContent>
          <span>{t('THIS_VALIDATOR_USES_ALIAS')}</span>
          <br />
          <div className="tooltip-address">
            <ExplorerAddress
              short
              hideTooltip
              address={alias}
            />
          </div>
          <span>{t('FOR_BLOCK_SEALING')} </span>
        </TooltipContent>
      </Tooltip>
    )
    : null;
}

export default AliasTooltip;
