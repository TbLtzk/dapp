import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock';
import PageWrap from 'components/Base/PageWrap';
import ValidatorsPanel from 'components/Custom/MembersPanel/ValidatorsPanel';

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
  const history = useHistory();

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
    <PageWrap pageHeader="Validator Staking" pageButton={<StakerRewardPool />}>
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
            <Button
              alwaysEnabled
              look="white"
              onClick={() => history.push({ pathname: '/q-vault' })}
            >
              <i className="mdi mdi-arrow-right" />
              <span>{t('GO_TO_Q_VAULT')}</span>
            </Button>
          </div>
        }
      />
    </PageWrap>
  );
}

export default ValidatorStaking;
