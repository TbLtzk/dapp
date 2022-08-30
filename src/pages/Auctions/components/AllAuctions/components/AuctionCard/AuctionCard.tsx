import { useTranslation } from 'react-i18next';

import { kebabCase } from 'lodash';
import { AuctionInfos, LiquidationAuctionInfo, SystemDebtAndSurplusInfo } from 'typings/auctions';

import { AUCTION_HEADERS } from 'pages/Auctions/Auctions';
import { AuctionCardLink } from 'pages/Auctions/styles';
import Tag from 'ui/Tag';

import AuctionPeriods from '../AuctionPeriods';

interface Props {
  auction: AuctionInfos;
}

function AuctionCard ({ auction }: Props) {
  const { t } = useTranslation();
  const title = AUCTION_HEADERS[auction.auctionType];
  return (
    <AuctionCardLink className="block" to={`/auction/${kebabCase(auction.auctionType)}/${auction.slug}`}>
      <div className="auction-card__head">
        {auction.auctionType === 'liquidation'
          ? (
            <p className="auction-card__id text-md">
              <span className="font-light">{t('VAULT_ID')}</span>
              <span>{(auction as LiquidationAuctionInfo).vaultId}</span>
            </p>
          )
          : (
            <p className="auction-card__id text-md">
              <span className="font-light">{t('AUCTION_ID')}</span>
              <span>{(auction as SystemDebtAndSurplusInfo).auctionId}</span>
            </p>
          )}
        <Tag state={auction.state}>{t(auction.status)}</Tag>
      </div>

      <h2 className="auction-card__title text-h2 ellipsis" title={t(title)}>
        {t(title)}
      </h2>

      <div className="auction-card__info">
        {auction.auctionType === 'liquidation'
          ? (
            <div>
              <p className="font-light text-md">{t('VAULT_OWNER')}</p>
              <p className="text-lg ellipsis">{(auction as LiquidationAuctionInfo).vaultOwner}</p>
            </div>
          )
          : (
            <div>
              <p className="font-light text-md">{t('BIDDER')}</p>
              <p className="text-lg ellipsis">{(auction as SystemDebtAndSurplusInfo).bidder}</p>
            </div>
          )}
      </div>
      <AuctionPeriods placement="bottom" endTime={auction.endTime} />
    </AuctionCardLink>
  );
}

export default AuctionCard;
