import React, { useState } from 'react';

import Button from 'components/Base/Button';

import DebtAuctionModal from './DebtAuctionModal';
import LiquidationAuctionModal from './LiquidationAuctionModal';
import SurplusAuctionModal from './SurplusAuctionModal';

import { AUCTIONS_TYPES } from 'constants/statuses';

function CreateAuction ({ type }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateAuction = () => {
    setModalOpen(true);
  };

  const handleHideModal = () => {
    setModalOpen(false);
  };

  const auctionTitleMap = {
    [AUCTIONS_TYPES.liquidation]: 'Create Liquidation Auction',
    [AUCTIONS_TYPES.systemDebt]: 'Create System Debt Auction',
    [AUCTIONS_TYPES.systemSurplus]: 'Create System Surplus Auction',
  };

  const modalProps = { modalOpen, onHide: handleHideModal };
  const modalMap = {
    [AUCTIONS_TYPES.liquidation]: <LiquidationAuctionModal {...modalProps} />,
    [AUCTIONS_TYPES.systemDebt]: <DebtAuctionModal {...modalProps} />,
    [AUCTIONS_TYPES.systemSurplus]: <SurplusAuctionModal {...modalProps} />,
  };

  return (
    <>
      <Button onClick={handleCreateAuction}>
        <i className="mdi mdi-plus-circle-outline" />
        <span>{auctionTitleMap[type]}</span>
      </Button>

      {modalMap[type]}
    </>
  );
}

export default CreateAuction;
