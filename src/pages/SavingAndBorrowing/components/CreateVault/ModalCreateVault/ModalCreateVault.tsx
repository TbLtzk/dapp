import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Asset } from 'typings/defi';

import { ModalCreateVaultContainer } from 'pages/SavingAndBorrowing/styles';
import Button from 'ui/Button';
import RadioGroup from 'ui/RadioGroup';

import useForm from 'hooks/useForm';

import { setCreateVault } from 'store/borrowing-core/actions';

import { BorrowAssets } from 'constants/defi';
import { required } from 'utils/validators';

function ModalCreateVault () {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const form = useForm({
    initialValues: {
      asset: '',
    },
    validators: {
      asset: [required],
    },
    onSubmit: ({ asset }) => {
      dispatch(setCreateVault(asset as Asset, t('CREATE_ASSET_VAULT_SUCCESS')));
    },
  });

  const borrowAssetsOptions = Object.values(BorrowAssets).map((asset) => ({
    label: t('CREATE_ASSET_VAULT', { asset }),
    value: asset,
  }));

  return (
    <ModalCreateVaultContainer>
      <form noValidate onSubmit={form.submit}>
        <RadioGroup
          {...form.fields.asset}
          label={t('PLEASE_SELECT_VAULT_FOR_CREATION')}
          name="borrow-assets"
          options={borrowAssetsOptions}
        />

        <Button
          className="create-vault-btn"
          type="submit"
          disabled={!form.isValid}
        >
          {t('CREATE_VAULT')}
        </Button>
      </form>
    </ModalCreateVaultContainer>
  );
}

export default ModalCreateVault;
