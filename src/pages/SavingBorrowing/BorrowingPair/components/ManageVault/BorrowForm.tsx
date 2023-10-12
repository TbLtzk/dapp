import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { formatAsset, formatNumber, formatPercent } from '@q-dev/utils';
import { ErrorHandler } from 'helpers';
import styled from 'styled-components';
import { StablecoinAsset, VaultWithId } from 'typings/defi';

import Button from 'components/Button';
import Input from 'components/Input';

import LiquidationInfoBlock from './LiquidationInfoBlock';
import { useManageVaultContext } from './ManageVaultContext';

import { useBorrowingVaults } from 'store/borrowing/hooks';
import { useStablecoinBalance } from 'store/saving/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { getEpdrParametersInstance } from 'contracts/contract-instance';

import { amount, min, required } from 'utils/validators';
import { fromWei } from 'utils/web3';

interface Props {
  vault: VaultWithId;
  stablecoin: StablecoinAsset;
}

const StyledForm = styled.form`
  display: grid;
  gap: 16px;

  .borrow-balances {
    display: grid;
    gap: 8px;
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
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

function BorrowForm ({ vault, stablecoin }: Props) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();

  const { loadStablecoinBalance } = useStablecoinBalance(stablecoin);
  const { loadBorrowingVaults } = useBorrowingVaults(stablecoin);
  const { borrowVault, borrowAsset } = useManageVaultContext();

  const [minAmount, setMinAmount] = useState('0');

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, min(minAmount), amount(borrowVault.borrowingDetails?.availableBorrow)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('BORROW_ASSET_TX'),
        submitFn: () => borrowAsset({ amount, vaultId: vault.id }),
        onSuccess: () => {
          form.reset();
          loadStablecoinBalance();
          loadBorrowingVaults();
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
      const rawStep = await contract.getUint(`governed.EPDR.${stablecoin}_step`);
      setMinAmount(fromWei(rawStep.toString()));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
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

      <LiquidationInfoBlock />

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
