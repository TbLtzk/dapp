
import tooltips from 'json/tooltips.json';

import PopperTooltip from 'components/Base/PopperTooltip';

import { InfoIcon } from './styles';

function InfoTooltip ({ topic, invertedColors = false, ...rest }) {
  return (
    <PopperTooltip
      trigger={(
        <InfoIcon
          $invertedColors={invertedColors}
          className="mdi mdi-information"
        />
      )}
      invertedColors={invertedColors}
      {...rest}
    >
      <span>{tooltips[topic]}</span>
    </PopperTooltip>
  );
}

export default InfoTooltip;
