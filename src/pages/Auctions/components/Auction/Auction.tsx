import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps, useHistory } from 'react-router';

import { camelCase } from 'lodash';
import { AuctionCompletedInfos, AuctionType } from 'typings/auctions';
import Button from 'ui/Button';
import Tag from 'ui/Tag';

import PageWrap from 'components/Base/PageWrap';
import { SkeletonAuctionLoading } from 'components/Base/SkeletonLoading';
import { AUCTION_HEADERS } from 'pages/Auctions/Auctions';
import { AuctionContainer } from 'pages/Auctions/styles';

import useMetamaskReset from 'hooks/useMetamaskReset';

import AuctionActions from './components/AuctionActions';
import AuctionLayout from './components/AuctionLayout';
import { AuctionNotFoundContainer } from './styles';

import { getAuction } from 'contracts/helpers/auction';

import formTypes from 'constants/form-types';

function Auction ({ match, }: RouteComponentProps<{
  id: string;
  type: string;
  slug: string;
}>) {
  const { t } = useTranslation();
  const linkToAuctions = match.params.type;
  const auctionType = camelCase(linkToAuctions) as AuctionType;
  const history = useHistory();

  const [auction, setAuction] = useState<AuctionCompletedInfos | any>(null);
  const [auctionLoading, setAuctionLoading] = useState<boolean>(true);
  const [auctionError, setAuctionError] = useState<null | any>(null);

  const handleBackClick = () => {
    history.push(`/auctions/${linkToAuctions}`);
  };

  const loadOneAuction = async () => {
    try {
      const result = await getAuction(auctionType, match.params);
      if ('error' in result && result?.error) {
        setAuctionError(result?.error);
      }
      setAuction(result);
    } catch (error) {
      setAuctionError(error);
    } finally {
      setAuctionLoading(false);
    }
  };

  useMetamaskReset(formTypes.bidForAuction, loadOneAuction);
  useMetamaskReset(formTypes.executeAuction, loadOneAuction);

  useEffect(() => {
    loadOneAuction();
    return () => {
      setAuction(null);
      setAuctionLoading(true);
      setAuctionError(null);
    };
  }, []);
  if (auctionLoading || auctionError) {
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
  
  return (
    <PageWrap
      pageHeader={t(AUCTION_HEADERS[auctionType])}
      pageButton={<AuctionActions auctionType={auctionType} auction={auction} />}
      topButton={
        <Button
          alwaysEnabled
          look="ghost"
          style={{ marginBottom: '25px' }}
          onClick={handleBackClick}
        >
          <i className="mdi mdi-arrow-left" />
          <span>{t(AUCTION_HEADERS[auctionType])}</span>
        </Button>
      }
      pageTooltip={
        auction?.status && (
          <Tag style={{ margin: '10px 0 0 15px' }} state={auction.state}>
            {t(auction.status)}
          </Tag>
        )
      }
    >
      <AuctionLayout auction={auction} />
    </PageWrap>
  );
}

export default Auction;
