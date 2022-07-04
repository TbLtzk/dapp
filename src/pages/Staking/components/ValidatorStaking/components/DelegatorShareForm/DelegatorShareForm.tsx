import { useDispatch } from 'react-redux';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setVRPDelegatorsShare } from 'store/validation-reward-pools/action-creators';

import formTypes from 'constants/form-types';
import { max, required } from 'func/validators';

function DelegatorShareForm () {
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: { amount: '' },
    validators: { amount: [required, max(100)] },
    onSubmit: (form) => {
      dispatch(setVRPDelegatorsShare(form.amount));
    }
  });
  useMetamaskReset(formTypes.validatorsPool, form.reset);

  return (
    <form noValidate onSubmit={form.submit}>
      <h3 className="text-h3">Set Delegator Share</h3>
      <div className="delegator-share-form">
        <Input
          {...form.fields.amount}
          type="number"
          placeholder="0 %"
          max="100"
        />
        <Button
          type="submit"
          disabled={!form.isValid}
          style={{ width: '94px', margin: '3px 0 0 0' }}
        >
          Set
        </Button>
      </div>
    </form>
  );
}

export default DelegatorShareForm;
