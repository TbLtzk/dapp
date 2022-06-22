import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';

import useFormArray from 'hooks/useFormArray';
import useMetamaskReset from 'hooks/useMetamaskReset';

import DelegationForm from './DelegationForm';

import { setDelegateStake } from 'store/q-vault/action-creators';
import { userAddressMetamask } from 'store/user-inf/selectors';

import formTypes from 'constants/form-types';
import { toWei } from 'func/balance';

function UpdateDelegation () {
  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);

  const formArray = useFormArray({
    minCount: 1,
    maxCount: 30,
    onSubmit: (forms) => {
      const delegatedTo = forms.map((f) => f.address);
      const stakes = forms.map((f) => toWei(f.amount));
      dispatch(setDelegateStake(address, delegatedTo, stakes));
    }
  });
  useMetamaskReset(formTypes.qVaultDelegation, formArray.reset);

  return (
    <>
      <h3>Update Delegation</h3>
      <div className="card__one-line-form-2-2-1">
        <p>Address</p>
        <div style={{ position: 'relative' }}>
          <p>New Stake</p>
          <p style={{ fontSize: '10px', position: 'absolute', top: '18px' }}>
            0 will remove delegation
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '15px' }}>
        {formArray.forms.map((form) => (
          <DelegationForm
            key={form.id}
            onAdd={formArray.appendForm}
            onRemove={() => formArray.removeForm(form.id)}
            onChange={form.onChange}
          />
        ))}
      </div>

      <div className="card__actions" style={{ marginBottom: '10px' }}>
        <Button onClick={formArray.submit}>
          <i className="mdi mdi-cached" />
          <span>Update Delegation</span>
        </Button>
      </div>
    </>
  );
}

export default UpdateDelegation;
