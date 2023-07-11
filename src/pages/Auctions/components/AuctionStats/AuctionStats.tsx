import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { formatAsset } from '@q-dev/utils';

import Button from 'components/Button';
import { StatsContainer } from 'pages/Governance/components/VotingStats/styles';

import { AuctionStatsContainer } from './styles';

import { useQVault } from 'store/q-vault/hooks';
import { useSaving } from 'store/saving/hooks';
import { useSystemAssetBalance, useSystemBalance } from 'store/system-balance/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { getEPDRUint } from 'contracts/helpers/epdr-param-helper';

function AuctionStats () {
  const { t } = useTranslation();
  const { pendingTransactions, submitTransaction } = useTransaction();

  const {
    walletBalance,
    vaultBalance,
    loadWalletBalance,
    loadVaultBalance,
  } = useQVault();

  const { savingAvailableToDeposit, loadSavingAvailableToDeposit } = useSaving('QUSD');
  const {
    systemBalance,
    systemBalanceDebt,
    systemBalanceSurplus,
    loadSystemBalance,
    loadSystemBalanceDebt,
    loadSystemBalanceSurplus,
    performNetting
  } = useSystemAssetBalance('QUSD');

  const {
    systemReserveAvailableAmount,
    systemReserveBalance,
    loadSystemReserveBalance,
    loadSystemReserveAvailableAmount,
  } = useSystemBalance();

  const [surplusLot, setSurplusLot] = useState<string | number>('0');
  const [reserveLot, setReserveLot] = useState<string | number>('0');

  useEffect(() => {
    getParams();
  }, [pendingTransactions.length]);

  const getParams = () => {
    getEPDRUint('governed.EPDR.reserveLot')
      .then((value) => setReserveLot(value))
      .catch((err) => setReserveLot(err.message));
    getEPDRUint('governed.EPDR.QUSD_surplusLot')
      .then((value) => setSurplusLot(value))
      .catch((err) => setSurplusLot(err.message));
  };

  useEffect(() => {
    loadWalletBalance();
    loadVaultBalance();
    loadSavingAvailableToDeposit();
    loadSystemBalance();
    loadSystemBalanceDebt();
    loadSystemBalanceSurplus();
    loadSystemReserveBalance();
    loadSystemReserveAvailableAmount();

    return () => {
      setSurplusLot('0');
      setReserveLot('0');
    };
  }, []);

  const auctionStats1 = [
    {
      title: t('AVAILABLE_Q_BALANCE'),
      value: formatAsset(walletBalance, 'Q'),
    },
    {
      title: t('Q_BALANCE_IN_Q_VAULT'),
      value: formatAsset(vaultBalance, 'Q'),
    },
    {
      title: t('ASSET_BALANCE', { asset: 'QUSD' }),
      value: formatAsset(savingAvailableToDeposit, 'QUSD'),
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
          <Button
            look="secondary"
            onClick={() => submitTransaction({
              isClosedModal: true,
              submitFn: performNetting
            })}
          >
            {t('PERFORM_NETTING')}
          </Button>
        </div>
      </StatsContainer>

      <StatsContainer className="block">
        <div className="stats-head">
          <h2 className="text-h2">
            {t('ASSET_SYSTEM_BALANCE', { asset: 'QUSD' })}
          </h2>
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
