import FormBlock from 'components/FormBlock';
import { FormStep } from 'components/MultiStepForm';

import { useSystemDebtAuctionForm } from '../NewSystemDebtAuction';

interface Props {
  reserveLot: string | number;
}
function ConfirmStep ({ reserveLot }: Props) {
  const { values, goBack, confirm, updateStep } = useSystemDebtAuctionForm();

  return (
    <FormStep onConfirm={confirm} onBack={goBack}>
      <FormBlock title="Auction type">
        <p className="text-lg">System Debt Auction</p>
      </FormBlock>

      <FormBlock title="Auction lot">
        <p className="text-lg">{reserveLot} Q</p>
      </FormBlock>

      <FormBlock
        icon="edit"
        title="Bid"
        onAction={() => updateStep(0)}
      >
        <p className="text-lg">{values.bid} QUSD</p>
      </FormBlock>

    </FormStep>
  );
}

export default ConfirmStep;
