import { ComponentProps, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { formatAsset, unixToDate } from '@q-dev/utils';
import { StablecoinAsset } from 'typings/defi';

import Button from 'components/Button';
import InfoTooltip from 'components/Tooltips/InfoTooltip/InfoTooltip';
import { StatsContainer } from 'pages/Governance/components/VotingStats/styles';

import { AuctionStatsContainer } from './styles';

import { useSaving } from 'store/saving/hooks';
import { useSystemAssetBalance, useSystemReserve } from 'store/system-balance/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { getEPDRUint } from 'contracts/helpers/epdr-param-helper';

import { formatDate } from 'utils/date';

type TooltipTopic = ComponentProps<typeof InfoTooltip>['topic'];
interface AuctionBlock {
  title: string;
  tooltipTopic?: TooltipTopic;
  items: {
    title: string;
    value: string;
    tooltipTopic?: TooltipTopic;
  }[];
  action?: ReactNode;
}

interface Props {
  stablecoinAsset: StablecoinAsset;
}

function AuctionStats ({ stablecoinAsset }: Props) {
  const { t } = useTranslation();
  const { pendingTransactions, submitTransaction } = useTransaction();

  const { savingAvailableToDeposit, loadSavingAvailableToDeposit } = useSaving(stablecoinAsset);
  const {
    systemBalance,
    systemBalanceDebt,
    systemBalanceSurplus,
    loadSystemBalance,
    loadSystemBalanceDebt,
    loadSystemBalanceSurplus,
    performNetting
  } = useSystemAssetBalance(stablecoinAsset);

  const {
    systemReserveAvailableAmount,
    systemReserveBalance,
    systemReserveCoolDownPhase,
    isSystemReservePaused,
    loadSystemReserveBalance,
    loadSystemReserveAvailableAmount,
    loadSystemReserveCoolDownPhase,
    loadSystemReservePaused
  } = useSystemReserve();

  const [surplusLot, setSurplusLot] = useState<string | number>('0');
  const [reserveLot, setReserveLot] = useState<string | number>('0');

  useEffect(() => {
    getParams();
  }, [pendingTransactions.length]);

  const getParams = () => {
    getEPDRUint('governed.EPDR.reserveLot')
      .then((value) => setReserveLot(value))
      .catch((err) => setReserveLot(err.message));
    getEPDRUint(`governed.EPDR.${stablecoinAsset}_surplusLot`)
      .then((value) => setSurplusLot(value))
      .catch((err) => setSurplusLot(err.message));
  };

  useEffect(() => {
    loadSavingAvailableToDeposit();
    loadSystemBalance();
    loadSystemBalanceDebt();
    loadSystemBalanceSurplus();

    loadSystemReserveBalance();
    loadSystemReserveAvailableAmount();
    loadSystemReserveCoolDownPhase();
    loadSystemReservePaused();

    return () => {
      setSurplusLot('0');
      setReserveLot('0');
    };
  }, []);

  const auctionBlocks: AuctionBlock[] = [
    {
      title: t('AUCTION_STATS'),
      items: [
        {
          title: t('YOUR_ASSET_BALANCE', { asset: stablecoinAsset }),
          value: formatAsset(savingAvailableToDeposit, stablecoinAsset),
        },
        {
          title: t('DEBT_AUCTION_LOT'),
          value: formatAsset(reserveLot, 'Q'),
          tooltipTopic: 'debt-auction-lot',
        },
        {
          title: t('SURPLUS_AUCTION_LOT'),
          value: formatAsset(surplusLot, stablecoinAsset),
          tooltipTopic: 'surplus-auction-lot',
        },
      ]
    },
    {
      title: t('ASSET_SYSTEM_BALANCE', { asset: stablecoinAsset }),
      tooltipTopic: 'system-balance',
      items: [
        {
          title: t('COLLECTED_SURPLUS'),
          value: formatAsset(systemBalanceSurplus, stablecoinAsset),
        },
        {
          title: t('OPEN_DEBT'),
          value: formatAsset(systemBalanceDebt, stablecoinAsset),
        },
        {
          title: t('SYSTEM_BALANCE'),
          value: formatAsset(systemBalance, stablecoinAsset),
        },
      ],
      action: (
        <Button
          className="buttons"
          look="secondary"
          onClick={() => submitTransaction({
            isClosedModal: true,
            submitFn: performNetting
          })}
        >
          {t('PERFORM_NETTING')}
        </Button>
      )
    },
    {
      title: t('Q_SYSTEM_RESERVE'),
      tooltipTopic: 'system-reserve',
      items: [
        {
          title: t('RESERVE_BALANCE'),
          value: formatAsset(systemReserveBalance, 'Q'),
          tooltipTopic: 'reserve-balance',
        },
        {
          title: t('IMMEDIATELY_AVAILABLE'),
          value: formatAsset(systemReserveAvailableAmount, 'Q'),
          tooltipTopic: 'reserve-available',
        },
        {
          title: t('RESERVE_STATE'),
          value: isSystemReservePaused ? t('PAUSED') : t('ACTIVE'),
          tooltipTopic: 'reserve-state',
        },
        {
          title: t('COOL_DOWN_END_TIME'),
          value: formatDate(unixToDate(systemReserveCoolDownPhase)),
          tooltipTopic: 'reserve-cool-down',
        },
      ]
    }
  ];

  return (
    <AuctionStatsContainer>
      {auctionBlocks.map(({ title, tooltipTopic, items, action }, index) => (
        <StatsContainer key={index} className="block">
          <h2 className="text-h2">
            {title}
            {tooltipTopic && <InfoTooltip topic={tooltipTopic} />}
          </h2>

          {items.map(({ title, value, tooltipTopic }, index) => (
            <div key={index} className="stats-item auction-item">
              <p className="stats-item-lbl text-md">
                {title}
                {tooltipTopic && <InfoTooltip topic={tooltipTopic} />}
              </p>
              <p className="stats-item-val text-xl" title={value}>
                {value}
              </p>
            </div>
          ))}
          {action}
        </StatsContainer>
      ))}
    </AuctionStatsContainer>
  );
}

export default AuctionStats;
