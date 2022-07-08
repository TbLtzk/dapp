import { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';
import InfoTooltip from 'components/Custom/InfoTooltip';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInfinityNumber from 'hooks/useInfinityNumber';

import AllocationProxy from './AllocationProxy';
import QTokenRewardUpdate from './QTokenRewardUpdate';

import { getQVBalance } from 'store/q-vault/action-creators';
import { qvBalance } from 'store/q-vault/selectors';
import { getSystemReserveBalance } from 'store/system-reserve/action-creators';
import { reserveBalanceSelector } from 'store/system-reserve/selectors';
import { getRewardPoolsBalance } from 'store/validation-reward-pools/action-creators';
import { rewardPoolsBalanceSelector } from 'store/validation-reward-pools/selectors';

function TokenomicsBlock () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const balanceDetails = useSelector(qvBalance);
  const balanceRewardPoolRef = useAnimateNumber(balanceDetails?.qHolderRewardPool);

  const balanceInterestRateRef = useAnimateNumber(balanceDetails?.interestRatePercentage, ' %');

  const reserveBalance = useSelector(reserveBalanceSelector);
  const reserveBalanceRef = useInfinityNumber(reserveBalance, ' Q');

  const rewardPoolsBalance = useSelector(rewardPoolsBalanceSelector);
  const rewardPoolsBalanceRef = useInfinityNumber(rewardPoolsBalance, ' Q');

  useEffect(() => {
    dispatch(getQVBalance());
    dispatch(getSystemReserveBalance());
    dispatch(getRewardPoolsBalance());
  }, []);

  const tokenimicsInfo = [
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
    <CustomBlock style={{ marginBottom: 0 }}>
      <h1>
        <span>{t('TOKENOMICS')}</span>
        <InfoTooltip topic="tokenomics" />
      </h1>
      {tokenimicsInfo.map((item) => (
        <Fragment key={item.id}>
          {item.component
            ? (
              item.component
            )
            : (
              <div className="card_block">
                <div>
                  <h5>{item.title}</h5>
                  {item.ref ? <p ref={item.ref}>0 Q</p> : <p>{item.content}</p>}
                </div>
              </div>
            )}
        </Fragment>
      ))}
    </CustomBlock>
  );
}

export default TokenomicsBlock;
