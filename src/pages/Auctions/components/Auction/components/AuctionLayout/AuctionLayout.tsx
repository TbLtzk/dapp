
import { AuctionCompletedInfos } from 'typings/auctions';

import Address from 'components/Custom/Address';
import AuctionPeriods from 'pages/Auctions/components/AllAuctions/components/AuctionPeriods';

import { AuctionLayoutContainer } from '../../styles';

interface Props {
  auction: AuctionCompletedInfos;
}

function AuctionLayout ({ auction }: Props) {
  return (
    <AuctionLayoutContainer className="block">
      <>
        <h2 className="text-h2">Details</h2>

        <div className="auction-card__row">
          <p className="color-secondary text-md">
            {auction.auctionType === 'liquidation' ? 'Vault ID' : 'Auction Id'}
          </p>
          <h4 className="color-primary text-lg">
            # {auction.auctionType === 'liquidation' ? auction.vaultId : auction.auctionId}
          </h4>
        </div>

        <div className="auction-card__row">
          <p className="color-secondary text-md">Submitted time</p>
          <AuctionPeriods endTime={auction.endTime} />
        </div>

        <div className="auction-card__row">
          <p className="color-secondary text-md">Highest Bid</p>
          <h4 className="color-primary text-lg">
            {auction.highestBid} {auction.bidAsset}
          </h4>
        </div>

        {auction?.raisingBid
          ? (
            <div className="auction-card__row">
              <p className="color-secondary text-md ">Minimum Bid</p>
              <h4 className="color-primary text-lg">
                {auction.raisingBid} {auction.bidAsset}
              </h4>
            </div>
          )
          : null}

        {auction.auctionType === 'systemDebt' && (
          <div className="auction-card__row">
            <p className="color-secondary text-md">Reserve Lot</p>
            <h4 className="color-primary text-lg">
              {auction.lot} {auction.lotAsset}
            </h4>
          </div>
        )}
        {auction.auctionType === 'liquidation' && (
          <>
            <div className="auction-card__row">
              <p className="color-secondary text-md">Auctioned Collateral</p>
              <h4 className="color-primary text-lg">{`${auction.colAsset} ${auction.colKey}`}</h4>
            </div>
            <div className="auction-card__row">
              <p className="color-secondary text-md">Vault Owner</p>
              <h4 className="color-primary text-lg">{<Address iconed address={auction.vaultOwner} />}</h4>
            </div>
          </>
        )}

        {auction.auctionType === 'systemSurplus' && (
          <>
            <div className="auction-card__row">
              <p className="color-secondary text-md">Auction Initiated by</p>
              <h4 className="color-primary text-lg">{auction.bidder}</h4>
            </div>

            <div className="auction-card__row">
              <p className="color-secondary text-md">Lot</p>
              <h4 className="color-primary text-lg">
                {auction.lot} {auction.lotAsset}
              </h4>
            </div>
          </>
        )}

        <div className="auction-card__row">
          <p className="color-secondary text-md">Bidder</p>
          <h4 className="color-primary text-lg">{<Address iconed address={auction.bidder} />}</h4>
        </div>
      </>
    </AuctionLayoutContainer>
  );
}

export default AuctionLayout;
