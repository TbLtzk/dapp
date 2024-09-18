import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { Calendar, media, Tip } from '@q-dev/q-ui-kit';
import { formatAsset } from '@q-dev/utils';
import { useWeb3Context } from 'context/Web3ContextProvider';
import styled from 'styled-components';
import { TimeLockContractType } from 'typings/contracts';
import { TimeLockForm } from 'typings/time-locks';

import Button from 'components/Button';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Input from 'components/Input';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { useTimeLocksAddress } from '../TimeLocks';

import { useQVault } from 'store/q-vault/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { depositTimeLock } from 'contracts/helpers/locked-amount-helper';
import { getQVaultDepositAmount } from 'contracts/helpers/q-vault-helper';

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
  const { t, i18n } = useTranslation();
  const { address } = useTimeLocksAddress();
  const { qTicker } = useNetworkConfig();

  const { submitTransaction } = useTransaction();

  const { walletBalance } = useQVault();
  const { address: accountAddress } = useWeb3Context();

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
        successMessage: t('TIME_LOCKS_DEPOSIT_TX'),
        submitFn: () => depositTimeLock({ ...values, contract, address } as TimeLockForm),
        onSuccess: () => onSubmit()
      });
    }
  });

  const getMaxAmount = async () => {
    const depositAmount = await getQVaultDepositAmount(accountAddress);
    return Number(depositAmount) < 0 ? '0' : String(depositAmount);
  };

  useEffect(() => {
    getMaxAmount().then(setMaxAmount);

    return () => {
      setMaxAmount('0');
    };
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
          locale={i18n.language}
          value={form.values.startDate as Date}
          label={t('START_DATE')}
          placeholder={t('CHOOSE_DATE_AND_TIME')}
          timeCaption={t('TIME')}
          dateFormat={'dd.MM.yyyy HH:mm'}
          startDate={form.values.startDate ? new Date(form.values.startDate) : null}
          endDate={form.values.endDate ? new Date(form.values.endDate) : null}
          minDate={new Date()}
          disabled={isDepositsLimitReached}
        />

        <Calendar
          {...form.fields.endDate}
          selectsEnd
          locale={i18n.language}
          value={form.values.endDate as Date}
          label={t('END_DATE')}
          placeholder={t('CHOOSE_DATE_AND_TIME')}
          timeCaption={t('TIME')}
          dateFormat={'dd.MM.yyyy HH:mm'}
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
        labelTip={t('MINIMUM_AMOUNT', { amount: formatAsset(MIN_DEPOSIT_AMOUNT, qTicker) })}
        prefix={qTicker}
        placeholder="0.0"
        max={maxAmount}
        hint={form.values.amount === maxAmount ? t('WARNING_NO_Q_LEFT', { asset: qTicker }) : ''}
        disabled={isDepositsLimitReached}
      />

      {isDepositsLimitReached &&
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
