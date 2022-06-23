import tooltips from 'json/tooltips.json';

import PopperTooltip from 'components/Base/PopperTooltip';

import { InfoIcon } from './styles';

type PopperTooltipProps = Parameters<typeof PopperTooltip>[0];
interface Props extends Omit<PopperTooltipProps, 'trigger' | 'invertedColors' | 'children'> {
  topic: keyof typeof tooltips
  invertedColors?: boolean
}

function InfoTooltip ({ topic, invertedColors = false, ...rest }: Props) {
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
