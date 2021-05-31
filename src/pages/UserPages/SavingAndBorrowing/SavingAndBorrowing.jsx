import React from 'react';
import PageWrap from 'components/Base/PageWrap';
import Button from 'components/Base/Buttons/Button';
import Overview from './components/Overview';
import SavingCryptoAssets from './components/SavingCryptoAssets';
import BorrowCryptoAssets from './components/BorrowCryptoAssets';

import { BorrowingCoreQUSD } from 'contracts/src/BorrowingCore';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { useSelector } from 'react-redux';

function SavingAndBorrowing() {
  const address = useSelector(userAddressMetamask);

  const createVault = (collateral) => {
    const contract = new BorrowingCoreQUSD(contractsToAddresses['BorrowingCoreQUSD']);
    contract.createVault(address, collateral);
  };

  return (
    <PageWrap
      wrapContentClasses={'wrap-content__column-2-1'}
      headerTitle={'Saving and Borrowing'}
      headerExtra={(
        <Button
          icon="plus-circle-outline"
          handleButton={() => createVault('QBTC')}
          title="Create QBTC vault"
        />
      )}
    >
      <div>
        <SavingCryptoAssets/>
        <BorrowCryptoAssets/>
      </div>
      <Overview/>
    </PageWrap>
  );
}

export default SavingAndBorrowing;
