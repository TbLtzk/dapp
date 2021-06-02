import React from 'react';
import SidebarCards from '../SidebarCards';
import AuctionsList from '../AuctionsList';
import { ProposalsTabWrp } from './styles';

function AuctionsTab(props) {
  const {
    auctionsType,
    isLoading,
    auctions,
    errorMessage,
  } = props;
  return (
    <ProposalsTabWrp>
      <AuctionsList
        activeTab={auctionsType}
        auctions={auctions}
        loading={isLoading}
        errorMessage={errorMessage}
      />
      <SidebarCards/>
    </ProposalsTabWrp>
  );
}

export default AuctionsTab;
