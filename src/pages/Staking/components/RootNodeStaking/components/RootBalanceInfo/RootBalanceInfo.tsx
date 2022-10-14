import { useTranslation } from 'react-i18next';

import { formatAsset } from '@q-dev/utils';
import { fromWei } from 'web3-utils';

import { useRootNodes } from 'store/root-nodes/hooks';

import { formatDateGMT, unixToDate } from 'utils/date';

function RootBalanceInfo () {
  const { t, i18n } = useTranslation();
  const { isRootNode, rootNodeStake, withdrawalInfo, rootMinimumTimeLock } = useRootNodes();

  return (
    <div className="block-body">
      <div>
        <p className="color-secondary text-md">{t('STATUS')}</p>
        <p className="text-xl font-semibold">{isRootNode ? t('MEMBER_OF_ROOT_NODE_PANEL') : t('NOT_A_MEMBER_OF_ROOT_NODE_PANEL')}</p>
      </div>

      <div>
        <p className="color-secondary text-md">{t('STAKE_IN_ROOT_NODE_RANKING')}</p>
        <p className="text-xl font-semibold">{formatAsset(rootNodeStake, 'Q')}</p>
      </div>

      {Number(rootMinimumTimeLock) > 0 && (
        <div>
          <p className="color-secondary text-md">{t('TIME_LOCKED_AMOUNT')}</p>
          <p className="text-xl font-semibold">{formatAsset(rootMinimumTimeLock, 'Q')}</p>
        </div>
      )}

      <div>
        <p className="color-secondary text-md">{t('ANNOUNCED_FOR_WITHDRAWAL')}</p>
        <p className="text-xl font-semibold">{formatAsset(fromWei(withdrawalInfo.amount || '0'), 'Q')}</p>
      </div>

      <div>
        <p className="color-secondary text-md">{t('ANNOUNCEMENT_STATUS')}</p>
        <p className="text-xl font-semibold">{Number(withdrawalInfo.amount) > 0 ? t('PENDING') : '–'}</p>
      </div>

      <div>
        <p className="color-secondary text-md">{t('ANNOUNCEMENT_END')}</p>
        <p className="text-xl font-semibold">
          {Number(withdrawalInfo.amount) > 0
            ? formatDateGMT(unixToDate(withdrawalInfo.endTime), i18n.language)
            : '–'
          }
        </p>
      </div>
    </div>
  );
}

export default RootBalanceInfo;
