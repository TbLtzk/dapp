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
        <h4 className="text-lg">{isUserRoot ? t('MEMBER_OF_ROOT_NODE_PANEL') : t('NOT_A_MEMBER_OF_ROOT_NODE_PANEL')}</h4>
      </div>

      <div>
        <p className="color-secondary text-md">{t('STAKE_IN_ROOT_NODE_RANKING')}</p>
        <h4 className="text-lg">{formatAsset(amountNodeStake, 'Q')}</h4>
      </div>

      {Number(rootTimeLockMinimumBalance) > 0 && (
        <div>
          <p className="color-secondary text-md">{t('TIME_LOCKED_AMOUNT')}</p>
          <h4 className="text-lg">{formatAsset(rootTimeLockMinimumBalance, 'Q')}</h4>
        </div>
      )}

      <div>
        <p className="color-secondary text-md">{t('ANNOUNCED_FOR_WITHDRAWAL')}</p>
        <h4 className="text-lg">{formatAsset(fromWei(withdrawalsData?.amount || '0'), 'Q')}</h4>
      </div>

      <div>
        <p className="color-secondary text-md">{t('ANNOUNCEMENT_STATUS')}</p>
        <h4 className="text-lg">{Number(withdrawalsData?.amount) > 0 ? t('PENDING') : '-'}</h4>
      </div>

      <div>
        <p className="color-secondary text-md">{t('ANNOUNCEMENT_END')}</p>
        <h4 className="text-lg">
          {Number(withdrawalsData?.amount) > 0 && withdrawalsData
            ? formatDateGMT(unixToDate(withdrawalsData?.endTime))
            : '-'
          }
        </h4>
      </div>
    </div>
  );
}

export default RootBalanceInfo;
