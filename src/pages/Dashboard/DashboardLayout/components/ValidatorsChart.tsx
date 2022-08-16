import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import AddressIcon from 'components/Custom/AddressIcon';
import InfoTooltip from 'components/Tooltips/InfoTooltip';
import Button from 'ui/Button';
import DonutChart from 'ui/DonutChart';
import Spinner from 'ui/Spinner';

import { getValidatorMembers } from 'store/validators/action-creators';
import { loadingValidatorsShortSelector, validatorsShortSelector } from 'store/validators/selectors';

import { TABLE_TYPES } from 'constants/tableTypes';
import { formatNumber } from 'utils/numbers';
import { trimAddress } from 'utils/strings';

const StyledWrapper = styled.div`
  grid-area: validators;
  
  .validators__header {
    margin-right: -8px;
  }

  .validators__loading-wrp {
    display: grid;
    place-content: center;
    padding: 40px;
  }
`;

function ValidatorsChart () {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const validators = useSelector(validatorsShortSelector);
  const isLoading = useSelector(loadingValidatorsShortSelector);

  useEffect(() => {
    dispatch(getValidatorMembers(TABLE_TYPES.validatorsShort));
  }, [dispatch]);

  return (
    <StyledWrapper className="block">
      <div className="validators__header block__header">
        <h2 className="text-h3">
          <span>{t('VALIDATOR_STAKING')}</span>
          <InfoTooltip topic="validator-ranking" />
        </h2>

        <Link to="/staking/validator-staking">
          <Button
            block
            compact
            alwaysEnabled
            look="ghost"
          >
            {t('SHOW_MORE')}
          </Button>
        </Link>
      </div>

      <div className="block__content">
        {isLoading
          ? (
            <div className="validators__loading-wrp">
              <Spinner size={96} thickness={4} />
            </div>
          )
          : (
            <DonutChart
              totalLabel={t('TOTAL_STAKE')}
              formatValue={(val) => `${formatNumber(val, 2)} Q`}
              options={validators.map((item: any) => ({
                label: trimAddress(item.validator),
                value: Number(item.amount),
                icon: <AddressIcon address={item.validator} />,
              }))}
            />
          )}
      </div>
    </StyledWrapper>
  );
}

export default ValidatorsChart;
