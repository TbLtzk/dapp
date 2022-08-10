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
        <p className="text-md">{t('STATUS')}</p>
        <h4 className="text-xl">{isThisUserValidator ? t('ACTIVE_VALIDATOR') : t('NOT_A_VALIDATOR')}</h4>
      </div>
      <div>
        <p className="text-md">{t('CURRENT_RANK')}</p>
        <h4 className="text-xl">{userRank ? `${userRank} #` : '-'}</h4>
      </div>

      <div>
        <p className="text-md">{t('STAKE_IN_VALIDATOR_RANKING')}</p>
        <h4 className="text-xl">{formatAsset(userAccountableTotalStake, 'Q')}</h4>
      </div>

      {Number(validatorLockedAmount) > 0 && (
        <div>
          <p className="text-md">{t('TIME_LOCKED_AMOUNT')}</p>
          <h4 className="text-xl">{formatAsset(validatorLockedAmount, 'Q')}</h4>
        </div>
      )}

      <div>
        <p className="text-md">{t('ANNOUNCE_WITHDRAWAL')}</p>
        <h4 className="text-xl">{formatAsset(fromWei(withdrawalInfo.amount || '0'), 'Q')}</h4>
      </div>

      <div>
        <p className="text-md">{t('ANNOUNCEMENT_STATUS')}</p>
        <h4 className="text-xl">{Number(withdrawalInfo?.amount) > 0 ? 'Pending' : '-'}</h4>
      </div>

      <div>
        <p className="text-md">{t('ANNOUNCEMENT_END')}</p>
        <h4 className="text-xl">
          {withdrawalInfo && Number(withdrawalInfo?.amount) > 0 ? formatDateGMT(unixToDate(withdrawalInfo.endTime)) : '-'}
        </h4>
      </div>
    </div>
  );
}

export default ValidatorBalanceInfo;
