import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { Tip } from '@q-dev/q-ui-kit';
import { useInterval } from '@q-dev/react-hooks';
import { BigNumber, dateToUnix, formatAsset, formatNumber, toBigNumber, unixToDate } from '@q-dev/utils';
import { useWeb3Context } from 'context/Web3ContextProvider';
import { ErrorHandler } from 'helpers';
import styled from 'styled-components';

import Button from 'components/Button';
import Input from 'components/Input';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { useSendValidatorForms } from '../hooks';

import { FORM_TYPES } from './ValidatorMenu';

import { useQVault } from 'store/q-vault/hooks';
import { useTransaction } from 'store/transaction/hooks';
import { useValidators } from 'store/validators/hooks';

import { getValidatorsInstance } from 'contracts/contract-instance';

import { formatDate } from 'utils/date';
import { amount, max, required } from 'utils/validators';
import { fromWei } from 'utils/web3';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .validator-forms__submit-btn {
    margin-top: 16px;
    width: 100%;
  }
`;

interface Props {
  formType: string;
  onClose: () => void;
}

function ValidatorForms ({ formType, onClose }: Props) {
  const { t } = useTranslation();
  const { address } = useWeb3Context();
  const { qTicker } = useNetworkConfig();
  const {
    validatorAccountableSelfStake: selfStake,
    validatorWithdrawalInfo,
  } = useValidators();
  const { walletBalance } = useQVault();

  const { submitTransaction } = useTransaction();
  const sendForm = useSendValidatorForms();
  const [lockedStake, setLockedStake] = useState('0');

  const isAnnouncementPending = useMemo(() => {
    return unixToDate(validatorWithdrawalInfo.endTime) > new Date();
  }, [validatorWithdrawalInfo.endTime]);

  const maxAmount = useMemo(() => {
    const withdrawalAmount = fromWei(validatorWithdrawalInfo.amount);
    switch (formType) {
      case FORM_TYPES.stakeToRanking:
        return walletBalance;
      case FORM_TYPES.announceWithdrawal:
        return toBigNumber(selfStake)
          .plus(toBigNumber(withdrawalAmount))
          .toFixed();
      case FORM_TYPES.withdrawFromRanking:
        const notLockedStake = toBigNumber(selfStake)
          .plus(toBigNumber(withdrawalAmount))
          .minus(lockedStake);
        return BigNumber.min(notLockedStake, withdrawalAmount).toFixed();
      default:
        return '0';
    }
  }, [formType, lockedStake, selfStake, validatorWithdrawalInfo.amount, walletBalance]);

  const maxAmountValidation = () => {
    return formType === FORM_TYPES.announceWithdrawal
      ? max(maxAmount)
      : amount(maxAmount);
  };

  async function loadTimeLockedStake () {
    try {
      const contract = await getValidatorsInstance();
      const minimumBalance = await contract.getMinimumBalance(address, dateToUnix());
      setLockedStake(fromWei(minimumBalance));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }
  }

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, maxAmountValidation()] },
    onSubmit: ({ amount }) => {
      let successMessage: string;
      switch (formType) {
        case FORM_TYPES.stakeToRanking:
          successMessage = t('STAKE_TO_RANKING_TX');
          break;
        case FORM_TYPES.announceWithdrawal:
          successMessage = t('ANNOUNCE_WITHDRAWAL_TX');
          break;
        case FORM_TYPES.withdrawFromRanking:
        default:
          successMessage = t('WITHDRAW_FROM_RANKING_TX');
          break;
      }

      submitTransaction({
        successMessage,
        onSuccess: () => onClose(),
        submitFn: () => sendForm(formType, amount),
      });
    },
  });

  const inputHint = useMemo(() => {
    switch (formType) {
      case FORM_TYPES.stakeToRanking:
        return form.values.amount === maxAmount ? t('WARNING_NO_QGOV_LEFT', { asset: qTicker }) : '';
      case FORM_TYPES.withdrawFromRanking:
        return toBigNumber(lockedStake).isZero()
          ? ''
          : t('TIME_LOCKED_STAKE', { stake: formatAsset(lockedStake, qTicker) });
      default:
        return '';
    }
  }, [formType, form.values.amount, lockedStake, maxAmount, t]);

  useInterval(loadTimeLockedStake, 5000, { immediate: true });

  return (
    <StyledForm noValidate onSubmit={form.submit}>
      {formType === FORM_TYPES.withdrawFromRanking && isAnnouncementPending && (
        <Tip compact>
          {t('WITHDRAWAL_LOCKED_TIP', {
            date: formatDate(unixToDate(validatorWithdrawalInfo.endTime))
          })}
        </Tip>
      )}

      <Input
        {...form.fields.amount}
        type="number"
        label={t('AMOUNT')}
        placeholder="0.00"
        max={maxAmount}
        hint={inputHint}
        labelTip={
          formType === FORM_TYPES.announceWithdrawal ? t('AVAILABLE_WITH_AMOUNT', { amount: formatNumber(maxAmount) }) : ''
        }
      />

      <Button
        type="submit"
        className="validator-forms__submit-btn"
        disabled={!form.isValid}
      >
        {t('CONFIRM')}
      </Button>
    </StyledForm>
  );
}

export default ValidatorForms;
