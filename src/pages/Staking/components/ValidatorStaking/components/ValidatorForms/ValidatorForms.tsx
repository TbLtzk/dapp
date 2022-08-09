import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { fromWei } from 'web3-utils';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { FORM_TYPES } from '../ValidatorMenu/ValidatorMenu';

import { accountBalance } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';
import {
  setValidatorsAnnounceWithdrawal,
  setValidatorsCommitStake,
  setValidatorsWithdraw,
} from 'store/validators/action-creators';
import { accountableTotalStake, validatorWithdrawalInfo } from 'store/validators/selectors';

import formTypes from 'constants/form-types';
import { BN } from 'utils/numbers';
import { amount, required } from 'utils/validators';

interface Props {
  formType: string | null;
  onReset: () => void;
}

function ValidatorForms ({ formType, onReset }: Props) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);
  const userAccountableTotalStake = useSelector(accountableTotalStake);
  const withdrawalInfo = useSelector(validatorWithdrawalInfo);
  const userBalance = useSelector(accountBalance);

  const getMaxAmount = () => {
    const withdrawalAmount = fromWei(withdrawalInfo.amount);

    switch (formType) {
      case FORM_TYPES.stakeToRanking:
        return userBalance;
      case FORM_TYPES.announceWithdrawal:
        return BN(userAccountableTotalStake).plus(BN(withdrawalAmount)).toString();
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
          dispatch(setValidatorsCommitStake(address, amount, t('STAKE_TO_RANKING_SUCCESS')));
          break;
        case FORM_TYPES.announceWithdrawal:
          dispatch(setValidatorsAnnounceWithdrawal(address, amount, t('ANNOUNCE_WITHDRAWAL_SUCCESS')));
          break;
        case FORM_TYPES.withdrawFromRanking:
          dispatch(setValidatorsWithdraw(address, amount, t('WITHDRAW_FROM_RANKING_SUCCESS')));
          break;
      }
    }
  });

  useMetamaskReset(formTypes.validatorsStaking, onReset);

  return (
    <form noValidate onSubmit={form.submit}>
      <Input
        {...form.fields.amount}
        type="number"
        label={t('AMOUNT')}
        placeholder="0.00"
        max={getMaxAmount()}
        hint={formType === FORM_TYPES.stakeToRanking && form.values.amount === getMaxAmount()
          ? t('WARNING_NO_Q_LEFT')
          : ''
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
