import { useTranslation } from 'react-i18next';

import Button from 'components/Button';
import { useSlashingActions } from 'pages/Governance/hooks/useSlashingActions';
import Input from 'ui/Input';
import RadioGroup from 'ui/RadioGroup';

import useForm from 'hooks/useForm';

import { StyledPurgeSlashingForm } from './styles';

import { useTransaction } from 'store/transaction/hooks';

import { CONTRACT_TYPES } from 'constants/contracts';
import { address, required } from 'utils/validators';

function PurgeSlashingForm ({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();

  const form = useForm({
    initialValues: {
      address: '',
      contractType: CONTRACT_TYPES.rootNodes
    },
    validators: {
      address: [required, address],
      contractType: [required]
    },
    onSubmit: ({ address }) => {
      submitTransaction({
        successMessage: t('PURGE_SUCCESS'),
        submitFn: () => purgeSlashing(address),
        onSuccess: () => onClose(),
      });
    }
  });

  const { purgeSlashing } = useSlashingActions(form.values.contractType === CONTRACT_TYPES.rootNodes);

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
