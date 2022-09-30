import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { Alias, AliasPurpose } from '@q-dev/q-js-sdk';

import Button from 'ui/Button';
import Input from 'ui/Input';
import Select from 'ui/Select';

import { useAliases } from 'store/aliases/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { address, required } from 'utils/validators';

function AliasForm ({ alias }: { alias: Alias | null }) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { setAlias } = useAliases();

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
      submitTransaction({
        successMessage: t('RESERVE_ALIAS_SUCCESS'),
        submitFn: () => setAlias({
          address: form.address,
          purpose: form.purpose as AliasPurpose,
        })
      });
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
