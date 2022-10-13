import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { VaultWithId } from 'typings/defi';
import { fromWei } from 'web3-utils';

import Button from 'components/Button';
import Input from 'components/Input';

import useForm from 'hooks/useForm';

import { useBorrowAssets } from 'store/borrow-assets/hooks';
import { useBorrowingVaults } from 'store/borrowing/hooks';
import { useSaving } from 'store/saving/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { getEpdrParametersInstance } from 'contracts/contract-instance';

import { captureError } from 'utils/errors';
import { formatAsset, formatNumber, formatPercent } from 'utils/numbers';
import { amount, min, required } from 'utils/validators';

const StyledForm = styled.form`
  display: grid;
  gap: 16px;

  .borrow-balances {
    display: grid;
    gap: 8px;
    background-color: ${({ theme }) => theme.colors.blockInside};
    padding: 12px 16px;
    border-radius: 8px;
  }

  .borrow-balance {
    display: flex;
    justify-content: space-between;
  }

  .borrow-btn {
    margin-top: 8px;
    width: 100%;
  }
`;

function BorrowForm ({ vault }: { vault: VaultWithId }) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();

  const { getSavingAvailableToDeposit } = useSaving();
  const { getBorrowingVaults } = useBorrowingVaults();
  const { borrowVault, borrowAsset } = useBorrowAssets();

  const [minAmount, setMinAmount] = useState('0');

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, min(minAmount), amount(borrowVault.borrowingDetails?.availableBorrow)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('BORROW_ASSET_SUCCESS'),
        submitFn: () => borrowAsset({ amount, vaultId: vault.id }),
        onSuccess: () => {
          form.reset();
          getSavingAvailableToDeposit();
          getBorrowingVaults();
        },
      });
    }
  });

  useEffect(() => {
    loadMinAmount();
  }, []);

  const loadMinAmount = async () => {
    try {
      const contract = await getEpdrParametersInstance();
      const rawStep = await contract.getUint('governed.EPDR.QUSD_step');
      setMinAmount(fromWei(rawStep.toString()));
    } catch (error) {
      captureError(error);
    }
  };

  return (
    <StyledForm noValidate onSubmit={form.submit}>
      <Input
        {...form.fields.amount}
        type="number"
        label={t('AMOUNT_TO_BORROW')}
        prefix={borrowVault.borrowingDetails.borrowingAsset}
        max={borrowVault.borrowingDetails.availableBorrow}
        placeholder="0.00"
        labelTip={t('AVAILABLE_WITH_AMOUNT', { amount: formatNumber(borrowVault.borrowingDetails.availableBorrow) })}
      />

      <div className="borrow-balances">
        <p className="borrow-balance text-sm">
          <span className="font-light">{t('BORROWING_FEE')}</span>
          <span>{formatPercent(borrowVault.borrowingDetails.borrowingFee)}</span>
        </p>

        <p className="borrow-balance text-sm">
          <span className="font-light">{t('BORROWED')}</span>
          <span>
            {formatNumber(borrowVault.borrowingDetails.outstandingDebt)}
            {' '}/{' '}
            {formatAsset(borrowVault.borrowingDetails.borrowingLimit, borrowVault.borrowingDetails.borrowingAsset)}
          </span>
        </p>
      </div>

      <Button
        type="submit"
        className="borrow-btn"
        disabled={!form.isValid}
      >
        {t('BORROW')}
      </Button>
    </StyledForm>
  );
}

export default BorrowForm;
