
import { useTranslation } from 'react-i18next';

import { AuctionCompletedInfos } from 'typings/auctions';

import Address from 'components/Custom/Address';
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
          <h4 className="color-primary text-lg">
            # {auction.auctionType === 'liquidation' ? auction.vaultId : auction.auctionId}
          </h4>
        </div>

        <div className="auction-card__row">
          <p className="color-secondary text-md">{t('SUBMITTED_TIME')}</p>
          <AuctionPeriods endTime={auction.endTime} />
        </div>

        <div className="auction-card__row">
          <p className="color-secondary text-md">{t('HIGHEST_BID')}</p>
          <h4 className="color-primary text-lg">
            {auction.highestBid} {auction.bidAsset}
          </h4>
        </div>

        {auction?.raisingBid
          ? (
            <div className="auction-card__row">
              <p className="color-secondary text-md ">{t('MINIMUM_BID')}</p>
              <h4 className="color-primary text-lg">
                {auction.raisingBid} {auction.bidAsset}
              </h4>
            </div>
          )
          : null}

        {auction.auctionType === 'systemDebt' && (
          <div className="auction-card__row">
            <p className="color-secondary text-md">{t('RESERVE_LOT')}</p>
            <h4 className="color-primary text-lg">
              {auction.lot} {auction.lotAsset}
            </h4>
          </div>
        )}
        {auction.auctionType === 'liquidation' && (
          <>
            <div className="auction-card__row">
              <p className="color-secondary text-md">{t('AUCTIONED_COLLATERAL')}</p>
              <h4 className="color-primary text-lg">{`${auction.colAsset} ${auction.colKey}`}</h4>
            </div>
            <div className="auction-card__row">
              <p className="color-secondary text-md">{t('VAULT_OWNER')}</p>
              <h4 className="color-primary text-lg">{<Address iconed address={auction.vaultOwner} />}</h4>
            </div>
          </>
        )}

        {auction.auctionType === 'systemSurplus' && (
          <>
            <div className="auction-card__row">
              <p className="color-secondary text-md">{t('AUCTION_INITIATED_BY')}</p>
              <h4 className="color-primary text-lg">{auction.bidder}</h4>
            </div>

            <div className="auction-card__row">
              <p className="color-secondary text-md">{t('LOT')}</p>
              <h4 className="color-primary text-lg">
                {auction.lot} {auction.lotAsset}
              </h4>
            </div>
          </>
        )}

        <div className="auction-card__row">
          <p className="color-secondary text-md">{t('BIDDER')}</p>
          <h4 className="color-primary text-lg">{<Address iconed address={auction.bidder} />}</h4>
        </div>
      </>
    </AuctionLayoutContainer>
  );
}

export default AuctionLayout;
