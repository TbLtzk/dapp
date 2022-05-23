import React from 'react';

import tooltips from 'json/tooltips.json';

import { TooltipWrapper } from './styles';

function InfoTooltip ({ topic, bottom }) {
  return (
    <TooltipWrapper $bottom={bottom}>
      <i className="mdi mdi-information" />
      <span>{tooltips[topic]}</span>
    </TooltipWrapper>
  );
}

export default InfoTooltip;
