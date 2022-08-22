import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { fromWei } from 'web3-utils';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { useSendValidatorForms } from '../hooks';

import { FORM_TYPES } from './ValidatorMenu';

import { accountBalance } from 'store/q-vault/selectors';
import { validatorAcountableTotalStakeSelector, validatorWithdrawalInfo } from 'store/validators/selectors';

import { toBigNumber } from 'utils/numbers';
import { amount, required } from 'utils/validators';

interface Props {
  formType: string | null;
}

function ValidatorForms ({ formType }: Props) {
  const { t } = useTranslation();

  const accountableTotalStake = useSelector(validatorAcountableTotalStakeSelector);
  const withdrawalInfo = useSelector(validatorWithdrawalInfo);
  const userBalance = useSelector(accountBalance);
  const sendForm = useSendValidatorForms();

  const getMaxAmount = () => {
    const withdrawalAmount = fromWei(withdrawalInfo.amount);
    switch (formType) {
      case FORM_TYPES.stakeToRanking:
        return userBalance;
      case FORM_TYPES.announceWithdrawal:
        return toBigNumber(accountableTotalStake).plus(toBigNumber(withdrawalAmount)).toString();
      case FORM_TYPES.withdrawFromRanking:
        return fromWei(withdrawalInfo.amount);
      default:
        return '0';
    }
  };

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, amount(getMaxAmount())] },
    onSubmit: ({ amount }) => {
      switch (formType) {
        case FORM_TYPES.stakeToRanking:
          sendForm(FORM_TYPES.stakeToRanking, amount, t('STAKE_TO_RANKING_SUCCESS'), form);
          break;
        case FORM_TYPES.announceWithdrawal:
          sendForm(FORM_TYPES.announceWithdrawal, amount, t('ANNOUNCE_WITHDRAWAL_SUCCESS'), form);
          break;
        case FORM_TYPES.withdrawFromRanking:
          sendForm(FORM_TYPES.withdrawFromRanking, amount, t('WITHDRAW_FROM_RANKING_SUCCESS'), form);
          break;
      }
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
