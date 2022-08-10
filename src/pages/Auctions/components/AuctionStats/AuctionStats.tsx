import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { StatsContainer } from 'pages/Governance/components/VotingStats/styles';
import Button from 'ui/Button';

import useMetamaskReset from 'hooks/useMetamaskReset';

import { AuctionStatsContainer } from './styles';

import { getAccountBalance, getUserBalance } from 'store/q-vault/action-creators';
import { accountBalance, userBalance } from 'store/q-vault/selectors';
import { getSavingAviableToDeposit } from 'store/saving-assets/action-creators';
import { savingAviableToDepositSelector } from 'store/saving-assets/selectors';
import {
  getSystemBalance,
  getSystemBalanceDebt,
  getSystemBalanceSurplus,
  getSystemReserveAvailableAmount,
  getSystemReserveBalance,
  setPerformNetting,
} from 'store/system-balance/action-creators';
import {
  systemBalanceDebtSelector,
  systemBalanceSelector,
  systemBalanceSurplusSelector,
  systemReserveAvailableAmountSelector,
  systemReserveBalanceSelector,
} from 'store/system-balance/selectors';

import { getEPDRUint } from 'contracts/helpers/epdr-param-helper';

import { TRANSACTION_TYPES } from 'constants/statuses';
import { formatAsset } from 'utils/numbers';

function AuctionStats () {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userWalletBalance = useSelector(accountBalance);
  const userQVaultBalance = useSelector(userBalance);

  const systemBalanceSurplus = useSelector(systemBalanceSurplusSelector);
  const savingAviableToDeposit = useSelector(savingAviableToDepositSelector);
  const systemBalance = useSelector(systemBalanceSelector);
  const systemBalanceDebt = useSelector(systemBalanceDebtSelector);
  const systemReserveAvailableAmount = useSelector(systemReserveAvailableAmountSelector);
  const systemReserveBalance = useSelector(systemReserveBalanceSelector);

  const [surplusLot, setSurplusLot] = useState<string | number>('0');
  const [reserveLot, setReserveLot] = useState<string | number>('0');

  useEffect(() => {
    getParams();
  }, [dispatch]);

  const getParams = () => {
    getEPDRUint('governed.EPDR.reserveLot')
      .then((value) => setReserveLot(value))
      .catch((err) => setReserveLot(err.message));
    getEPDRUint('governed.EPDR.QUSD_surplusLot')
      .then((value) => setSurplusLot(value))
      .catch((err) => setSurplusLot(err.message));
  };

  useMetamaskReset(TRANSACTION_TYPES.success, () => getParams());

  useEffect(() => {
    dispatch(getAccountBalance());
    dispatch(getUserBalance());
    dispatch(getSystemBalance());
    dispatch(getSystemBalanceDebt());
    dispatch(getSystemBalanceSurplus());
    dispatch(getSavingAviableToDeposit());
    dispatch(getSystemReserveBalance());
    dispatch(getSystemReserveAvailableAmount());

    return () => {
      setSurplusLot('0');
      setReserveLot('0');
    };
  }, [dispatch]);

  const auctionStats1 = [
    {
      title: t('AVAILABLE_Q_BALANCE'),
      value: formatAsset(userWalletBalance, 'Q'),
    },
    {
      title: t('Q_BALANCE_IN_Q_VAULT'),
      value: formatAsset(userQVaultBalance, 'Q'),
    },
    {
      title: t('QUSD_BALANCE'),
      value: formatAsset(savingAviableToDeposit, 'QUSD'),
    },
  ];

  const auctionStats2 = [
    {
      title: t('COLLECTED_SURPLUS'),
      value: formatAsset(systemBalanceSurplus, 'QUSD'),
    },
    {
      title: t('OPEN_DEBT'),
      value: formatAsset(systemBalanceDebt, 'QUSD'),
    },
    {
      title: t('SYSTEM_BALANCE'),
      value: formatAsset(systemBalance, 'QUSD'),
    },
    {
      title: t('SURPLUS_AUCTION_LOT'),
      value: formatAsset(surplusLot, 'QUSD'),
    },
  ];

  const auctionStats3 = [
    {
      title: t('RESERVE_BALANCE'),
      value: formatAsset(systemReserveBalance, 'Q'),
    },
    {
      title: t('IMMEDIATELY_AVAILABLE'),
      value: formatAsset(systemReserveAvailableAmount, 'Q'),
    },
    {
      title: t('DEBT_AUCTION_LOT'),
      value: formatAsset(reserveLot, 'Q'),
    },
  ];

  return (
    <AuctionStatsContainer>
      <StatsContainer className="block">
        <div className="stats-head">
          <h2 className="text-h2">{t('AUCTION_STATS')}</h2>
        </div>
        <div>
          {auctionStats1.map(({ title, value }) => (
            <div key={title} className="stats-item auction-item">
              <p className="stats-item-lbl text-md">{title}</p>
              <p className="stats-item-val text-xl" title={String(value)}>
                {value}
              </p>
            </div>
          ))}
        </div>
        <div className="buttons">
          <Button look="secondary" onClick={() => dispatch(setPerformNetting())}>
            {t('PERFORM_NETTING')}
          </Button>
        </div>
      </StatsContainer>

      <StatsContainer className="block">
        <div className="stats-head">
          <h2 className="text-h2">{t('QUSD_SYSTEM_BALANCE')}</h2>
        </div>
        <div>
          {auctionStats2.map(({ title, value }) => (
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
          {auctionStats3.map(({ title, value }) => (
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
