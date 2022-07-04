import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'ui/Button';

import InfoTooltip from 'components/Custom/InfoTooltip';
import ValidatorsTable from 'components/Custom/Tables/ValidatorsTable';

import StakerRewardPool from './components/StakerRewardPool';
import ValidatorBalanceInfo from './components/ValidatorBalanceInfo';
import ValidatorMenu from './components/ValidatorMenu';

import { getAccountBalance } from 'store/q-vault/action-creators';
import { userAddressMetamask } from 'store/user-inf/selectors';
import {
  getAccountableTotalStake,
  getIsUserValidator,
  getMinimumValidatorsTimeLock,
  getValidatorWithdrawalInfo,
  setValidatorsEnterShortList,
} from 'store/validators/action-creators';
import { isUserValidator } from 'store/validators/selectors';

import TABLE_TYPES from 'constants/tableTypes';

export const FORM_TYPES = {
  stakeToRanking: 'stake-to-ranking',
  announceWithdrawal: 'announce-withdrawal',
  withdrawFromRanking: 'withdraw-from-ranking',
};

function ValidatorStaking () {
  const dispatch = useDispatch();
  const isValidator = useSelector(isUserValidator);
  const address = useSelector(userAddressMetamask);

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAccountBalance(address));
    dispatch(getIsUserValidator(address));
    dispatch(getMinimumValidatorsTimeLock(address));
    dispatch(getAccountableTotalStake(address));
    dispatch(getValidatorWithdrawalInfo(address));
  }, [dispatch]);

  const handleEnterShortList = () => {
    dispatch(setValidatorsEnterShortList(address));
  };
  return (
    <>
      <div className="block">
        <div className="block_header">
          <div className="block_header-title">
            <h2 className="text-h2">Manage Balance</h2>
            <InfoTooltip topic="validator-staking" placement="top" />
          </div>

          <div className="block_header-buttons">
            <ValidatorMenu />
            <StakerRewardPool />
            {!isValidator && (
              <Button style={{ margin: '0 0 0 10px' }} onClick={handleEnterShortList}>
                Join Validator Ranking
              </Button>
            )}
          </div>
        </div>

        <ValidatorBalanceInfo />
      </div>
      <ValidatorsTable
        tableType={TABLE_TYPES.validatorsWidened}
        buttons={
          <Link to="/q-vault">
            <Button alwaysEnabled look="ghost">
              <i className="mdi mdi-arrow-right" />
              <span>{t('GO_TO_Q_VAULT')}</span>
            </Button>
          </Link>
        }
      />
    </>
  );
}

export default ValidatorStaking;
