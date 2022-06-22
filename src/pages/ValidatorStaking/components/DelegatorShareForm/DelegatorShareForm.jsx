import { useDispatch } from 'react-redux';

import Button from 'components/Base/Button';
import Input from 'components/Base/Form/Input';

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
      <h4>Set Delegator Share</h4>
      <div className="modal-one-line-form">
        <Input
          {...form.fields.amount}
          invertedColors
          type="number"
          prefix="%"
          placeholder="0"
        />
        <Button
          type="submit"
          disabled={!form.isValid}
          style={{ width: '94px' }}
        >
          Set
        </Button>
      </div>
    </form>
  );
}

export default DelegatorShareForm;
