
import ModalStep from 'components/Base/ModalStep';

import { useLiquidationAuction } from '../LiquidationAuctionModal';

function ConfirmStep () {
  const { values, goBack, confirm } = useLiquidationAuction();

  return (
    <ModalStep
      onConfirm={confirm}
      onBack={goBack}
    >
      <h2>Chosen Data</h2>

      <h5>Type</h5>
      <p>Liquidation Auction</p>

      <h5>Address of Vault Holder, which shall be Liquidated</h5>
      <p>{values.address}</p>

      <h5>The Vault ID to be Liquidated</h5>
      <p>{values.vaultId}</p>

      <h5>Bid</h5>
      <p>{values.bid} QUSD</p>
    </ModalStep>
  );
}

export default ConfirmStep;
