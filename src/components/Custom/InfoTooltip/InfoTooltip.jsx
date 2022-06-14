import React from 'react';

import tooltips from 'json/tooltips.json';

import PopperTooltip from 'components/Base/PopperTooltip';

import { InfoIcon } from './styles';

function InfoTooltip ({ topic, placement = 'top' }) {
  return (
    <PopperTooltip
      placement={placement}
      trigger={<InfoIcon className="mdi mdi-information" />}
    >
      <span>{tooltips[topic]}</span>
    </PopperTooltip>
  );
}

export default InfoTooltip;
