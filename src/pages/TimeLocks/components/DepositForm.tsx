import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { media } from 'styles/media';
import { TimeLockContractType } from 'typings/contracts';
import { TimeLockForm } from 'typings/time-locks';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Button from 'ui/Button';
import Calendar from 'ui/Calendar';
import Input from 'ui/Input';
import Tip from 'ui/Tip';

import useForm from 'hooks/useForm';

import { useTimeLocksAddress } from '../TimeLocks';

import { useLockedAmount } from 'store/locked-amount/hooks';
import { useQVault } from 'store/q-vault/hooks';
import { useTransaction } from 'store/transaction/hooks';
import { useUser } from 'store/user/hooks';

import { getQVaultDepositAmount } from 'contracts/helpers/q-vault-helper';

import { formatAsset } from 'utils/numbers';
import { futureDate, max, min, required } from 'utils/validators';

const StyledForm = styled.form`
  display: grid;
  gap: 16px;

  .deposit-form-calendars {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    ${media.lessThan('medium')} {
      grid-template-columns: 1fr;
    }
  }
  
  .deposit-form-btn {
    margin-top: 8px;
    width: 100%;
  }
`;

interface Props {
  contract: TimeLockContractType;
  isDepositsLimitReached?: boolean;
  onSubmit: () => void;
}

const MIN_DEPOSIT_AMOUNT = 10; // Q

function DepositForm ({ contract, isDepositsLimitReached, onSubmit }: Props) {
  const { t } = useTranslation();
  const { address } = useTimeLocksAddress();

  const { submitTransaction } = useTransaction();
  const { depositTimeLock } = useLockedAmount();

  const { walletBalance } = useQVault();
  const user = useUser();

  const [maxAmount, setMaxAmount] = useState('0');

  const form = useForm({
    initialValues: {
      amount: '',
      startDate: null as Date | null,
      endDate: null as Date | null,
    },
    validators: {
      amount: [required, min(MIN_DEPOSIT_AMOUNT), max(maxAmount)],
      startDate: [required, futureDate],
      endDate: [required, futureDate]
    },
    onSubmit: (values) => {
      submitTransaction({
        successMessage: t('TIME_LOCKS_DEPOSIT_SUCCESS'),
        submitFn: () => depositTimeLock({ ...values, contract, address } as TimeLockForm),
        onSuccess: () => onSubmit()
      });
    }
  });

  const updateMaxAmount = async () => {
    const depositAmount = await getQVaultDepositAmount(user.address);
    setMaxAmount(Number(depositAmount) < 0 ? '0' : String(depositAmount));
  };

  useEffect(() => {
    updateMaxAmount();
  }, [walletBalance]);

  return (
    <StyledForm noValidate onSubmit={form.submit}>
      <div>
        <p className="text-md color-secondary">{t('RECIPIENT_ADDRESS')}</p>
        <ExplorerAddress
          semibold
          iconed
          short
          address={address}
          className="text-xl"
        />
      </div>

      <div className="deposit-form-calendars">
        <Calendar
          {...form.fields.startDate}
          selectsStart
          value={form.values.startDate as Date}
          label={t('START_DATE')}
          startDate={form.values.startDate ? new Date(form.values.startDate) : null}
          endDate={form.values.endDate ? new Date(form.values.endDate) : null}
          minDate={new Date()}
          disabled={isDepositsLimitReached}
        />

        <Calendar
          {...form.fields.endDate}
          selectsEnd
          value={form.values.endDate as Date}
          label={t('END_DATE')}
          disabled={!form.values.startDate || isDepositsLimitReached}
          startDate={form.values.startDate as Date}
          endDate={form.values.endDate as Date}
          minDate={form.values.startDate as Date}
        />
      </div>

      <Input
        {...form.fields.amount}
        type="number"
        value={form.values.amount as string}
        label={t('AMOUNT')}
        labelTip={t('MINIMUM_AMOUNT', { amount: formatAsset(MIN_DEPOSIT_AMOUNT, 'Q') })}
        prefix="Q"
        placeholder="0.0"
        max={maxAmount}
        hint={form.values.amount === maxAmount ? t('WARNING_NO_Q_LEFT') : ''}
        disabled={isDepositsLimitReached}
      />

      { isDepositsLimitReached &&
        <Tip compact type="info">
          {t('MAX_TIME_LOCK_DEPOSIT_MESSAGE')}
        </Tip>
      }

      <Button
        type="submit"
        className="deposit-form-btn"
        disabled={!form.isValid || isDepositsLimitReached}
      >
        {t('DEPOSIT')}
      </Button>
    </StyledForm>
  );
}

export default memo(DepositForm);
