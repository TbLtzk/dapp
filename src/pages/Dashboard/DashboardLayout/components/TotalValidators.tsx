import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Icon } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import Button from 'components/Button';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useNetworkConfig from 'hooks/useNetworkConfig';

import { useValidators } from 'store/validators/hooks';

import { RoutePaths } from 'constants/routes';
import { formatNumber } from 'utils/numbers';

const StyledWrapper = styled.div`
  grid-area: total-validators;
  padding: 24px 16px 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .total-validators__val {
    margin-top: 4px;
  }

  .total-validators__inactive {
    margin-top: 16px;
  }
`;

function TotalValidators () {
  const { t } = useTranslation();
  const { indexerUrl } = useNetworkConfig();
  const {
    validators,
    inactiveValidatorsCount,
    inactiveValidatorsCountLoading,
    loadInactiveValidatorsCount,
  } = useValidators();

  const validatorsRef = useAnimateNumber(validators.length, ' ', val => formatNumber(val, 0));

  useEffect(() => {
    loadInactiveValidatorsCount(indexerUrl);
  }, []);

  return (
    <StyledWrapper className="block">
      <div>
        <h2 className="text-lg">{t('TOTAL_VALIDATORS')}</h2>
        <p ref={validatorsRef} className="total-validators__val text-xl font-semibold">–</p>
        <p className="total-validators__inactive text-sm font-light">
          {t('INACTIVE_COUNT', { value: inactiveValidatorsCountLoading ? '…' : inactiveValidatorsCount })}
        </p>
      </div>

      <Link to={RoutePaths.dashboardValidatorsMonitoring}>
        <Button
          icon
          alwaysEnabled
          block
          look="ghost"
        >
          <Icon name="chevron-right" />
        </Button>
      </Link>
    </StyledWrapper>
  );
}

export default TotalValidators;
