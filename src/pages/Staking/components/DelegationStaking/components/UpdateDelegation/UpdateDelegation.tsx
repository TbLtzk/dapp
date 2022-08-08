import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { FormDelegation } from 'typings/forms';

import Button from 'ui/Button';

import useFormArray from 'hooks/useFormArray';
import useMetamaskReset from 'hooks/useMetamaskReset';

import DelegationForm from './DelegationForm';

import { setDelegateStake } from 'store/q-vault/action-creators';
import { userAddressMetamask } from 'store/user-inf/selectors';

import formTypes from 'constants/form-types';
import { toWei } from 'utils/balance';

function UpdateDelegation () {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);

  const formArray = useFormArray({
    minCount: 1,
    maxCount: 30,
    onSubmit: (forms: FormDelegation[]) => {
      const delegatedTo = forms.map((f) => f.address);
      const stakes = forms.map((f) => toWei(f.amount));
      dispatch(setDelegateStake(address, delegatedTo, stakes, t('UPDATE_DELEGATION_SUCCESS')));
    },
  });
  useMetamaskReset(formTypes.qVaultDelegation, formArray.reset);

  const handleUpdateDelegation = (e: Event) => {
    formArray.submit(e);
  };

  return (
    <>
      <h4 className="text-xl">{t('UPDATE_DELEGATION')}</h4>
      <div style={{ display: 'grid', gap: '15px', marginBottom: '10px' }}>
        {formArray.forms.map((form) => (
          <DelegationForm
            key={form.id}
            onAdd={formArray.appendForm}
            onRemove={() => formArray.removeForm(form.id)}
            onChange={form.onChange}
          />
        ))}
      </div>

      <Button onClick={handleUpdateDelegation}>
        <i className="mdi mdi-cached" />
        <span>{t('UPDATE_DELEGATION')}</span>
      </Button>
    </>
  );
}

export default UpdateDelegation;
