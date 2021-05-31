import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { errorM, loadingAuctions, auctionsArr } from 'store/selectors/auctions/auctions';
import { getAuctionsList } from 'store/actions/action-creaters/auctions/auctions';

import { Col } from 'react-bootstrap';

import AuctionsList from '../AuctionsList';
import { Title, WrapDescr } from 'components/Custom/PageLists/Tabs/styles';

function TabContent(props) {
  const { activeTab } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuctionsList(activeTab, true));
  }, [dispatch]);

  const loading = useSelector(loadingAuctions);
  const errorMessage = useSelector(errorM);
  const auctions = useSelector(auctionsArr);

  return (
    <Col xs={12}>
      <Title>Active Auctions</Title>
      <WrapDescr>{auctions?.length + ' auctions'}</WrapDescr>
      <AuctionsList
        activeTab={activeTab}
        auctions={auctions}
        loading={loading}
        errorMessage={errorMessage}
        proposalsKind={activeTab}
      />
    </Col>

  );
}

export default TabContent;

