import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Alias } from '@q-dev/q-js-sdk';

import PageLayout from 'components/PageLayout';
import Button from 'ui/Button';
import Modal from 'ui/Modal';

import AddressForm from './components/AddressForm';
import AliasesTable from './components/AliasesTable';
import AliasEventsTable from './components/AliasEventsTable';
import AliasForm from './components/AliasForm';
import ReserveForm from './components/ReserveForm';

import { getAliases, getAliasEvents } from 'store/account-aliases/action-creators';
import { successMessageSelector } from 'store/transaction-handler/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { trimAddress } from 'utils/strings';

function AccountAliasing () {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);
  const successMessage = useSelector(successMessageSelector);

  const [currentAddress, setCurrentAddress] = useState(userAddress);
  const [selectedAlias, setSelectedAlias] = useState<Alias | null>(null);
  const [isReserveModalShown, setIsReserveModalShown] = useState(false);

  const loadAliases = (address: string) => {
    dispatch(getAliases(address));
    dispatch(getAliasEvents(address));
  };

  const refreshAddress = (address: string) => {
    setCurrentAddress(address);
    loadAliases(address);
  };

  useEffect(() => {
    loadAliases(currentAddress);
  }, []);

  useEffect(() => {
    if (!successMessage) return;

    setSelectedAlias(null);
    setIsReserveModalShown(false);
    loadAliases(currentAddress);
  }, [successMessage]);

  return (
    <PageLayout
      title={t('ACCOUNT_ALIASING')}
      action={
        <Button onClick={() => setIsReserveModalShown(true)}>
          <i className="mdi mdi-archive-lock" />
          <span>{t('RESERVE_ALIAS')}</span>
        </Button>
      }
    >
      <AddressForm selectedAddress={currentAddress} onSubmit={refreshAddress} />

      <Modal
        open={selectedAlias !== null}
        title={t('UPDATE_ALIAS')}
        width={440}
        onClose={() => setSelectedAlias(null)}
      >
        <AliasForm alias={selectedAlias} />
      </Modal>

      <Modal
        open={isReserveModalShown}
        title={t('RESERVE_ALIAS')}
        tip={t('RESERVE_YOUR_CURRENT_ADDRESS', { address: trimAddress(userAddress) })}
        width={440}
        onClose={() => setIsReserveModalShown(false)}
      >
        <ReserveForm />
      </Modal>

      <AliasesTable address={currentAddress} onSelect={(alias) => setSelectedAlias(alias)} />
      <AliasEventsTable address={currentAddress} />
    </PageLayout>
  );
}

export default AccountAliasing;
