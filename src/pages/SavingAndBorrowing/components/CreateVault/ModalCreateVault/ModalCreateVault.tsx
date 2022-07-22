import { useDispatch } from 'react-redux';

import { Asset } from 'typings/defi';
import Button from 'ui/Button';
import RadioGroup from 'ui/RadioGroup';

import { ModalCreateVaultContainer } from 'pages/SavingAndBorrowing/styles';

import useForm from 'hooks/useForm';

import { setCreateVault } from 'store/borrowing-core/actions';

import { BorrowAssets } from 'constants/defiTypes';
import { required } from 'func/validators';

function ModalCreateVault () {
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      asset: '',
    },
    validators: {
      asset: [required],
    },
    onSubmit: ({ asset }) => {
      dispatch(setCreateVault(asset as Asset));
    },
  });

  const borrowAssetsOptions = Object.values(BorrowAssets).map((asset) => ({
    label: `Create ${asset} Vault`,
    value: asset,
  }));

  return (
    <ModalCreateVaultContainer>
      <form noValidate onSubmit={form.submit}>
        <RadioGroup
          {...form.fields.asset}
          label="Please select Vault for creation"
          name="borrow-assets"
          options={borrowAssetsOptions}
        />

        <Button
          className="create-vault-btn"
          type="submit"
          disabled={!form.isValid}
        >
          Create Vault
        </Button>
      </form>
    </ModalCreateVaultContainer>
  );
}

export default ModalCreateVault;
