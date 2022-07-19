import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';

import { StatsContainer } from 'pages/Governance/components/VotingStats/styles';

import { AuctionStatsContainer } from './styles';

import { getAccountBalance, getUserBalance } from 'store/q-vault/action-creators';
import { accountBalance, userBalance } from 'store/q-vault/selectors';
import { getSavingAviableToDeposit } from 'store/saving-assets/action-creators';
import { savingAviableToDepositSelector } from 'store/saving-assets/selectors';
import { getSymbol } from 'store/stable-coin/action-creators';
import { getDebt, getSurplus, getSystemBalance, onPerformNetting } from 'store/system-balance/action-creators';
import { debtSB, loadingPerformNetting, surplusSB, systemBalanceSB } from 'store/system-balance/selectors';
import { getAvailableAmount, getSystemReserveBalance } from 'store/system-reserve/action-creators';
import { availableAmountSR, reserveBalanceSelector } from 'store/system-reserve/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { getEPDRUint } from 'contracts/helpers/epdr-param-helper';

import { fN } from 'func/useful';

function AuctionStats () {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userAddress = useSelector(userAddressMetamask);
  const userBalanceQ = useSelector(accountBalance);
  const surplus = useSelector(surplusSB);
  const debt = useSelector(debtSB);
  const QUSDUserBalanceAmount = useSelector(savingAviableToDepositSelector);

  const systemBalanceResult = useSelector(systemBalanceSB);
  const availableAmount = useSelector(availableAmountSR);
  const userQVBalance = useSelector(userBalance);
  const loadingPerfNetting = useSelector(loadingPerformNetting);
  const reserveBalance = useSelector(reserveBalanceSelector);

  const [surplusLot, setSurplusLot] = useState<string | number>('0');
  const [reserveLot, setReserveLot] = useState<string | number>('0');

  useEffect(() => {
    if (!loadingPerfNetting) {
      getEPDRUint('governed.EPDR.reserveLot')
        .then((value) => setReserveLot(value))
        .catch((err) => setReserveLot(err.message));
      getEPDRUint('governed.EPDR.QUSD_surplusLot')
        .then((value) => setSurplusLot(value))
        .catch((err) => setSurplusLot(err.message));
    }
  }, [loadingPerfNetting, dispatch]);

  useEffect(() => {
    dispatch(getSurplus());
    dispatch(getDebt());
    dispatch(getAccountBalance(userAddress));
    dispatch(getSystemBalance());
    dispatch(getAvailableAmount());
    dispatch(getSavingAviableToDeposit());
    dispatch(getUserBalance(userAddress));
    dispatch(getSymbol());
    dispatch(getSystemReserveBalance());

    return () => {
      setSurplusLot('0');
      setReserveLot('0');
    };
  }, [dispatch]);

  const statsData = useMemo(() => {
    return [
      {
        title: t('AVAILABLE_Q_BALANCE'),
        value: fN(userBalanceQ) + ' Q',
      },
      {
        title: t('Q_BALANCE_IN_Q_VAULT'),
        value: fN(userQVBalance) + ' Q',
      },
      {
        title: t('QUSD_BALANCE'),
        value: fN(QUSDUserBalanceAmount) + ' QUSD',
      },
    ];
  }, [userQVBalance, userBalanceQ, QUSDUserBalanceAmount]);

  const systemBalance = useMemo(() => {
    return [
      {
        title: t('COLLECTED_SURPLUS'),
        value: fN(surplus) + ' QUSD',
      },
      {
        title: t('OPEN_DEBT'),
        value: fN(debt) + ' QUSD',
      },
      {
        title: t('BALANCE'),
        value: fN(systemBalanceResult) + ' QUSD',
      },
      {
        title: t('SURPLUS_AUCTION_LOT'),
        value: fN(surplusLot) + ' QUSD',
      },
    ];
  }, [surplus, debt, systemBalanceResult, surplusLot]);

  const systemReserve = useMemo(() => {
    return [
      {
        title: t('RESERVE_BALANCE'),
        value: fN(reserveBalance) + ' Q',
      },
      {
        title: t('IMMEDIATELY_AVAILABLE'),
        value: fN(availableAmount) + ' Q',
      },
      {
        title: t('DEBT_AUCTION_LOT'),
        value: fN(reserveLot) + ' Q',
      },
    ];
  }, [availableAmount, reserveBalance, reserveLot]);

  return (
    <AuctionStatsContainer>
      <StatsContainer className="block">
        <div className="stats-head">
          <h2 className="text-h2">{t('AUCTION_STATS')}</h2>
        </div>
        <div>
          {statsData.map(({ title, value }) => (
            <div key={title} className="stats-item auction-item">
              <p className="stats-item-lbl text-md">{title}</p>
              <p className="stats-item-val text-xl" title={String(value)}>
                {value}
              </p>
            </div>
          ))}
        </div>
        <div className="buttons">
          <Button
            loading={loadingPerfNetting}
            look="secondary"
            onClick={() => dispatch(onPerformNetting())}
          >
            {t('PERFORM_NETTING')}
          </Button>
        </div>
      </StatsContainer>

      <StatsContainer className="block">
        <div className="stats-head">
          <h2 className="text-h2">{t('QUSD_SYSTEM_BALANCE')}</h2>
        </div>
        <div>
          {systemBalance.map(({ title, value }) => (
            <div key={title} className="stats-item auction-item">
              <p className="stats-item-lbl text-md">{title}</p>
              <p className="stats-item-val text-xl" title={String(value)}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </StatsContainer>

      <StatsContainer className="block auction-stats">
        <div className="stats-head">
          <h2 className="text-h2">{t('Q_SYSTEM_RESERVE')}</h2>
        </div>
        <div>
          {systemReserve.map(({ title, value }) => (
            <div key={title} className="stats-item auction-item">
              <p className="stats-item-lbl text-md">{title}</p>
              <p className="stats-item-val text-xl" title={String(value)}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </StatsContainer>
    </AuctionStatsContainer>
  );
}

export default AuctionStats;
