import { useDispatch } from 'react-redux';

import Button from 'components/Base/Button';
import Input from 'components/Base/Form/Input';
import RadioGroup from 'components/Base/Form/RadioGroup';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { setPurgeSlashing } from 'store/voting/slashing/actions';

import { CONTRACT_TYPES } from 'constants/contracts';
import formTypes from 'constants/form-types';
import { address, required } from 'func/validators';

function PurgeSlashing () {
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      address: '',
      contractType: CONTRACT_TYPES.rootNodes
    },
    validators: {
      address: [required, address],
      contractType: [required]
    },
    onSubmit: ({ address, contractType }) => {
      dispatch(setPurgeSlashing(address, contractType));
    }
  });

  useMetamaskReset(formTypes.purgeSlashing, form.reset);

  return (
    <form
      noValidate
      style={{ display: 'grid', gap: '15px' }}
      onSubmit={form.submit}
    >
      <RadioGroup
        {...form.fields.contractType}
        row
        label="Candidate type"
        name="contractType"
        options={[
          { value: CONTRACT_TYPES.rootNodes, label: 'Root Node' },
          { value: CONTRACT_TYPES.validators, label: 'Validator' },
        ]}
      />

      <Input
        {...form.fields.address}
        invertedColors
        label="Candidate address"
        placeholder="0x..."
      />

      <Button
        type="submit"
        style={{ width: '120px', marginTop: '10px' }}
      >
        Purge
      </Button>
    </form>
  );
}

export default PurgeSlashing;
