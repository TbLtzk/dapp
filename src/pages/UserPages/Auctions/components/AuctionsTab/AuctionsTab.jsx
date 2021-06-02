import React from 'react';
import SidebarCards from '../SidebarCards';
import AuctionsList from '../AuctionsList';
import { AuctionsTabWrp } from './styles';

function AuctionsTab(props) {
  const {
    auctionsType,
    isLoading,
    auctions,
    errorMessage,
  } = props;
  return (
    <AuctionsTabWrp>
      <AuctionsList
        activeTab={auctionsType}
        auctions={auctions}
        loading={isLoading}
        errorMessage={errorMessage}
      />
      <SidebarCards/>
    </AuctionsTabWrp>
  );
}

export default AuctionsTab;
