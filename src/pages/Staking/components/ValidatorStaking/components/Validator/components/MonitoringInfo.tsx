import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Icon, Tooltip } from '@q-dev/q-ui-kit';

import Button from 'components/Button';

import { StyledWrapper } from '../styles';
import { useValidator } from '../Validator';

import { RoutePaths } from 'constants/routes';
import { formatDate } from 'utils/date';
import { formatNumber, formatPercent } from 'utils/numbers';

function MonitoringInfo () {
  const { t, i18n } = useTranslation();
  const { validator } = useValidator();
  const { lastBlock, timestamp, availability1000Cycles } = validator;

  return (
    <StyledWrapper gridArea="validator-status" className="block">
      <div className="block__header">
        <h3 className="text-h3">{t('VALIDATOR_STATUS')}</h3>
        <Link to={RoutePaths.dashboardValidatorsMonitoring}>
          <Button
            icon
            alwaysEnabled
            block
            title={t('VALIDATORS_MONITORING')}
            look="ghost"
          >
            <Icon name="chevron-right" />
          </Button>
        </Link>
      </div>

      <div className="row block__content">
        <p className="color-secondary text-md">{t('LAST_BLOCK_VALIDATED')}</p>
        <p className="color-primary text-md">{formatNumber(lastBlock)}</p>
      </div>

      <div className="row">
        <p className="color-secondary text-md">{t('TIME_OF_LAST_VALIDATED_BLOCK')}</p>
        <div className="color-primary text-md"><Tooltip trigger={formatDate(timestamp, i18n.language)}>{timestamp}</Tooltip></div>
      </div>

      <div className="row">
        <p className="color-secondary text-md">{t('AVERAGE_AVAILABILITY')}</p>
        <p className="color-primary text-md">{formatPercent(availability1000Cycles)}</p>
      </div>
    </StyledWrapper>
  );
}

export default MonitoringInfo;
