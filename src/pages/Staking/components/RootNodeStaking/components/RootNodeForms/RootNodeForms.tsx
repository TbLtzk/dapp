import { useTranslation } from 'react-i18next';

import { SubmitTransactionResponse } from '@q-dev/q-js-sdk';
import { fromWei } from 'web3-utils';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { FORM_TYPES } from '../RootNodeMenu/RootNodeMenu';

import { useQVault } from 'store/q-vault/hooks';
import { useRootNodes } from 'store/root-nodes/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { toBigNumber } from 'utils/numbers';
import { amount, max, required } from 'utils/validators';

interface Props {
  formType: string | null;
  onReset: () => void;
}

function RootNodeForms ({ formType, onReset }: Props) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const {
    rootNodeStake,
    withdrawalInfo,
    commitRootNodeStake,
    announceRootStakeWithdrawal,
    withdrawRootStake
  } = useRootNodes();
  const { walletBalance } = useQVault();

  const getMaxAmount = () => {
    const withdrawalAmount = fromWei(withdrawalInfo.amount);
    switch (formType) {
      case FORM_TYPES.stakeToRanking:
        return walletBalance;
      case FORM_TYPES.announceWithdrawal:
        return toBigNumber(rootNodeStake).plus(toBigNumber(withdrawalAmount)).toString();
      case FORM_TYPES.withdrawFromRanking:
        return withdrawalAmount;
      default:
        return '0';
    }
  };

  const maxRootAmount = () => {
    return formType === FORM_TYPES.announceWithdrawal
      ? max(getMaxAmount())
      : amount(getMaxAmount());
  };

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, maxRootAmount()] },
    onSubmit: ({ amount }) => {
      let successMessage: string;
      let submitFn: () => Promise<SubmitTransactionResponse>;
      switch (formType) {
        case FORM_TYPES.stakeToRanking:
          successMessage = t('STAKE_TO_PANEL_SUCCESS');
          submitFn = () => commitRootNodeStake(amount);
          break;
        case FORM_TYPES.announceWithdrawal:
          successMessage = t('ANNOUNCE_WITHDRAWAL_SUCCESS');
          submitFn = () => announceRootStakeWithdrawal(amount);
          break;
        case FORM_TYPES.withdrawFromRanking:
        default:
          successMessage = t('WITHDRAW_FROM_PANEL_SUCCESS');
          submitFn = () => withdrawRootStake(amount);
          break;
      }

      submitTransaction({
        successMessage,
        submitFn: () => submitFn(),
        onSuccess: () => onReset(),
      });
    }
  });

  return (
    <form noValidate onSubmit={form.submit}>
      <Input
        {...form.fields.amount}
        type="number"
        label={t('AMOUNT')}
        placeholder="0.00"
        hint={formType === FORM_TYPES.stakeToRanking && form.values.amount === getMaxAmount()
          ? t('WARNING_NO_Q_LEFT')
          : ''
        }
        max={getMaxAmount()}
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

export default RootNodeForms;
