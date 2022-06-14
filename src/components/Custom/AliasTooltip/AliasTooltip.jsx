import React from 'react';

import PopperTooltip from 'components/Base/PopperTooltip';

import useFeatureFlag from 'hooks/useFeatureFlag';

import ExplorerAddress from '../ExplorerAddress';

import { AliasIcon, TooltipContent } from './styles';

function AliasTooltip ({ alias = '' }) {
  const isAliasesEnabled = useFeatureFlag('aliases');

  return isAliasesEnabled && alias && (
    <PopperTooltip trigger={<AliasIcon>A</AliasIcon>}>
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
    </PopperTooltip>
  );
}

export default AliasTooltip;
