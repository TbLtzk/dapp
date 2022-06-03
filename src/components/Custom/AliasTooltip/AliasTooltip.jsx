import React from 'react';

import ExplorerAddress from '../ExplorerAddress';

import { TooltipWrapper } from './styles';

import { isAliasesEnabled } from 'constants/config';

function AliasTooltip ({ alias = '' }) {
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
