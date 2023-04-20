
import { useTranslation } from 'react-i18next';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Tooltip from 'ui/Tooltip';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { AliasIcon, TooltipContent } from './styles';

function AliasTooltip ({ alias = '', isRootNode = false }) {
  const { featureFlags } = useNetworkConfig();
  const { t } = useTranslation();

  return featureFlags.aliases && alias
    ? (
      <Tooltip trigger={<AliasIcon>A</AliasIcon>}>
        <TooltipContent>
          <span className="tooltip-text">{isRootNode ? t('THIS_ROOT_NODE_USES_ALIAS') : t('THIS_VALIDATOR_USES_ALIAS')}</span>
          <br />
          <div className="tooltip-address">
            <ExplorerAddress
              short
              hideTooltip
              address={alias}
            />
          </div>
          <span className="tooltip-text">{isRootNode ? t('FOR_LAYER_ZERO_GOVERNANCE') : t('FOR_BLOCK_SEALING')}</span>
        </TooltipContent>
      </Tooltip>
    )
    : null;
}

export default AliasTooltip;
