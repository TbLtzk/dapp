import { useDispatch } from 'react-redux';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setAnnounceNewVotingAgent } from 'store/q-vault/action-creators';

import formTypes from 'constants/form-types';
import { address, required } from 'func/validators';

function AnnounceForm () {
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: { address: '' },
    validators: { address: [required, address] },
    onSubmit: (form) => {
      dispatch(setAnnounceNewVotingAgent(form.address));
    }
  });
  useMetamaskReset(formTypes.qVaultAnnounce, form.reset);

  return (
    <form noValidate onSubmit={form.submit}>
      <h3>Announce new voting agent</h3>
      <div className="card__one-line-simple-form">
        <Input
          {...form.fields.address}
          label="Address"
          placeholder="0x000"
          hint="This will immediately reduce the voting weight of your voting agent for new voting"
        />
        <Button
          type="submit"
          className="form-action"
          style={{ width: '90px' }}
          disabled={!form.isValid}
        >
          Announce
        </Button>
      </div>
    </form>
  );
}

export default AnnounceForm;
