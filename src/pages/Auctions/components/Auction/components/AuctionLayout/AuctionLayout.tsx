import { useTranslation } from 'react-i18next';

import { AuctionCompletedInfos } from 'typings/auctions';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import AuctionPeriods from 'pages/Auctions/components/AllAuctions/components/AuctionPeriods';

import { AuctionLayoutContainer } from '../../styles';

interface Props {
  auction: AuctionCompletedInfos;
}

function AuctionLayout ({ auction }: Props) {
  const { t } = useTranslation();

  return (
    <AuctionLayoutContainer className="block">
      <>
        <h2 className="text-h2">{t('DETAILS')}</h2>

        <div className="auction-card__row">
          <p className="color-secondary text-md">
            {auction.auctionType === 'liquidation' ? t('VAULT_ID') : t('AUCTION_ID')}
          </p>
          <p className="color-primary text-md">
            #{auction.auctionType === 'liquidation' ? auction.vaultId : auction.auctionId}
          </p>
        </div>

        <div className="auction-card__row">
          <p className="color-secondary text-md">{t('SUBMITTED_TIME')}</p>
          <AuctionPeriods endTime={auction.endTime} />
        </div>

        <div className="auction-card__row">
          <p className="color-secondary text-md">{t('HIGHEST_BID')}</p>
          <p className="color-primary text-md">
            {auction.highestBid} {auction.bidAsset}
          </p>
        </div>

        {auction?.raisingBid
          ? (
            <div className="auction-card__row">
              <p className="color-secondary text-md ">{t('MINIMUM_BID')}</p>
              <p className="color-primary text-md">
                {auction.raisingBid} {auction.bidAsset}
              </p>
            </div>
          )
          : null}

        {auction.auctionType === 'systemDebt' && (
          <div className="auction-card__row">
            <p className="color-secondary text-md">{t('RESERVE_LOT')}</p>
            <p className="color-primary text-md">
              {auction.lot} {auction.lotAsset}
            </p>
          </div>
        )}
        {auction.auctionType === 'liquidation' && (
          <>
            <div className="auction-card__row">
              <p className="color-secondary text-md">{t('AUCTIONED_COLLATERAL')}</p>
              <p className="color-primary text-md">{`${auction.colAsset} ${auction.colKey}`}</p>
            </div>
            <div className="auction-card__row">
              <p className="color-secondary text-md">{t('VAULT_OWNER')}</p>
              <ExplorerAddress
                iconed
                short
                className="text-md"
                address={auction.vaultOwner}
              />
            </div>
          </>
        )}

        {auction.auctionType === 'systemSurplus' && (
          <>
            <div className="auction-card__row">
              <p className="color-secondary text-md">{t('LOT')}</p>
              <p className="color-primary text-md">
                {auction.lot} {auction.lotAsset}
              </p>
            </div>
            <div className="auction-card__row">
              <p className="color-secondary text-md">{t('AUCTION_INITIATED_BY')}</p>
              <p className="color-primary text-md">
                {<ExplorerAddress
                  iconed
                  short
                  className="text-md"
                  address={auction.bidder}
                />}
              </p>
            </div>

          </>
        )}

        <div className="auction-card__row">
          <p className="color-secondary text-md">{t('BIDDER')}</p>
          <ExplorerAddress
            iconed
            short
            className="text-md"
            address={auction.bidder}
          />
        </div>
      </>
    </AuctionLayoutContainer>
  );
}

export default AuctionLayout;
