import React from 'react';

import ModalStep from 'components/Base/ModalStep';

import { useSurplusAuction } from '../SurplusAuctionModal';

function ConfirmStep ({ surplusLot }) {
  const { values, goBack, confirm } = useSurplusAuction();

  return (
    <ModalStep
      onConfirm={confirm}
      onBack={goBack}
    >
      <h2>Chosen Data</h2>

      <h5>Type</h5>
      <p>System Surplus Auction</p>

      <h5>Auction Lot</h5>
      <p>{surplusLot} QUSD</p>

      <h5>Bid</h5>
      <p>{values.bid} Q</p>
    </ModalStep>
  );
}

export default ConfirmStep;
