import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import PageWrap from 'components/Base/PageWrap';

import BorrowCryptoAssets from './components/BorrowCryptoAssets';
import Overview from './components/Overview';
import SavingCryptoAssets from './components/SavingCryptoAssets';

import { setCreateQBTCVault } from 'store/borrowing-core/action-creators';
import { setTransactionLoadingError } from 'store/transaction-handler/action-creators';
import { loadTypeSelector } from 'store/user-inf/selectors';

import { addQBTCToken, addQUSDToken } from 'contracts/helpers/borrowing-core-helper';

import { LOAD_TYPES } from 'constants/statuses';
import { qbtcToken, qusdToken } from 'constants/tokenTypes';

const METAMASK_MESSAGE = { header: 'Metamask is waiting', details: 'Please, refresh page after submit' };

function SavingAndBorrowing () {
  const dispatch = useDispatch();
  const loadType = useSelector(loadTypeSelector);

  const [qusdTokenAdded, setQusdTokenAdded] = useState(localStorage.getItem('qusdTokenAdded'));
  const [qbtcTokenAdded, setQbtcTokenAdded] = useState(localStorage.getItem('qbtcTokenAdded'));

  function createVault () {
    dispatch(setCreateQBTCVault());
  }

  function handleAddToken (type) {
    switch (type) {
      case qbtcToken: {
        addQBTCToken(setQbtcTokenAdded);
        break;
      }
      case qusdToken:
      default: {
        addQUSDToken(setQusdTokenAdded);
      }
    }
    dispatch(setTransactionLoadingError(METAMASK_MESSAGE));
  }

  const buttons = (
    <>
      {loadType === LOAD_TYPES.loaded && (
        <>
          {!qusdTokenAdded && (
            <Button
              title="Add QUSD token"
              margin="0 20px 0 0"
              handleButton={() => handleAddToken(qusdToken)}
            />
          )}
          {!qbtcTokenAdded && (
            <Button
              title="Add QBTC token"
              margin="0 20px 0 0"
              handleButton={() => handleAddToken(qbtcToken)}
            />
          )}
        </>
      )}
      <Button
        icon="plus-circle-outline"
        handleButton={createVault}
        title="Create QBTC Vault"
      />
    </>
  );
  return (
    <PageWrap
      wrapContentClasses="wrap-content__column-2-1"
      headerTitle="Saving & Borrowing"
      headerExtra={buttons}
    >
      <div>
        <SavingCryptoAssets />
        <BorrowCryptoAssets />
      </div>
      <Overview />
    </PageWrap>
  );
}

export default SavingAndBorrowing;
