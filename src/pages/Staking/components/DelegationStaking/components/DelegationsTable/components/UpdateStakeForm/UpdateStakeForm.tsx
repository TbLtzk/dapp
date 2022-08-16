import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { toWei } from 'web3-utils';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import { StakeFormContainer } from 'pages/Staking/styles';
import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import ClaimTip from '../../../ClaimTip';
import { Delegation } from '../../DelegationsTable';

import { setDelegateStake } from 'store/q-vault/action-creators';
import { delegationStakeInfoSelector } from 'store/q-vault/selectors';

import { formatAsset } from 'utils/numbers';
import { max, min, required } from 'utils/validators';

function UpdateStakeForm ({ delegation }: { delegation: Delegation }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const delegationStakeInfo = useSelector(delegationStakeInfoSelector);
  const maxAmountToDelegate = Number(delegation.actualStake) + Number(delegationStakeInfo.delegatableAmount);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, min(0), max(maxAmountToDelegate)] },
    onSubmit: ({ amount }) => {
      dispatch(setDelegateStake([delegation.validator], [toWei(amount)], t('SUCCESS_STAKE_UPDATE')));
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
            address={delegation.validator}
          />
        </div>

        <div>
          <p className="text-md color-secondary">{t('DELEGATOR_SHARE')}</p>
          <p className="text-lg">{formatAsset(delegation.delegatorShare, '%')}</p>
        </div>
      </div>

      <Input
        prefix="Q"
        {...form.fields.amount}
        type="number"
        label={t('AMOUNT')}
        placeholder="0.00"
        max={String(maxAmountToDelegate)}
        hint={`${t('CURRENT_DELEGATION')} ${formatAsset(delegation.actualStake, 'Q')}`}
      />
      <ClaimTip/>
      <Button
        type="submit"
        style={{ width: '100%', marginTop: '15px' }}
        disabled={!form.isValid}
      >
        {t('UPDATE_STAKE')}
      </Button>
    </StakeFormContainer>
  );
}

export default UpdateStakeForm;
