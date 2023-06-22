import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { Tip } from '@q-dev/q-ui-kit';
import { toBigNumber, unixToDate } from '@q-dev/utils';
import styled from 'styled-components';

import Button from 'components/Button';
import Input from 'components/Input';

import { FORM_TYPES } from '../RootNodeMenu/RootNodeMenu';

import { useQVault } from 'store/q-vault/hooks';
import { useRootNodes } from 'store/root-nodes/hooks';
import { SubmitTransactionFn, useTransaction } from 'store/transaction/hooks';

import { formatDate } from 'utils/date';
import { amount, max, required } from 'utils/validators';
import { fromWei } from 'utils/web3';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .root-node-forms__submit-btn {
    margin-top: 16px;
    width: 100%;
  }
`;

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

  const isAnnouncementPending = useMemo(() => {
    return unixToDate(withdrawalInfo.endTime) > new Date();
  }, [withdrawalInfo.endTime]);

  const getMaxAmount = () => {
    const withdrawalAmount = fromWei(withdrawalInfo.amount);
    switch (formType) {
      case FORM_TYPES.stakeToRanking:
        return walletBalance;
      case FORM_TYPES.announceWithdrawal:
        return toBigNumber(rootNodeStake).plus(toBigNumber(withdrawalAmount)).toFixed();
      case FORM_TYPES.withdrawFromRanking:
        return isAnnouncementPending ? '0' : withdrawalAmount;
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
      let submitFn: SubmitTransactionFn;
      switch (formType) {
        case FORM_TYPES.stakeToRanking:
          successMessage = t('STAKE_TO_PANEL_TX');
          submitFn = () => commitRootNodeStake(amount);
          break;
        case FORM_TYPES.announceWithdrawal:
          successMessage = t('ANNOUNCE_WITHDRAWAL_TX');
          submitFn = () => announceRootStakeWithdrawal(amount);
          break;
        case FORM_TYPES.withdrawFromRanking:
        default:
          successMessage = t('WITHDRAW_FROM_PANEL_TX');
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
    <StyledForm noValidate onSubmit={form.submit}>
      {formType === FORM_TYPES.withdrawFromRanking && isAnnouncementPending && (
        <Tip compact>
          {t('WITHDRAWAL_LOCKED_TIP', {
            date: formatDate(unixToDate(withdrawalInfo.endTime))
          })}
        </Tip>
      )}

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
        className="root-node-forms__submit-btn"
        disabled={!form.isValid}
      >
        {t('CONFIRM')}
      </Button>
    </StyledForm>
  );
}

export default RootNodeForms;
