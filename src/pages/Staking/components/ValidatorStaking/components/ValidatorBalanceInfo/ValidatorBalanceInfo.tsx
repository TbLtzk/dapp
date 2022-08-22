import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { fromWei } from 'web3-utils';

import { userAddressMetamask } from 'store/user-inf/selectors';
import {
  accountableTotalStake,
  isUserValidator,
  validatorsMinimumTimeLock,
  validatorsWidenedSelector,
  validatorWithdrawalInfo,
} from 'store/validators/selectors';

import { formatDateGMT, unixToDate } from 'utils/date';
import { formatAsset } from 'utils/numbers';

function ValidatorBalanceInfo () {
  const { t } = useTranslation();

  const address = useSelector(userAddressMetamask);
  const isThisUserValidator = useSelector(isUserValidator);

  const userAccountableTotalStake = useSelector(accountableTotalStake);
  const withdrawalInfo = useSelector(validatorWithdrawalInfo);
  const validatorLockedAmount = useSelector(validatorsMinimumTimeLock);
  const memberTable = useSelector(validatorsWidenedSelector);

  const userRank = memberTable.find((member: any) => member.address === address)?.rank;

  return (
    <div className="block-body">
      <div>
        <p className="color-secondary text-md">{t('STATUS')}</p>
        <p className="text-xl font-semibold">{isThisUserValidator ? t('ACTIVE_VALIDATOR') : t('NOT_A_VALIDATOR')}</p>
      </div>
      <div>
        <p className="color-secondary text-md">{t('CURRENT_RANK')}</p>
        <p className="text-xl font-semibold">{userRank ? `${userRank} #` : '–'}</p>
      </div>

      <div>
        <p className="color-secondary text-md">{t('STAKE_IN_VALIDATOR_RANKING')}</p>
        <p className="text-xl font-semibold">{formatAsset(userAccountableTotalStake, 'Q')}</p>
      </div>

      {Number(validatorLockedAmount) > 0 && (
        <div>
          <p className="color-secondary text-md">{t('TIME_LOCKED_AMOUNT')}</p>
          <p className="text-xl font-semibold">{formatAsset(validatorLockedAmount, 'Q')}</p>
        </div>
      )}

      <div>
        <p className="color-secondary text-md">{t('ANNOUNCE_WITHDRAWAL')}</p>
        <p className="text-xl font-semibold">{formatAsset(fromWei(withdrawalInfo.amount || '0'), 'Q')}</p>
      </div>

      <div>
        <p className="color-secondary text-md">{t('ANNOUNCEMENT_STATUS')}</p>
        <p className="text-xl font-semibold">{Number(withdrawalInfo?.amount) > 0 ? 'Pending' : '–'}</p>
      </div>

      <div>
        <p className="color-secondary text-md">{t('ANNOUNCEMENT_END')}</p>
        <p className="text-xl font-semibold">
          {withdrawalInfo && Number(withdrawalInfo?.amount) > 0 ? formatDateGMT(unixToDate(withdrawalInfo.endTime)) : '–'}
        </p>
      </div>
    </div>
  );
}

export default ValidatorBalanceInfo;
