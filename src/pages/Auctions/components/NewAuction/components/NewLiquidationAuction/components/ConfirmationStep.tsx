
import FormBlock from 'components/FormBlock';
import { FormStep } from 'components/MultiStepForm';

import { useLiquidationAuctionForm } from '../NewLiquidationAuction';

function ConfirmStep () {
  const { values, goBack, confirm, updateStep } = useLiquidationAuctionForm();

  return (
    <FormStep
      onConfirm={confirm}
      onBack={goBack}
    >

      <FormBlock
        title="Auction type"
      >
        <p className="text-lg">
          Liquidation Auction
        </p>
      </FormBlock>

      <FormBlock
        icon="edit"
        title="Address of Vault Holder, which shall be Liquidated"
        onAction={() => updateStep(0)}
      >
        <p className="text-lg">
          {values.vaultOwner}
        </p>
      </FormBlock>

      <FormBlock
        icon="edit"
        title="The Vault ID to be Liquidated"
        onAction={() => updateStep(0)}
      >
        <p className="text-lg">
          # {values.vaultId}
        </p>
      </FormBlock>

      <FormBlock
        icon="edit"
        title="Bid"
        onAction={() => updateStep(0)}
      >
        <p className="text-lg">
          {values.bid} QUSD
        </p>
      </FormBlock>

    </FormStep>
  );
}

export default ConfirmStep;
