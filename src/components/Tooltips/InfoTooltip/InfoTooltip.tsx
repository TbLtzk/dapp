import { useTranslation } from 'react-i18next';

import { Tooltip } from '@q-dev/q-ui-kit';
import tooltips from 'json/tooltips.json';

import { InfoIcon } from './styles';

type TooltipProps = Parameters<typeof Tooltip>[0];
interface Props extends Omit<TooltipProps, 'trigger' | 'children'> {
  topic: keyof typeof tooltips;
}

function InfoTooltip ({ topic, ...rest }: Props) {
  const { t } = useTranslation();

  return (
    <Tooltip
      trigger={(
        <InfoIcon className="mdi mdi-information" />
      )}
      {...rest}
    >
      <span>{t(tooltips[topic])}</span>
    </Tooltip>
  );
}

export default InfoTooltip;
