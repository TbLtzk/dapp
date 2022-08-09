import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { fromWei, toWei } from 'web3-utils';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { FORM_TYPES } from '../RootNodeMenu/RootNodeMenu';

import { accountBalance } from 'store/q-vault/selectors';
import { setRootAnnounceWithdrawal, setRootStakeToPanel, setRootWithdraw } from 'store/root-node/action-creators';
import { rootNodeStake, withdrawals } from 'store/root-node/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import formTypes from 'constants/form-types.js';
import { BN } from 'utils/numbers';
import { max, required } from 'utils/validators';

interface Props {
  formType: string | null;
  onReset: () => void;
}

function RootNodeForms ({ formType, onReset }: Props) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);
  const amountNodeStake = useSelector(rootNodeStake);
  const withdrawalInfo = useSelector(withdrawals);
  const userBalance = useSelector(accountBalance);

  const getMaxAmount = () => {
    const withdrawalAmount = fromWei(withdrawalInfo.amount);
    switch (formType) {
      case FORM_TYPES.stakeToRanking:
        return userBalance;
      case FORM_TYPES.announceWithdrawal:
        return BN(amountNodeStake).plus(BN(withdrawalAmount)).toString();
      case FORM_TYPES.withdrawFromRanking:
        return withdrawalAmount;
      default:
        return '0';
    }
  };

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, max(getMaxAmount())] },
    onSubmit: ({ amount }) => {
      switch (formType) {
        case FORM_TYPES.stakeToRanking:
          dispatch(setRootStakeToPanel({ from: userAddress, value: toWei(amount) }, t('STAKE_TO_PANEL_SUCCESS')));
          break;
        case FORM_TYPES.announceWithdrawal:
          dispatch(setRootAnnounceWithdrawal(toWei(amount), { from: userAddress }, t('ANNOUNCE_WITHDRAWAL_SUCCESS')));
          break;
        case FORM_TYPES.withdrawFromRanking:
          dispatch(setRootWithdraw(toWei(amount), userAddress, { from: userAddress }, t('WITHDRAW_FROM_PANEL_SUCCESS')));
          break;
      }
    }
  });

  useMetamaskReset(formTypes.rootNodeStaking, onReset);

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
