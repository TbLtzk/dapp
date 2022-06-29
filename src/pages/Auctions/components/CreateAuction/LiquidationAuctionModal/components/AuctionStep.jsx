import { useSelector } from 'react-redux';

import Input from 'components/Base/Form/Input';
import ModalStep from 'components/Base/ModalStep';

import useForm from 'hooks/useForm';

import { useLiquidationAuction } from '../LiquidationAuctionModal';

import { symbol } from 'store/stable-coin/selectors';

import { MAX_BID_AMOUNT } from 'constants/numbers';
import { address, max, required, vaultID } from 'func/validators';

function AuctionStep () {
  const symbolType = useSelector(symbol);
  const { goNext } = useLiquidationAuction();

  const form = useForm({
    initialValues: {
      address: '',
      vaultId: '',
      bid: ''
    },
    validators: {
      address: [required, address],
      vaultId: [required, vaultID],
      bid: [required, max(MAX_BID_AMOUNT)]
    },
    onSubmit: goNext,
  });

  return (
    <ModalStep
      disabled={!form.isValid}
      onNext={form.submit}
    >
      <div style={{ display: 'grid', gap: '15px' }}>
        <Input
          {...form.fields.address}
          invertedColors
          label="Provide user address of vault holder, which shall be liquidated"
          placeholder="Address"
        />

        <Input
          {...form.fields.vaultId}
          invertedColors
          label="Provide the Vault ID to be liquidated"
          placeholder="Vault ID"
        />

        <Input
          {...form.fields.bid}
          invertedColors
          type="number"
          label={`Provide your initial Bid in ${symbolType}`}
          placeholder="Bid"
        />
      </div>
    </ModalStep>
  );
}

export default AuctionStep;
