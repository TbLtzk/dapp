import { useTranslation } from 'react-i18next';

import { Tooltip } from '@q-dev/q-ui-kit';
import tooltips from 'json/tooltips.json';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { InfoIcon, TooltipContent } from './styles';

type TooltipProps = Parameters<typeof Tooltip>[0];
interface Props extends Omit<TooltipProps, 'trigger' | 'children'> {
  topic: keyof typeof tooltips;
}

function InfoTooltip ({ topic, ...rest }: Props) {
  const { t } = useTranslation();
  const { qTicker } = useNetworkConfig();

  return (
    <Tooltip
      trigger={(
        <InfoIcon className="mdi mdi-information" />
      )}
      {...rest}
    >
      <TooltipContent>{t(tooltips[topic], { asset: qTicker })}</TooltipContent>
    </Tooltip>
  );
}

export default InfoTooltip;
