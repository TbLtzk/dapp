import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Asset, VaultWithFee } from 'typings/defi';
import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setBorrowAprove, setBorrowDeposit } from 'store/borrow-assets/actions';
import { allowanceDepositSelector, borrowVaultSelector } from 'store/borrow-assets/selectors';

import formTypes from 'constants/form-types';
import { amount, required } from 'func/validators';

function DepositForm ({ vault }: {vault: VaultWithFee}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const allowanceDeposit = useSelector(allowanceDepositSelector);
  const { collateralDetails } = useSelector(borrowVaultSelector);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(collateralDetails?.availableDeposit)] },
    onSubmit: (form) => {
      dispatch(setBorrowDeposit(form.amount, vault.vaultNum, collateralDetails.decimals));
    },
  });

  useMetamaskReset(formTypes.borrowAssetDeposit, form.reset);

  const isApproveMode = useMemo(() => {
    return Number(allowanceDeposit) < Number(form.values.amount);
  }, [allowanceDeposit, form.values.amount]);

  return (
    <form
      noValidate
      className="borrow-manage-form"
      onSubmit={form.submit}
    >
      <Input
        {...form.fields.amount}
        type="number"
        label={t('DEPOSIT_COLLATERAL')}
        prefix={collateralDetails.collateralAsset}
        max={collateralDetails.availableDeposit}
        placeholder="0.00"
      />
      {isApproveMode
        ? (
          <Button
            style={{ width: '100px' }}
            className="form-action"
            onClick={() => dispatch(setBorrowAprove('deposit', vault.colKey as Asset))}
          >
            {t('APPROVE')}
          </Button>
        )
        : (
          <Button
            type="submit"
            className="form-action"
            style={{ width: '100px' }}
            disabled={!form.isValid}
          >
            {t('DEPOSIT')}
          </Button>
        )}
    </form>
  );
}

export default DepositForm;
