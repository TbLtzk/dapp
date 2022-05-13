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
              style={{ margin: '0 20px 0 0' }}
              onClick={() => handleAddToken(qusdToken)}
            >
              Add QUSD token
            </Button>
          )}
          {!qbtcTokenAdded && (
            <Button
              style={{ margin: '0 20px 0 0' }}
              onClick={() => handleAddToken(qbtcToken)}
            >
              Add QBTC token
            </Button>
          )}
        </>
      )}
      <Button onClick={createVault}>
        <i className="mdi mdi-plus-circle-outline" />
        <span>Create QBTC Vault</span>
      </Button>
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
