import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { toBigNumber } from '@q-dev/utils';
import { fromWei } from 'web3-utils';

import Button from 'ui/Button';
import Input from 'ui/Input';

import { useSendValidatorForms } from '../hooks';

import { FORM_TYPES } from './ValidatorMenu';

import { useQVault } from 'store/q-vault/hooks';
import { useTransaction } from 'store/transaction/hooks';
import { useValidators } from 'store/validators/hooks';

import { amount, required } from 'utils/validators';

interface Props {
  formType: string;
  onClose: () => void;
}

function ValidatorForms ({ formType, onClose }: Props) {
  const { t } = useTranslation();
  const { validatorAccountableTotalStake, validatorWithdrawalInfo } = useValidators();
  const { walletBalance } = useQVault();

  const { submitTransaction } = useTransaction();
  const sendForm = useSendValidatorForms();

  const getMaxAmount = () => {
    const withdrawalAmount = fromWei(validatorWithdrawalInfo.amount);
    switch (formType) {
      case FORM_TYPES.stakeToRanking:
        return walletBalance;
      case FORM_TYPES.announceWithdrawal:
        return toBigNumber(validatorAccountableTotalStake).plus(toBigNumber(withdrawalAmount)).toString();
      case FORM_TYPES.withdrawFromRanking:
        return fromWei(validatorWithdrawalInfo.amount);
      default:
        return '0';
    }
  };

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(getMaxAmount())] },
    onSubmit: ({ amount }) => {
      let successMessage: string;
      switch (formType) {
        case FORM_TYPES.stakeToRanking:
          successMessage = t('STAKE_TO_RANKING_SUCCESS');
          break;
        case FORM_TYPES.announceWithdrawal:
          successMessage = t('ANNOUNCE_WITHDRAWAL_SUCCESS');
          break;
        case FORM_TYPES.withdrawFromRanking:
        default:
          successMessage = t('WITHDRAW_FROM_RANKING_SUCCESS');
          break;
      }

      submitTransaction({
        successMessage,
        onSuccess: () => onClose(),
        submitFn: () => sendForm(formType, amount),
      });
    },
  });

  return (
    <form noValidate onSubmit={form.submit}>
      <Input
        {...form.fields.amount}
        type="number"
        label={t('AMOUNT')}
        placeholder="0.00"
        max={getMaxAmount()}
        hint={
          formType === FORM_TYPES.stakeToRanking && form.values.amount === getMaxAmount() ? t('WARNING_NO_Q_LEFT') : ''
        }
      />

      <Button
        type="submit"
        style={{ width: '100%', marginTop: '24px' }}
        disabled={!form.isValid}
      >
        {t('CONFIRM')}
      </Button>
    </form>
  );
}

export default ValidatorForms;
