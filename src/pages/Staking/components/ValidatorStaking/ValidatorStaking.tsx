import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';

import ValidatorsTable from 'components/Tables/ValidatorsTable';
import InfoTooltip from 'components/Tooltips/InfoTooltip';

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

export const FORM_TYPES = {
  stakeToRanking: 'stake-to-ranking',
  announceWithdrawal: 'announce-withdrawal',
  withdrawFromRanking: 'withdraw-from-ranking',
};

function ValidatorStaking () {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const isValidator = useSelector(isUserValidator);
  const address = useSelector(userAddressMetamask);

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
            <h2 className="text-h2">{t('MANAGE_BALANCE')}</h2>
            <InfoTooltip topic="validator-staking" placement="top" />
          </div>

          <div className="block_header-buttons">
            <ValidatorMenu />
            <StakerRewardPool />
            {!isValidator && (
              <Button onClick={handleEnterShortList}>
                {t('JOIN_VALIDATOR_RANKING')}
              </Button>
            )}
          </div>
        </div>

        <ValidatorBalanceInfo />
      </div>
      <ValidatorsTable tableType="validators-widened" />
    </>
  );
}

export default ValidatorStaking;
