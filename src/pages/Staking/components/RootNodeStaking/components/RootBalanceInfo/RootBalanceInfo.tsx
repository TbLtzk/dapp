import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { fromWei } from 'web3-utils';

import { isUserRootNode, rootMinimumTimeLock, rootNodeStake, withdrawals } from 'store/root-node/selectors';

import { formatDateGMT, unixToDate } from 'utils/date';
import { formatAsset } from 'utils/numbers';

function RootBalanceInfo () {
  const { t } = useTranslation();

  const isUserRoot = useSelector(isUserRootNode);
  const amountNodeStake = useSelector(rootNodeStake);
  const withdrawalsData = useSelector(withdrawals);
  const rootTimeLockMinimumBalance = useSelector(rootMinimumTimeLock);

  return (
    <div className="block-body">
      <div>
        <p className="color-secondary text-md">{t('STATUS')}</p>
        <p className="text-xl font-semibold">{isUserRoot ? t('MEMBER_OF_ROOT_NODE_PANEL') : t('NOT_A_MEMBER_OF_ROOT_NODE_PANEL')}</p>
      </div>

      <div>
        <p className="color-secondary text-md">{t('STAKE_IN_ROOT_NODE_RANKING')}</p>
        <p className="text-xl font-semibold">{formatAsset(amountNodeStake, 'Q')}</p>
      </div>

      {Number(rootTimeLockMinimumBalance) > 0 && (
        <div>
          <p className="color-secondary text-md">{t('TIME_LOCKED_AMOUNT')}</p>
          <p className="text-xl font-semibold">{formatAsset(rootTimeLockMinimumBalance, 'Q')}</p>
        </div>
      )}

      <div>
        <p className="color-secondary text-md">{t('ANNOUNCED_FOR_WITHDRAWAL')}</p>
        <p className="text-xl font-semibold">{formatAsset(fromWei(withdrawalsData?.amount || '0'), 'Q')}</p>
      </div>

      <div>
        <p className="color-secondary text-md">{t('ANNOUNCEMENT_STATUS')}</p>
        <p className="text-xl font-semibold">{Number(withdrawalsData?.amount) > 0 ? t('PENDING') : '–'}</p>
      </div>

      <div>
        <p className="color-secondary text-md">{t('ANNOUNCEMENT_END')}</p>
        <p className="text-xl font-semibold">
          {Number(withdrawalsData?.amount) > 0 && withdrawalsData
            ? formatDateGMT(unixToDate(withdrawalsData?.endTime))
            : '–'
          }
        </p>
      </div>
    </div>
  );
}

export default RootBalanceInfo;
