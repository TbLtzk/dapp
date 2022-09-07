import { useTranslation } from 'react-i18next';

import { Asset } from 'typings/defi';

import Button from 'components/Button';
import { ModalCreateVaultContainer } from 'pages/SavingAndBorrowing/styles';
import RadioGroup from 'ui/RadioGroup';

import useForm from 'hooks/useForm';

import { useBorrowingCore } from 'store/borrowing-core/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { BorrowAssets } from 'constants/defi';
import { required } from 'utils/validators';

function ModalCreateVault ({ onSubmit }: { onSubmit: () => void }) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { createVault } = useBorrowingCore();

  const form = useForm({
    initialValues: { asset: '' as Asset },
    validators: { asset: [required] },
    onSubmit: ({ asset }) => {
      submitTransaction({
        successMessage: t('CREATE_ASSET_VAULT_SUCCESS'),
        submitFn: async () => createVault(asset),
        onSuccess: () => onSubmit(),
      });
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
