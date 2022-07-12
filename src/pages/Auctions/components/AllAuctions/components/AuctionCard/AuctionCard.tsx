import { kebabCase } from 'lodash';
import { AuctionInfos, LiquidationAuctionInfo, SystemDebtAndSurplusInfo } from 'typings/auctions';
import Tag from 'ui/Tag';

import { AUCTION_HEADERS } from 'pages/Auctions/Auctions';
import { AuctionCardLink } from 'pages/Auctions/styles';

import AuctionPeriods from '../AuctionPeriods';

interface Props {
  auction: AuctionInfos;
}

function AuctionCard ({ auction }: Props) {
  const title = AUCTION_HEADERS[auction.auctionType];
  return (
    <AuctionCardLink className="block" to={`/auction/${kebabCase(auction.auctionType)}/${auction.slug}`}>
      <div className="auction-card__head">
        {auction.auctionType === 'liquidation'
          ? (
            <p className="auction-card__id text-md">
              <span className="font-light">Vault Id</span>
              <span>{(auction as LiquidationAuctionInfo).vaultId}</span>
            </p>
          )
          : (
            <p className="auction-card__id text-md">
              <span className="font-light">Auction Id</span>
              <span>{(auction as SystemDebtAndSurplusInfo).auctionId}</span>
            </p>
          )}
        <Tag state={auction.state}>{auction.status}</Tag>
      </div>

      <h2 className="auction-card__title text-h2 ellipsis" title={title}>
        {title}
      </h2>

      <div className="auction-card__info">
        {auction.auctionType === 'liquidation'
          ? (
            <div>
              <h5 className="font-light text-md">Vault Owner</h5>
              <h4 className="text-lg ellipsis">{(auction as LiquidationAuctionInfo).vaultOwner}</h4>
            </div>
          )
          : (
            <div>
              <h5 className="font-light text-md">Bidder</h5>
              <h4 className="text-lg ellipsis">{(auction as SystemDebtAndSurplusInfo).bidder}</h4>
            </div>
          )}
      </div>
      <AuctionPeriods placement="bottom" endTime={auction.endTime} />
    </AuctionCardLink>
  );
}

export default AuctionCard;
