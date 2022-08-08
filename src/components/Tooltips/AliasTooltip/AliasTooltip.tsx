
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Tooltip from 'ui/Tooltip';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { AliasIcon, TooltipContent } from './styles';

function AliasTooltip ({ alias = '' }) {
  const { featureFlags } = useNetworkConfig();

  return featureFlags.aliases && alias
    ? (
      <Tooltip trigger={<AliasIcon>A</AliasIcon>}>
        <TooltipContent>
          <span>This validator uses alias</span>
          <br />
          <div className="tooltip-address">
            <ExplorerAddress
              short
              hideTooltip
              address={alias}
            />
          </div>
          <span> for block sealing </span>
        </TooltipContent>
      </Tooltip>
    )
    : null;
}

export default AliasTooltip;
