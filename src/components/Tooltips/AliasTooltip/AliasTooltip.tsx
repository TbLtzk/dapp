
import { useTranslation } from 'react-i18next';

import { Tooltip } from '@q-dev/q-ui-kit';

import ExplorerAddress from 'components/Custom/ExplorerAddress';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { AliasIcon, TooltipContent } from './styles';

function AliasTooltip ({ alias = '', isRootNode = false }) {
  const { featureFlags } = useNetworkConfig();
  const { t } = useTranslation();

  return featureFlags.aliases && alias
    ? (
      <Tooltip trigger={<AliasIcon>A</AliasIcon>}>
        <TooltipContent>
          <span>{isRootNode ? t('THIS_ROOT_NODE_USES_ALIAS') : t('THIS_VALIDATOR_USES_ALIAS')}</span>
          <br />
          <div className="tooltip-address">
            <ExplorerAddress
              short
              hideTooltip
              address={alias}
            />
          </div>
          <span>{isRootNode ? t('FOR_ROOT_NODE_OPERATION') : t('FOR_BLOCK_SEALING')}</span>
        </TooltipContent>
      </Tooltip>
    )
    : null;
}

export default AliasTooltip;
