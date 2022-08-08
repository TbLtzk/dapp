import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { isUserRootNode, rootMinimumTimeLock, rootNodeStake, withdrawals } from 'store/root-node/selectors';

import { fromWei } from 'utils/balance';
import { fromSolDateFormattingT1 } from 'utils/date';
import { fN } from 'utils/useful';

function RootBalanceInfo () {
  const { t } = useTranslation();

  const isUserRoot = useSelector(isUserRootNode);
  const amountNodeStake = useSelector(rootNodeStake);
  const withdrawalsData = useSelector(withdrawals);
  const rootTimeLockMinimumBalance = useSelector(rootMinimumTimeLock);

  return (
    <div className="block-body">
      <div>
        <p className="text-md">{t('STATUS')}</p>
        <h4 className="text-xl">{isUserRoot ? t('MEMBER_OF_ROOT_NODE_PANEL') : t('NOT_A_MEMBER_OF_ROOT_NODE_PANEL')}</h4>
      </div>

      <div>
        <p className="text-md">{t('STAKE_IN_ROOT_NODE_RANKING')}</p>
        <h4 className="text-xl">{fN(amountNodeStake)} Q</h4>
      </div>

      {Number(rootTimeLockMinimumBalance) > 0 && (
        <div>
          <p className="text-md">{t('TIME_LOCKED_AMOUNT')}</p>
          <h4 className="text-xl">{fN(rootTimeLockMinimumBalance)} Q</h4>
        </div>
      )}

      <div>
        <p className="text-md">{t('ANNOUNCED_FOR_WITHDRAWAL')}</p>
        <h4 className="text-xl">{fN(fromWei(withdrawalsData?.amount))} Q</h4>
      </div>

      <div>
        <p className="text-md">{t('ANNOUNCEMENT_STATUS')}</p>
        <h4 className="text-xl">{Number(withdrawalsData?.amount) > 0 ? t('PENDING') : '-'}</h4>
      </div>

      <div>
        <p className="text-md">{t('ANNOUNCEMENT_END')}</p>
        <h4 className="text-xl">
          {Number(withdrawalsData?.amount) > 0 && withdrawalsData
            ? fromSolDateFormattingT1(withdrawalsData?.endTime)
            : '-'
          }
        </h4>
      </div>
    </div>
  );
}

export default RootBalanceInfo;
