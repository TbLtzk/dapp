
import ModalStep from 'components/Base/ModalStep';

import { useDebtAuction } from '../DebtAuctionModal';

function ConfirmStep ({ reserveLot }) {
  const { values, goBack, confirm } = useDebtAuction();

  return (
    <ModalStep
      onConfirm={confirm}
      onBack={goBack}
    >
      <h2>Chosen Data</h2>

      <h5>Type</h5>
      <p>System Debt Auction</p>

      <h5>Auction Lot</h5>
      <p>{reserveLot} Q</p>

      <h5>Bid</h5>
      <p>{values.bid} QUSD</p>
    </ModalStep>
  );
}

export default ConfirmStep;
