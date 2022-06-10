import React from 'react';

import useFeatureFlag from 'hooks/useFeatureFlag';

import ExplorerAddress from '../ExplorerAddress';

import { TooltipWrapper } from './styles';

function AliasTooltip ({ alias = '' }) {
  const isAliasesEnabled = useFeatureFlag('aliases');

  return isAliasesEnabled && alias && (
    <TooltipWrapper>
      <span className="alias-icon">A</span>
      <div className="tooltip-content">
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
      </div>
    </TooltipWrapper>
  );
}

export default AliasTooltip;
