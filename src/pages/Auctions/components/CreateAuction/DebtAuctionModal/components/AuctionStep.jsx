import { useSelector } from 'react-redux';

import Input from 'components/Base/Form/Input';
import ModalStep from 'components/Base/ModalStep';

import useForm from 'hooks/useForm';

import { useDebtAuction } from '../DebtAuctionModal';

import { symbol } from 'store/stable-coin/selectors';

import { MAX_BID_AMOUNT } from 'constants/numbers';
import { max, required } from 'func/validators';

function AuctionStep ({ reserveLot }) {
  const symbolType = useSelector(symbol);
  const { goNext } = useDebtAuction();

  const form = useForm({
    initialValues: { bid: '' },
    validators: { bid: [required, max(MAX_BID_AMOUNT)] },
    onSubmit: goNext,
  });

  return (
    <ModalStep
      disabled={!form.isValid}
      onNext={form.submit}
    >
      <h5>Debt Auction Lot</h5>
      <p>{reserveLot} Q</p>

      <Input
        {...form.fields.bid}
        invertedColors
        type="number"
        label={`Provide your initial Bid in ${symbolType}`}
        placeholder="Bid"
      />
    </ModalStep>
  );
}

export default AuctionStep;
