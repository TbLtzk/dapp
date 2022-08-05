import { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import InfoTooltip from 'components/Tooltips/InfoTooltip';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInfinityNumber from 'hooks/useInfinityNumber';

import AllocationProxy from './AllocationProxy';
import QTokenRewardUpdate from './QTokenRewardUpdate';

import { getQVBalance } from 'store/q-vault/action-creators';
import { qvBalance } from 'store/q-vault/selectors';
import { getSystemBalance, getSystemReserveBalance } from 'store/system-balance/action-creators';
import { systemReserveBalanceSelector } from 'store/system-balance/selectors';
import { getRewardPoolsBalance } from 'store/validation-reward-pools/action-creators';
import { rewardPoolsBalanceSelector } from 'store/validation-reward-pools/selectors';

function TokenomicsBlock () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const balanceDetails = useSelector(qvBalance);
  const balanceRewardPoolRef = useAnimateNumber(balanceDetails?.qHolderRewardPool);

  const balanceInterestRateRef = useAnimateNumber(balanceDetails?.interestRatePercentage, ' %');

  const reserveBalance = useSelector(systemReserveBalanceSelector);
  const reserveBalanceRef = useInfinityNumber(reserveBalance, ' Q');

  const rewardPoolsBalance = useSelector(rewardPoolsBalanceSelector);
  const rewardPoolsBalanceRef = useInfinityNumber(rewardPoolsBalance, ' Q');

  useEffect(() => {
    dispatch(getQVBalance());
    dispatch(getSystemBalance());
    dispatch(getRewardPoolsBalance());
    dispatch(getSystemReserveBalance());
  }, []);

  const tokenomicsInfo = [
    {
      id: 'allocationProxy',
      component: <AllocationProxy />,
    },
    {
      id: 'reward-pool',
      title: t('Q_TOKEN_HOLDER_REWARD_POOL'),
      ref: balanceRewardPoolRef,
    },
    {
      id: 'reward-rate',
      title: t('Q_TOKEN_HOLDER_REWARD_RATE'),
      ref: balanceInterestRateRef,
    },
    { id: 'qTokenRewardUpdate', component: <QTokenRewardUpdate /> },
    {
      id: 'system-reserve',
      title: t('Q_SYSTEM_RESERVE'),
      ref: reserveBalanceRef,
    },
    {
      id: 'reward-pools',
      title: t('VALIDATION_REWARD_POOLS'),
      ref: rewardPoolsBalanceRef,
    },
  ];

  return (
    <div className="block">
      <h2 className="text-h3">
        <span>{t('TOKENOMICS')}</span>
        <InfoTooltip topic="tokenomics" />
      </h2>
      <div className="block__tight-content">
        {tokenomicsInfo.map((item) => (
          <Fragment key={item.id}>
            {item.component || (
              <div>
                <p className="text-sm color-secondary">{item.title}</p>
                <p ref={item.ref} className="text-lg font-semibold">0 Q</p>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default TokenomicsBlock;
