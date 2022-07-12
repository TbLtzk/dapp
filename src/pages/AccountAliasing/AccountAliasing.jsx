import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Modal from 'ui/Modal';

import PageWrap from 'components/Base/PageWrap';

import AddressForm from './components/AddressForm';
import AliasesTable from './components/AliasesTable';
import AliasEventsTable from './components/AliasEventsTable';
import AliasForm from './components/AliasForm';
import ReserveForm from './components/ReserveForm';

import { getAliases, getAliasEvents } from 'store/account-aliases/action-creators';
import { successMessageSelector } from 'store/transaction-handler/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { trimAddress } from 'func/useful';

function AccountAliasing () {
  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);
  const successMessage = useSelector(successMessageSelector);

  const [currentAddress, setCurrentAddress] = useState(userAddress);
  const [selectedAlias, setSelectedAlias] = useState(null);
  const [isReserveModalShown, setIsReserveModalShown] = useState(false);

  const loadAliases = (address) => {
    dispatch(getAliases(address));
    dispatch(getAliasEvents(address));
  };

  const refreshAddress = (address) => {
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
    <PageWrap
      pageHeader="Account Aliasing"
      pageButton={(
        <Button onClick={() => setIsReserveModalShown(true)}>
          <i className="mdi mdi-archive-lock" />
          <span>Reserve alias</span>
        </Button>
      )}
    >
      <AddressForm
        selectedAddress={currentAddress}
        onSubmit={refreshAddress}
      />

      <Modal
        open={selectedAlias !== null}
        title="Update alias"
        width={440}
        onClose={() => setSelectedAlias(null)}
      >
        <AliasForm alias={selectedAlias || {}} />
      </Modal>

      <Modal
        open={isReserveModalShown}
        title="Reserve alias"
        tip={`You can reserve your current address (${trimAddress(userAddress)}) as an alias for some main account`}
        width={440}
        onClose={() => setIsReserveModalShown(false)}
      >
        <ReserveForm address={currentAddress} />
      </Modal>

      <AliasesTable
        address={currentAddress}
        onSelect={alias => setSelectedAlias(alias)}
      />
      <AliasEventsTable address={currentAddress} />
    </PageWrap>
  );
}

export default AccountAliasing;
