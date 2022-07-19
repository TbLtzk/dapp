import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setBorrowAprove, setBorrowRepay } from 'store/borrow-assets/action-creators';
import { allowanceRepaySelector, borrowVaultInfoSelector } from 'store/borrow-assets/selectors';

import { borrowTypes } from 'constants/borrowTypes';
import formTypes from 'constants/form-types';
import { amount, required } from 'func/validators';

function RepayForm ({ vaultNum }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const allowanceRepay = useSelector(allowanceRepaySelector);
  const { borrowingDetails } = useSelector(borrowVaultInfoSelector);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(borrowingDetails?.availableRepay)] },
    onSubmit: (form) => {
      dispatch(setBorrowRepay(form.amount, vaultNum));
    },
  });

  useMetamaskReset(formTypes.borrowAssetRepay, form.reset);

  const isApproveMode = useMemo(() => {
    return Number(allowanceRepay) < Number(form.values.amount);
  }, [allowanceRepay, form.values.amount]);

  return (
    <form
      noValidate
      className="borrow-manage-form"
      onSubmit={form.submit}
    >
      <Input
        {...form.fields.amount}
        invertedColors
        type="number"
        label={t('REPAY_BORROWED_ASSET')}
        prefix={borrowingDetails?.assets}
        max={borrowingDetails?.availableRepay}
        placeholder="0.00"
      />
      {isApproveMode
        ? (
          <Button
            style={{ width: '100px' }}
            onClick={() => dispatch(setBorrowAprove(borrowTypes.repay))}
          >
            {t('APPROVE')}
          </Button>
        )
        : (
          <Button
            type="submit"
            className="form-action"
            disabled={!form.isValid}
            style={{ width: '100px' }}
          >
            {t('REPAY')}
          </Button>
        )}
    </form>
  );
}

export default RepayForm;
