import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { VaultWithFee } from 'typings/defi';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setBorrowAsBorrow } from 'store/borrow-assets/actions';
import { borrowVaultSelector } from 'store/borrow-assets/selectors';

import formTypes from 'constants/form-types';
import { amount, required } from 'utils/validators';

function BorrowForm ({ vault }: { vault: VaultWithFee}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { borrowingDetails } = useSelector(borrowVaultSelector);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(borrowingDetails?.availableBorrow)] },
    onSubmit: (form) => {
      dispatch(setBorrowAsBorrow(form.amount, vault.vaultNum, t('BORROW_ASSET_SUCCESS')));
    }
  });

  useMetamaskReset(formTypes.borrowAssetBorrow, form.reset);

  return (
    <form
      noValidate
      className="borrow-manage-form"
      onSubmit={form.submit}
    >
      <Input
        {...form.fields.amount}
        type="number"
        label={t('BORROW_ASSET')}
        prefix={borrowingDetails?.borrowingAsset}
        max={borrowingDetails?.availableBorrow}
        placeholder="0.00"
      />
      <Button
        type="submit"
        className="form-action"
        disabled={!form.isValid}
        style={{ width: '100px' }}
      >
        {t('BORROW')}
      </Button>
    </form>
  );
}

export default BorrowForm;
