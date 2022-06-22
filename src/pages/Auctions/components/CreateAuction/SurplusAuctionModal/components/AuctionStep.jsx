import { useSelector } from 'react-redux';

import Input from 'components/Base/Form/Input';
import ModalStep from 'components/Base/ModalStep';

import useForm from 'hooks/useForm';

import { useSurplusAuction } from '../SurplusAuctionModal';

import { symbol } from 'store/stable-coin/selectors';

import { required } from 'func/validators';

function AuctionStep ({ surplusLot }) {
  const symbolType = useSelector(symbol);
  const { goNext } = useSurplusAuction();

  const form = useForm({
    initialValues: { bid: '' },
    validators: { bid: [required] },
    onSubmit: goNext,
  });

  return (
    <ModalStep
      disabled={!form.isValid}
      onNext={form.submit}
    >
      <h5>Surplus Auction Lot:</h5>
      <p>{surplusLot} {symbolType}</p>

      <Input
        {...form.fields.bid}
        invertedColors
        label="Provide your initial Bid in Q"
        placeholder="Bid"
      />
    </ModalStep>
  );
}

export default AuctionStep;
