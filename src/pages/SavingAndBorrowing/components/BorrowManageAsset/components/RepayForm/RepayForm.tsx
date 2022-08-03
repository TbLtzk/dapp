import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Asset, VaultWithFee } from 'typings/defi';
import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setBorrowAprove, setBorrowRepay } from 'store/borrow-assets/actions';
import { allowanceRepaySelector, borrowVaultSelector } from 'store/borrow-assets/selectors';

import formTypes from 'constants/form-types';
import { amount, required } from 'func/validators';

function RepayForm ({ vault }: {vault: VaultWithFee}) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { borrowingDetails } = useSelector(borrowVaultSelector);
  const allowanceRepay = useSelector(allowanceRepaySelector);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(borrowingDetails?.availableRepay)] },
    onSubmit: (form) => {
      dispatch(setBorrowRepay(form.amount, vault.vaultNum, t('REPAY_BORROWED_ASSET_SUCCESS')));
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
        type="number"
        label={t('REPAY_BORROWED_ASSET')}
        prefix={borrowingDetails.borrowingAsset}
        max={borrowingDetails?.availableRepay}
        placeholder="0.00"
      />
      {isApproveMode
        ? (
          <Button
            style={{ width: '100px' }}
            className="form-action"
            onClick={() => dispatch(setBorrowAprove('repay', vault.colKey as Asset, t('APPROVE')))}
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
