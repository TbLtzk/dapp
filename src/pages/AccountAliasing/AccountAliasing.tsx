import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Alias } from '@q-dev/q-js-sdk';
import { Modal } from '@q-dev/q-ui-kit';
import { trimString } from '@q-dev/utils';
import { useWeb3Context } from 'context/Web3ContextProvider';

import Button from 'components/Button';
import PageLayout from 'components/PageLayout';

import AddressForm from './components/AddressForm';
import AliasesTable from './components/AliasesTable';
import AliasEventsTable from './components/AliasEventsTable';
import AliasForm from './components/AliasForm';
import ReserveForm from './components/ReserveForm';

import { useAliases, useAliasEvents } from 'store/aliases/hooks';
import { useTransaction } from 'store/transaction/hooks';

function AccountAliasing () {
  const { t } = useTranslation();
  const { loadAliases } = useAliases();
  const { loadAliasEvents } = useAliasEvents();
  const { address } = useWeb3Context();
  const { pendingTransactions } = useTransaction();

  const [currentAddress, setCurrentAddress] = useState(address);
  const [selectedAlias, setSelectedAlias] = useState<Alias | null>(null);
  const [isReserveModalShown, setIsReserveModalShown] = useState(false);

  const init = (address: string) => {
    loadAliases(address);
    loadAliasEvents();
  };

  const refreshAddress = (address: string) => {
    setCurrentAddress(address);
    init(address);
  };

  useEffect(() => {
    init(currentAddress);
  }, []);

  useEffect(() => {
    if (pendingTransactions.length) return;

    setSelectedAlias(null);
    setIsReserveModalShown(false);
    init(currentAddress);
  }, [pendingTransactions.length]);

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
        tip={t('RESERVE_YOUR_CURRENT_ADDRESS', { address: trimString(address) })}
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
