import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    <PageWrap headerTitle="Validator Staking" headerExtra={<StakerRewardPool />}>
      <CustomBlock>
        <h1>Manage Balance</h1>
        <ValidatorBalanceInfo />
        <ValidatorBalanceForm />
      </CustomBlock>

      <ValidatorsPanel
        bottom
        buttons="q-vault"
        type="with-total"
        tableType={TABLE_TYPES.validatorsWidened}
      />
    </PageWrap>
  );
}

export default ValidatorStaking;
