import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setBorrowWithdraw } from 'store/borrow-assets/action-creators';
import { borrowVaultInfoSelector } from 'store/borrow-assets/selectors';

import formTypes from 'constants/form-types';
import { amount, required } from 'func/validators';

function WithdrawForm ({ vaultNum }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { collateralDetails } = useSelector(borrowVaultInfoSelector);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(collateralDetails?.availableWithdraw)] },
    onSubmit: (form) => {
      dispatch(setBorrowWithdraw(form.amount, vaultNum));
    }
  });
  useMetamaskReset(formTypes.borrowAssetWithdraw, form.reset);

  return (
    <form
      noValidate
      className="borrow-manage-form"
      onSubmit={form.submit}
    >
      <Input
        {...form.fields.amount}
        type="number"
        label={t('WITHDRAW_COLLATERAL')}
        prefix={collateralDetails?.assets}
        max={collateralDetails?.availableWithdraw}
        placeholder="0.00"
      />
      <Button
        type="submit"
        className="form-action"
        disabled={!form.isValid}
        style={{ width: '100px' }}
      >
        {t('WITHDRAW')}
      </Button>
    </form>
  );
}

export default WithdrawForm;
