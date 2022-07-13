import FormBlock from 'components/FormBlock';
import { FormStep } from 'components/MultiStepForm';

import { useSystemSurplusAuctionForm } from '../NewSystemSurplusAuction';

interface Props {
  surplusLot: number | string;
}
function ConfirmStep ({ surplusLot }: Props) {
  const { values, goBack, confirm, updateStep } = useSystemSurplusAuctionForm();

  return (
    <FormStep onConfirm={confirm} onBack={goBack}>

      <FormBlock
        title="Auction type"
      >
        <p className="text-lg">
          System Surplus Auction
        </p>
      </FormBlock>

      <FormBlock
        title="Auction lot"
      >
        <p className="text-lg">
          {surplusLot} QUSD
        </p>
      </FormBlock>

      <FormBlock
        icon="edit"
        title="Bid"
        onAction={() => updateStep(0)}
      >
        <p className="text-lg">
          {values.bid} Q
        </p>
      </FormBlock>

    </FormStep>
  );
}

export default ConfirmStep;
