import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Alias, AliasPurpose } from '@q-dev/q-js-sdk';
import Button from 'ui/Button';
import Input from 'ui/Input';
import Select from 'ui/Select';

import useForm from 'hooks/useForm';

import { setAlias } from 'store/account-aliases/action-creators';

import { address, required } from 'func/validators';

function AliasForm ({ alias }: { alias: Alias | null }) {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      address: alias?.address || '',
      purpose: alias?.purpose || '',
    },
    validators: {
      address: [required, address],
      purpose: [required]
    },
    onSubmit: (form) => {
      dispatch(setAlias(form, t('UPDATE_ALIAS_SUCCESS')));
    }
  });

  return (
    <form
      noValidate
      style={{ display: 'grid', gap: '16px' }}
      onSubmit={form.submit}
    >
      <Select
        {...form.fields.purpose}
        options={Object.entries(AliasPurpose).map(([label, value]) => ({ value, label }))}
        defaultValue={AliasPurpose.BLOCK_SEALING}
        label={t('ROLE')}
      />

      <Input
        {...form.fields.address}
        label={t('ADDRESS')}
        placeholder="0x..."
      />

      <Button
        type="submit"
        disabled={!form.isValid}
        style={{ marginTop: '8px', width: '100%' }}
      >
        {t('UPDATE')}
      </Button>
    </form>
  );
}

export default AliasForm;
