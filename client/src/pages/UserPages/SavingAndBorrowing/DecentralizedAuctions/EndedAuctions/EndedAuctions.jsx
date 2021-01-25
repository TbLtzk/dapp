import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getAuctionsList } from 'store/actions/action-creaters/auctions/auctions';
import { auctionsArr, errorM, loadingAuctions } from 'store/selectors/auctions/auctions';
import { useLocation } from 'react-router-dom';

import AuctionsList from '../components/AuctionsList';

import { Row, Col } from 'react-bootstrap';
import { Title } from './styles';
import PageWrap from '../../../../../components/Base/PageWrap';

function EndedAuctions() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [numberOfAuctions, setNumberOfAuctions] = useState(location?.state?.numberOfAuctions);

  const loading = useSelector(loadingAuctions);
  const errorMessage = useSelector(errorM);
  const auctions = useSelector(auctionsArr);

  useEffect(() => {
    dispatch(getAuctionsList(location?.state?.activeTab, false));
  }, [dispatch]);

  return (
    <PageWrap>
      <Row>
        <Col xs={8}>
          <Title>{`Ended ${location?.state?.activeTab?.replace(/-/g, ' ')} (${auctions.length}`})</Title>
          <AuctionsList
            activeTab={location?.state?.activeTab}
            auctions={auctions}
            loading={loading}
            errorMessage={errorMessage}
          />
        </Col>
      </Row>
    </PageWrap>
  );
}

export default EndedAuctions;

