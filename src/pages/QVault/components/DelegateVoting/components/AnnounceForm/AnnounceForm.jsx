import React from 'react';
import { useDispatch } from 'react-redux';

import Button from 'components/Base/Buttons/Button';
import Input from 'components/Base/Form/Input';

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
  useMetamaskReset(formTypes.qVaultAnnounce, form);

  return (
    <form noValidate onSubmit={form.submit}>
      <h3>Announce new voting agent</h3>
      <h4>Address</h4>
      <div className="card__one-line-simple-form">
        <Input
          {...form.fields.address}
          placeholder="0x000"
        />
        <Button
          type="submit"
          title="Announce"
          width="90px"
          disabled={!form.isValid}
        />
      </div>
      <h4>This will immediately reduce the voting weight of your voting agent for new voting</h4>
    </form>
  );
}

export default AnnounceForm;
