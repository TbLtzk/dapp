import { useTranslation } from 'react-i18next';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Button from 'ui/Button';
import Input from 'ui/Input';
import Tip from 'ui/Tip';

import useForm from 'hooks/useForm';

import { useAliases, useAliasEvents } from 'store/aliases/hooks';
import { useTransaction } from 'store/transaction/hooks';
import { useUser } from 'store/user/hooks';

import { ZERO_ADDRESS } from 'constants/boundaries';
import { address, required } from 'utils/validators';

function ReserveForm () {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const user = useUser();

  const { reserveAlias } = useAliases();
  const { events } = useAliasEvents();

  const reserveEvent = events
    .find((item) => item.alias === user.address && item.event === 'Reserved');
  const reservedAddress = reserveEvent?.address || ZERO_ADDRESS;

  const form = useForm({
    initialValues: { address: '' },
    validators: { address: [required, address] },
    onSubmit: (form) => {
      submitTransaction({
        successMessage: t('RESERVE_ALIAS_SUCCESS'),
        submitFn: () => reserveAlias(form.address)
      });
    },
  });

  const unreserveAlias = () => {
    submitTransaction({
      successMessage: t('UNRESERVE_ALIAS_SUCCESS'),
      submitFn: () => reserveAlias(ZERO_ADDRESS)
    });
  };

  return (
    <form
      noValidate
      style={{ display: 'grid', gap: '24px' }}
      onSubmit={form.submit}
    >
      {reservedAddress !== ZERO_ADDRESS && (
        <Tip
          compact
          action={<Button compact onClick={unreserveAlias}>{t('UNRESERVE')}</Button>}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            <span>{t('ALIAS_IS_RESERVED_FOR_ACCOUNT')}</span>
            <ExplorerAddress
              short
              iconed
              semibold
              address={reservedAddress}
            />
          </div>
        </Tip>
      )}

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
