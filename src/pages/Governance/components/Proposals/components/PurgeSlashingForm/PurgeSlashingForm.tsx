import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Button from 'ui/Button';
import Input from 'ui/Input';
import RadioGroup from 'ui/RadioGroup';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';

import { StyledPurgeSlashingForm } from './styles';

import { setPurgeSlashing } from 'store/voting/slashing/actions';

import { CONTRACT_TYPES } from 'constants/contracts';
import formTypes from 'constants/form-types';
import { address, required } from 'func/validators';

function PurgeSlashingForm ({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
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
      dispatch(setPurgeSlashing(address, contractType, t('PURGE_SUCCESS')));
    }
  });

  useMetamaskReset(formTypes.purgeSlashing, onClose);

  return (
    <StyledPurgeSlashingForm
      noValidate
      onSubmit={form.submit}
    >
      <RadioGroup
        {...form.fields.contractType}
        label={t('CANDIDATE_TYPE')}
        name="contractType"
        options={[
          { value: CONTRACT_TYPES.rootNodes, label: t('ROOT_NODE') },
          { value: CONTRACT_TYPES.validators, label: t('VALIDATOR') },
        ]}
      />

      <Input
        {...form.fields.address}
        label={t('CANDIDATE_ADDRESS')}
        placeholder="0x..."
      />

      <Button
        type="submit"
        className="purge-slashing-submit"
        disabled={!form.isValid}
      >
        {t('PURGE')}
      </Button>
    </StyledPurgeSlashingForm>
  );
}

export default PurgeSlashingForm;
