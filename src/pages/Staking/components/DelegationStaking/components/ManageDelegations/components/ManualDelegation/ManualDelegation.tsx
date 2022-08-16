import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { FormDelegation } from 'typings/forms';
import { toWei } from 'web3-utils';

import FormBlock from 'components/FormBlock';
import Button from 'ui/Button';
import Icon from 'ui/Icon';

import useFormArray from 'hooks/useFormArray';
import useMetamaskReset from 'hooks/useMetamaskReset';

import ClaimTip from '../../../ClaimTip';
import DelegationForm from '../DelegationForm';

import { setDelegateStake } from 'store/q-vault/action-creators';
import { validatorsWidenedSelector } from 'store/validators/selectors';

import formTypes from 'constants/form-types';

function ManageDelegations () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const validators = useSelector(validatorsWidenedSelector);

  const formArray = useFormArray({
    minCount: 1,
    maxCount: 30,
    onSubmit: (forms: FormDelegation[]) => {
      const delegatedTo = forms.map((f) => f.address);
      const stakes = forms.map((f) => toWei(f.amount));
      dispatch(setDelegateStake(delegatedTo, stakes, t('UPDATE_DELEGATION_SUCCESS')));
    },
  });

  useMetamaskReset(formTypes.qVaultDelegation, formArray.reset);

  return (
    <div className="block" style={{ display: 'grid', gap: '15px', margin: '30px 0 40px 0' }}>
      {formArray.forms.map((form, i) => (
        <FormBlock
          key={form.id}
          title={`${t('DELEGATION')} ${i + 1}`}
          icon={formArray.forms.length > 1 ? 'delete' : undefined}
          onAction={() => formArray.removeForm(form.id)}
        >
          <DelegationForm validators={validators} onChange={form.onChange} />
        </FormBlock>
      ))}
      <ClaimTip/>

      <div className="delegation-buttons">
        <Button look="ghost" onClick={formArray.appendForm}>
          <Icon name="add" />
          <span>{t('ADD_DELEGATION')}</span>
        </Button>

        <Button onClick={formArray.submit}>
          <i className="mdi mdi-cached" />
          <span>{t('UPDATE_DELEGATION')}</span>
        </Button>
      </div>
    </div>
  );
}

export default ManageDelegations;
