import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { formatAsset, formatPercent } from '@q-dev/utils';
import { Delegation } from 'typings/validator';
import { toWei } from 'web3-utils';

import Button from 'components/Button';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Input from 'components/Input';
import { StakeFormContainer } from 'pages/Staking/styles';

import ClaimTip from '../../../ClaimTip';

import { useQVault } from 'store/q-vault/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { max, min, required } from 'utils/validators';

interface Props {
  delegation: Delegation;
  onSubmit: () => void;
}

function UpdateStakeForm ({ delegation, onSubmit }: Props) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { delegationStakeInfo, delegateStake } = useQVault();

  const maxAmountToDelegate = Number(delegation.actualStake) + Number(delegationStakeInfo.delegatableAmount);

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, min(0), max(maxAmountToDelegate)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('SUCCESS_STAKE_UPDATE'),
        onSuccess: () => onSubmit(),
        submitFn: () => delegateStake({
          addresses: [delegation.validator],
          stakes: [toWei(amount)],
        })
      });
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
          <p className="text-lg">{formatPercent(delegation.delegatorsShare)}</p>
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
