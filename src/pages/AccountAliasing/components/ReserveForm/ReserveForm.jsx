import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import Button from 'ui/Button';
import Input from 'ui/Input';

import useForm from 'hooks/useForm';

import { reserveAlias } from 'store/account-aliases/action-creators';

import { address, required } from 'func/validators';

function ReserveForm () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: { address: '' },
    validators: { address: [required, address] },
    onSubmit: (form) => {
      dispatch(reserveAlias(form.address));
    }
  });

  return (
    <form
      noValidate
      style={{ display: 'grid', gap: '24px' }}
      onSubmit={form.submit}
    >
      <Input
        {...form.fields.address}
        label={t('MAIN_ACCOUNT_ADDRESS')}
        placeholder="0x..."
      />

      <Button
        type="submit"
        disabled={!form.isValid}
        style={{ width: '100%' }}
      >
        {t('RESERVE_ALIAS')}
      </Button>
    </form>
  );
}

export default ReserveForm;
