
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Tooltip from 'ui/Tooltip';

import useFeatureFlag from 'hooks/useFeatureFlag';

import { AliasIcon, TooltipContent } from './styles';

function AliasTooltip ({ alias = '' }) {
  const isAliasesEnabled = useFeatureFlag('aliases');

  return isAliasesEnabled && alias && (
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
  );
}

export default AliasTooltip;
