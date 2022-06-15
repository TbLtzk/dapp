import { useDispatch } from 'react-redux';

import { AliasPurpose } from '@q-dev/q-js-sdk';

import Button from 'components/Base/Button';
import Input from 'components/Base/Form/Input';
import Select from 'components/Base/Form/Select';

import useForm from 'hooks/useForm';

import { setAlias } from 'store/account-aliases/action-creators';

import { address, required } from 'func/validators';

function AliasForm ({ alias }) {
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      address: alias.address,
      purpose: alias.purpose,
    },
    validators: {
      address: [required, address],
      purpose: [required]
    },
    onSubmit: (form) => {
      dispatch(setAlias(form));
    }
  });

  return (
    <form
      noValidate
      style={{ display: 'grid', gap: '15px' }}
      onSubmit={form.submit}
    >
      <Select
        {...form.fields.purpose}
        options={Object.entries(AliasPurpose).map(([label, value]) => ({ value, label }))}
        defaultValue={AliasPurpose.BLOCK_SEALING}
        label="Role"
      />

      <Input
        {...form.fields.address}
        invertedColors
        label="Address"
        placeholder="0x..."
      />

      <Button
        type="submit"
        disabled={!form.isValid}
        style={{ marginTop: '20px', width: '120px' }}
      >
        Update
      </Button>
    </form>
  );
}

export default AliasForm;
