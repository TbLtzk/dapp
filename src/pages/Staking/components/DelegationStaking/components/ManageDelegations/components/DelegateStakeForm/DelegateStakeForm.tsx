import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Validator } from 'typings/validator';
import { toWei } from 'web3-utils';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import { StakeFormContainer } from 'pages/Staking/styles';
import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import ClaimTip from '../../../ClaimTip';

import { setDelegateStake } from 'store/q-vault/action-creators';
import { delegationStakeInfoSelector } from 'store/q-vault/selectors';

import { formatAsset } from 'utils/numbers';
import { max, required } from 'utils/validators';

function DelegateStakeForm ({ delegation }: { delegation: Validator }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const delegationStakeInfo = useSelector(delegationStakeInfoSelector);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, max(delegationStakeInfo.delegatableAmount)] },
    onSubmit: ({ amount }) => {
      dispatch(setDelegateStake([delegation.address], [toWei(amount)], t('SUCCESSFUL_STAKE_UPDATE')));
    },
  });

  return (
    <StakeFormContainer noValidate onSubmit={form.submit}>
      <div className="validator-info">
        <div>
          <p className="text-md color-secondary">{t('VALIDATOR_ADDRESS')}</p>
          <ExplorerAddress
            iconed
            short
            address={delegation.address}
          />
        </div>

        <div>
          <p className="text-md color-secondary">{t('DELEGATOR_SHARE')}</p>
          <p className="text-lg">{formatAsset(delegation.delegatorShare, ' %')}</p>
        </div>
      </div>

      <Input
        prefix="Q"
        {...form.fields.amount}
        type="number"
        label={t('AMOUNT')}
        placeholder="0.00"
        max={delegationStakeInfo.delegatableAmount}
      />

      <ClaimTip/>

      <Button
        type="submit"
        style={{ width: '100%', marginTop: '15px' }}
        disabled={!form.isValid}
      >
        {t('CONFIRM')}
      </Button>

    </StakeFormContainer>
  );
}

export default DelegateStakeForm;
