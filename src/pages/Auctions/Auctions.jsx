import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageWrap from 'components/Base/PageWrap';
import Tabs from 'components/Base/Tabs';
import InfoTooltip from 'components/Custom/InfoTooltip';

import AuctionsList from './components/AuctionsList';
import CreateAuctionBtn from './components/CreateAuctionBtn';
import SidebarCards from './components/SidebarCards';

import { getAuctions } from 'store/auctions/action-creators';
import {
  liquidationAuctionsSelector,
  systemDebtAuctionsSelector,
  systemSurplusAuctionsSelector
} from 'store/auctions/selectors';

import { AUCTIONS_TYPES } from 'constants/statuses';

function Auctions ({ auctionsType }) {
  const { auctionsSelector, title, tooltipTopic } = getAuctionsData(auctionsType);
  const dispatch = useDispatch();
  const auctions = useSelector(auctionsSelector);

  function getAuctionsData (type) {
    switch (type) {
      case AUCTIONS_TYPES.liquidation:
        return {
          auctionsSelector: liquidationAuctionsSelector,
          title: 'Liquidation',
          tooltipTopic: 'liquidation-auction'
        };
      case AUCTIONS_TYPES.systemDebt:
        return {
          auctionsSelector: systemDebtAuctionsSelector,
          title: 'System Debt',
          tooltipTopic: 'system-debt'
        };
      case AUCTIONS_TYPES.systemSurplus:
        return {
          auctionsSelector: systemSurplusAuctionsSelector,
          title: 'System Surplus',
          tooltipTopic: 'system-surplus'
        };
    }
  }

  useEffect(() => {
    dispatch(getAuctions(auctionsType));
  }, [dispatch, auctionsType]);

  const tabs = [
    {
      id: 'active-auctions',
      title: 'Active auctions',
      content: <AuctionsList auctions={auctions.activeAuctions} loadingAuctions={!auctions?.contract} />
    },
    {
      id: 'ended-auctions',
      title: 'Ended auctions',
      content: <AuctionsList auctions={auctions.endedAuctions} loadingAuctions={!auctions?.contract} />
    }
  ];

  return (
    <PageWrap
      headerTitle={title}
      titleExtra={<InfoTooltip bottom topic={tooltipTopic} />}
      headerExtra={<CreateAuctionBtn auctionsType={auctionsType} />}
    >
      <Tabs tabs={tabs} additionalBlock={<SidebarCards />} />
    </PageWrap>
  );
}

export default Auctions;
