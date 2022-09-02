import { useTranslation } from 'react-i18next';

import { FormDelegation } from 'typings/forms';
import { toWei } from 'web3-utils';

import FormBlock from 'components/FormBlock';
import Button from 'ui/Button';
import Icon from 'ui/Icon';

import useFormArray from 'hooks/useFormArray';

import ClaimTip from '../../../ClaimTip';
import DelegationForm from '../DelegationForm';

import { useQVault } from 'store/q-vault/hooks';
import { useTransaction } from 'store/transaction/hooks';
import { useValidators } from 'store/validators/hooks';

function ManageDelegations () {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();

  const { delegateStake } = useQVault();
  const { validatorStats } = useValidators();

  const formArray = useFormArray({
    minCount: 1,
    maxCount: 30,
    onSubmit: (forms: FormDelegation[]) => {
      submitTransaction({
        successMessage: t('UPDATE_DELEGATION_SUCCESS'),
        onSuccess: () => formArray.reset(),
        submitFn: () => delegateStake({
          addresses: forms.map((f) => f.address),
          stakes: forms.map((f) => toWei(f.amount)),
        })
      });
    },
  });

  return (
    <div className="block" style={{ display: 'grid', gap: '15px', margin: '30px 0 40px 0' }}>
      {formArray.forms.map((form, i) => (
        <FormBlock
          key={form.id}
          title={`${t('DELEGATION')} ${i + 1}`}
          icon={formArray.forms.length > 1 ? 'delete' : undefined}
          onAction={() => formArray.removeForm(form.id)}
        >
          <DelegationForm validators={validatorStats} onChange={form.onChange} />
        </FormBlock>
      ))}
      <ClaimTip/>

      <div className="delegation-buttons">
        <Button look="ghost" onClick={formArray.appendForm}>
          <Icon name="add" />
          <span>{t('ADD_DELEGATION')}</span>
        </Button>

        <Button onClick={() => formArray.submit()}>
          <i className="mdi mdi-cached" />
          <span>{t('UPDATE_DELEGATION')}</span>
        </Button>
      </div>
    </div>
  );
}

export default ManageDelegations;
