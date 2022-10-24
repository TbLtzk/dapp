import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps, useHistory } from 'react-router';

import { camelCase } from 'lodash';
import { AuctionCompletedInfos, AuctionType } from 'typings/auctions';

import { SkeletonAuctionLoading } from 'components/Base/SkeletonLoading';
import PageLayout from 'components/PageLayout';
import { AUCTION_HEADERS } from 'pages/Auctions/Auctions';
import { AuctionContainer } from 'pages/Auctions/styles';
import Button from 'ui/Button';
import Icon from 'ui/Icon';
import Tag from 'ui/Tag';

import AuctionActions from './components/AuctionActions';
import AuctionLayout from './components/AuctionLayout';
import { AuctionNotFoundContainer } from './styles';

import { getAuction } from 'contracts/helpers/auction';

function Auction ({ match, }: RouteComponentProps<{
  id: string;
  type: string;
  slug: string;
}>) {
  const { t } = useTranslation();
  const history = useHistory();

  const linkToAuctions = match.params.type;
  const auctionType = camelCase(linkToAuctions) as AuctionType;

  const [auction, setAuction] = useState<AuctionCompletedInfos | null>(null);
  const [auctionLoading, setAuctionLoading] = useState<boolean>(true);
  const [auctionError, setAuctionError] = useState<ReactNode>(null);

  const handleBackClick = () => {
    history.push(`/auctions/${linkToAuctions}`);
  };

  const loadOneAuction = async () => {
    try {
      const result = await getAuction(auctionType, match.params);
      if ('error' in result && result?.error) {
        setAuctionError(result?.error);
      } else {
        setAuction(result as AuctionCompletedInfos);
      }
    } catch (error) {
      setAuctionError(error as ReactNode);
    } finally {
      setAuctionLoading(false);
    }
  };

  useEffect(() => {
    loadOneAuction();

    return () => {
      setAuction(null);
      setAuctionLoading(true);
      setAuctionError(null);
    };
  }, []);

  if (auctionLoading || auctionError || !auction) {
    return (
      <AuctionContainer>
        {auctionLoading
          ? (
            <SkeletonAuctionLoading />
          )
          : (
            <AuctionNotFoundContainer>
              <h1 className="text-h1">{auctionError}</h1>
              <Button look="ghost" onClick={() => history.push('/auctions')}>
                <i className="mdi mdi-arrow-left" />
                <span>{t('AUCTIONS')}</span>
              </Button>
            </AuctionNotFoundContainer>
          )}
      </AuctionContainer>
    );
  }

  const auctionId = auction?.auctionType === 'liquidation'
    ? auction?.vaultId
    : auction?.auctionId;

  return (
    <div className="auction">
      <Button
        alwaysEnabled
        look="ghost"
        style={{ marginBottom: '24px' }}
        onClick={handleBackClick}
      >
        <Icon name="arrow-left" />
        <span>{t(AUCTION_HEADERS[auctionType])}</span>
      </Button>

      <PageLayout
        title={`#${auctionId} ${t(AUCTION_HEADERS[auctionType])}`}
        action={(
          <AuctionActions
            auctionType={auctionType}
            auction={auction}
            onSubmit={loadOneAuction}
          />
        )}
        titleExtra={
          auction?.status && (
            <Tag state={auction.state}>
              {t(auction.status)}
            </Tag>
          )
        }
      >
        <AuctionLayout auction={auction} />
      </PageLayout>
    </div>
  );
}

export default Auction;
