import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Button from 'ui/Button';
import Input from 'ui/Input';
import Tip from 'ui/Tip';

import useForm from 'hooks/useForm';

import { reserveAlias } from 'store/account-aliases/action-creators';
import { aliasEventsSelector } from 'store/account-aliases/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { ZERO_ADDRESS } from 'constants/boundaries';
import { address, required } from 'utils/validators';

function ReserveForm () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const userAddress = useSelector(userAddressMetamask);
  const aliasEvents = useSelector(aliasEventsSelector);

  const reserveEvent = (aliasEvents as any[])
    .find((item) => item.alias === userAddress && item.event === 'Reserved');
  const reservedAddress = reserveEvent?.address || ZERO_ADDRESS;

  const form = useForm({
    initialValues: { address: '' },
    validators: { address: [required, address] },
    onSubmit: (form) => {
      dispatch(reserveAlias(form.address, t('RESERVE_ALIAS_SUCCESS')));
    },
  });

  const unreserveAlias = () => {
    dispatch(reserveAlias(ZERO_ADDRESS, t('UNRESERVE_ALIAS_SUCCESS')));
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
