import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { formatPercent } from '@q-dev/utils';
import { Validator, ValidatorStats } from 'typings/validator';

import Button from 'components/Button';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Input from 'components/Input';
import { StakeFormContainer } from 'pages/Staking/styles';

import useNetworkConfig from 'hooks/useNetworkConfig';

import ClaimTip from '../../../ClaimTip';

import { useQVault } from 'store/q-vault/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { max, required } from 'utils/validators';
import { toWei } from 'utils/web3';

interface Props {
  validator?: ValidatorStats | Validator;
  onSubmit: () => void;
}

function DelegateStakeForm ({ validator, onSubmit }: Props) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { qTicker } = useNetworkConfig();
  const { delegationStakeInfo, delegateStake } = useQVault();

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, max(delegationStakeInfo.delegatableAmount)] },
    onSubmit: ({ amount }) => {
      submitTransaction({
        successMessage: t('STAKE_UPDATE_TX'),
        onSuccess: () => onSubmit(),
        submitFn: () => delegateStake({
          addresses: [validator?.address || ''],
          stakes: [toWei(amount)],
        })
      });
    },
  });

  if (!validator) return null;

  return (
    <StakeFormContainer noValidate onSubmit={form.submit}>
      <div className="validator-info">
        <div>
          <p className="text-md color-secondary">{t('VALIDATOR_ADDRESS')}</p>
          <ExplorerAddress
            iconed
            short
            address={validator.address}
          />
        </div>

        <div>
          <p className="text-md color-secondary">{t('DELEGATOR_SHARE')}</p>
          <p className="text-lg">{formatPercent(validator.poolInfo.delegatorsShare)}</p>
        </div>
      </div>

      <Input
        prefix={qTicker}
        {...form.fields.amount}
        type="number"
        label={t('AMOUNT')}
        placeholder="0.00"
        max={delegationStakeInfo.delegatableAmount}
      />

      <ClaimTip />

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
