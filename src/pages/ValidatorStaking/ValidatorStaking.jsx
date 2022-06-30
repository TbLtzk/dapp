import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock';
import PageWrap from 'components/Base/PageWrap';
import InfoTooltip from 'components/Custom/InfoTooltip';
import ValidatorsPanel from 'components/Custom/Tables/ValidatorsTable';

import StakerRewardPool from './components/StakerRewardPool';
import ValidatorBalanceForm from './components/ValidatorBalanceForm';
import ValidatorBalanceInfo from './components/ValidatorBalanceInfo';

import { getAccountBalance } from 'store/q-vault/action-creators';
import { userAddressMetamask } from 'store/user-inf/selectors';
import {
  getAccountableTotalStake,
  getIsUserValidator,
  getMinimumValidatorsTimeLock,
  getValidatorWithdrawalInfo,
} from 'store/validators/action-creators';

import TABLE_TYPES from 'constants/tableTypes';

function ValidatorStaking () {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);

  useEffect(() => {
    dispatch(getAccountBalance(address));
    dispatch(getIsUserValidator(address));
    dispatch(getMinimumValidatorsTimeLock(address));
    dispatch(getAccountableTotalStake(address));
    dispatch(getValidatorWithdrawalInfo(address));
  }, [dispatch]);

  return (
    <PageWrap
      pageHeader="Validator Staking"
      pageTooltip={<InfoTooltip topic="validator-staking" placement="bottom" />}
      pageButton={<StakerRewardPool />}
    >
      <CustomBlock>
        <h1>Manage Balance</h1>
        <ValidatorBalanceInfo />
        <ValidatorBalanceForm />
      </CustomBlock>

      <ValidatorsPanel
        bottom
        type="with-total"
        tableType={TABLE_TYPES.validatorsWidened}
        buttons={
          <div className="card__actions">
            <Link to="/q-vault">
              <Button
                alwaysEnabled
                look="white"
              >
                <i className="mdi mdi-arrow-right" />
                <span>{t('GO_TO_Q_VAULT')}</span>
              </Button>
            </Link>
          </div>
        }
      />
    </PageWrap>
  );
}

export default ValidatorStaking;
