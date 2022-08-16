import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import Button from 'ui/Button';
import Icon from 'ui/Icon';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useNetworkConfig from 'hooks/useNetworkConfig';

import { getValidatorMembers } from 'store/validators/action-creators';
import { inactiveValidatorsSelector, loadingValidatorsMonitoringSelector, validatorsShortSelector } from 'store/validators/selectors';

import { RoutePaths } from 'constants/routes';
import { TABLE_TYPES } from 'constants/tableTypes';
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
  const dispatch = useDispatch();
  const { indexerUrl } = useNetworkConfig();

  const validators = useSelector(validatorsShortSelector);
  const validatorsRef = useAnimateNumber(validators.length, ' ', val => formatNumber(val, 0));

  const inactiveValidators = useSelector(inactiveValidatorsSelector);
  const inactiveLoading = useSelector(loadingValidatorsMonitoringSelector);

  useEffect(() => {
    dispatch(getValidatorMembers(TABLE_TYPES.validatorsShort));
    dispatch(getValidatorMembers(TABLE_TYPES.validatorsMonitoring, indexerUrl));
  }, []);

  return (
    <StyledWrapper className="block">
      <div>
        <h2 className="text-lg">{t('TOTAL_VALIDATORS')}</h2>
        <p ref={validatorsRef} className="total-validators__val text-xl font-semibold">–</p>
        <p className="total-validators__inactive text-sm font-light">
          {t('INACTIVE_COUNT', { count: inactiveLoading ? '…' : inactiveValidators })}
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
