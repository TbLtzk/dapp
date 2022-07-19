import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { userAddressMetamask } from 'store/user-inf/selectors';
import {
  accountableTotalStake,
  isUserValidator,
  validatorsMinimumTimeLock,
  validatorsWidenedSelector,
  validatorWithdrawalInfo,
} from 'store/validators/selectors';

import { fromWei } from 'func/balance';
import { fromSolDateFormattingT1 } from 'func/date';
import { fN } from 'func/useful';

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
        <h4 className="text-xl">{fN(userAccountableTotalStake)} Q</h4>
      </div>

      {Number(validatorLockedAmount) > 0 && (
        <div>
          <p className="text-md">{t('TIME_LOCKED_AMOUNT')}</p>
          <h4 className="text-xl">{fN(validatorLockedAmount)} Q </h4>
        </div>
      )}

      <div>
        <p className="text-md">{t('ANNOUNCE_WITHDRAWAL')}</p>
        <h4 className="text-xl">{fromWei(withdrawalInfo.amount)} Q</h4>
      </div>

      <div>
        <p className="text-md">{t('ANNOUNCEMENT_STATUS')}</p>
        <h4 className="text-xl">{Number(withdrawalInfo?.amount) > 0 ? 'Pending' : '-'}</h4>
      </div>

      <div>
        <p className="text-md">{t('ANNOUNCEMENT_END')}</p>
        <h4 className="text-xl">
          {withdrawalInfo && Number(withdrawalInfo?.amount) > 0 ? fromSolDateFormattingT1(withdrawalInfo.endTime) : '-'}
        </h4>
      </div>
    </div>
  );
}

export default ValidatorBalanceInfo;
