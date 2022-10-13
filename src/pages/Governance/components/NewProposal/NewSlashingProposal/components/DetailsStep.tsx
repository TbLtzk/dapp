import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Range, Tip } from '@q-dev/q-ui-kit';
import { isNil } from 'lodash';

import Button from 'components/Button';
import Input from 'components/Input';
import { FormStep } from 'components/MultiStepForm';

import useForm from 'hooks/useForm';

import usePurgeSlashing from '../hooks/usePurgeSlashing';
import { useNewSlashingProposal } from '../NewSlashingProposal';

import { useRootNodes } from 'store/root-nodes/hooks';
import { useValidators } from 'store/validators/hooks';

import { formatAsset } from 'utils/numbers';
import { isAddress, trimAddress } from 'utils/strings';
import { address, percent, required, url } from 'utils/validators';

function DetailsStep () {
  const { t } = useTranslation();
  const { validatorStats, loadValidatorStats } = useValidators();
  const { rootMembers, getRootMembers } = useRootNodes();

  const { values, goNext, goBack, onChange } = useNewSlashingProposal();
  const form = useForm({
    initialValues: {
      address: '',
      percent: '',
      externalLink: '',
    },
    validators: {
      address: [required, address],
      percent: [required, percent],
      externalLink: [required, url],
    },
    onSubmit: goNext,
  });

  const isRootType = values.type === 'root-slashing';
  const memberError = isRootType ? 'Not a root node' : 'Not a validator';

  const { shouldPurge, hasActiveProposal, purgeSlashing } = usePurgeSlashing(form.values.address, isRootType);

  useEffect(() => {
    if (isRootType) {
      getRootMembers();
    } else {
      loadValidatorStats();
    }
  }, [isRootType]);

  const getCurrentStake = () => {
    const validator = validatorStats.find(v => v.address === form.values.address);
    const rootNode = rootMembers.find(r => r.address === form.values.address);
    return isRootType ? rootNode?.stakeAmount : validator?.selfStake;
  };

  const stake = useMemo(() => {
    if (isAddress(form.values.address)) {
      const stake = getCurrentStake();
      form.fields.percent.onChange('0');
      form.setError('address', isNil(stake) ? memberError : '');
      return stake;
    }
  }, [form.values.address]);

  const handleAmountChange = (val: string, amount: string) => {
    form.fields.percent.onChange(val);
    onChange({ amount });
  };

  return (
    <FormStep
      disabled={!form.isValid || shouldPurge}
      onNext={form.submit}
      onBack={goBack}
    >
      {shouldPurge && (
        <Tip
          type="warning"
          action={!hasActiveProposal && (
            <Button
              compact
              type="button"
              look="danger"
              onClick={purgeSlashing}
            >
              {t('PURGE_SLASHING')}
            </Button>
          )}
        >
          {hasActiveProposal
            ? t('SLASHING_PROPOSAL_ALREADY_EXISTS', { address: trimAddress(form.values.address) })
            : t('PURGE_SLASHING_DETAILS_TIP', { address: trimAddress(form.values.address) })
          }
        </Tip>
      )}

      <Input
        {...form.fields.address}
        label={t('CANDIDATE_TO_SLASH')}
        placeholder={t('ADDRESS_PLACEHOLDER')}
        error={form.errors.address || (shouldPurge ? ' ' : '')}
      />

      <Range
        {...form.fields.percent}
        label={t('AMOUNT_TO_SLASH')}
        max={String(stake || '0')}
        formatter={(value) => formatAsset(value, 'Q')}
        disabled={isNil(stake)}
        onChange={handleAmountChange}
      />

      <Input
        {...form.fields.externalLink}
        label={t('REFERENCE_LINK_TO_EXTERNAL_SOURCE')}
        placeholder={t('LINK')}
      />
    </FormStep>
  );
}

export default DetailsStep;
