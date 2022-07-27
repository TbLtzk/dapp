import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { isNil } from 'lodash';
import Button from 'ui/Button';
import Input from 'ui/Input';
import Range from 'ui/Range';
import Tip from 'ui/Tip';

import { FormStep } from 'components/MultiStepForm';

import useForm from 'hooks/useForm';

import usePurgeSlashing from '../hooks/usePurgeSlashing';
import { useNewSlashingProposal } from '../NewSlashingProposal';

import { getRootMembers } from 'store/root-node/action-creators';
import { rootMembersSelector } from 'store/root-node/selectors';
import { getValidatorMembers } from 'store/validators/action-creators';
import { validatorsWidenedSelector } from 'store/validators/selectors';

import TABLE_TYPES from 'constants/tableTypes';
import { formatNumber } from 'func/formatters';
import { isAddress, trimAddress } from 'func/useful';
import { address, percent, required, url } from 'func/validators';

function DetailsStep () {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const validators = useSelector(validatorsWidenedSelector);
  const rootNodes = useSelector(rootMembersSelector);

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

  const { shouldPurge, purgeSlashing } = usePurgeSlashing(form.values.address, isRootType);

  useEffect(() => {
    dispatch(
      isRootType
        ? getRootMembers(TABLE_TYPES.rootNodesShort)
        : getValidatorMembers(TABLE_TYPES.validatorsWidened)
    );
  }, [dispatch, isRootType]);

  const getCurrentStake = () => {
    const validator = validators.find((v: any) => v.validator === form.values.address);
    const rootNode = rootNodes.find((r: any) => r.address === form.values.address);
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
          action={(
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
          {t('PURGE_SLASHING_DETAILS_TIP', {
            address: trimAddress(form.values.address)
          })}
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
        formatter={(value) => `${formatNumber(value, 4)} Q`}
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
