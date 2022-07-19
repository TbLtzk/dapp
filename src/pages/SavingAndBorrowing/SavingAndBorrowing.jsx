import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';
import Icon from 'ui/Icon';

import PageWrap from 'components/Base/PageWrap';

import BorrowCryptoAssets from './components/BorrowCryptoAssets';
import Overview from './components/Overview';
import SavingCryptoAssets from './components/SavingCryptoAssets';

import { setCreateQBTCVault } from 'store/borrowing-core/action-creators';
import { setTransactionLoadingError } from 'store/transaction-handler/action-creators';
import { loadTypeSelector } from 'store/user-inf/selectors';

import { addQBTCToken, addQUSDToken } from 'contracts/helpers/borrowing-core-helper';

import { LOAD_TYPES } from 'constants/statuses';

function SavingAndBorrowing () {
  const { t } = useTranslation();
  const METAMASK_MESSAGE = { header: t('METAMASK_IS_WAITING'), details: t('PLEASE_REFRESH_PAGE_AFTER_SUBMIT') };

  const dispatch = useDispatch();
  const loadType = useSelector(loadTypeSelector);

  const [qusdTokenAdded, setQusdTokenAdded] = useState(localStorage.getItem('qusdTokenAdded'));
  const [qbtcTokenAdded, setQbtcTokenAdded] = useState(localStorage.getItem('qbtcTokenAdded'));

  function createVault () {
    dispatch(setCreateQBTCVault());
  }

  function handleAddToken (type) {
    switch (type) {
      case 'qbtcToken': {
        addQBTCToken(setQbtcTokenAdded);
        break;
      }
      case 'qusdToken':
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
            <Button style={{ margin: '0 16px 0 0' }} onClick={() => handleAddToken('qusdToken')}>
              {t('ADD_QUSD_TOKEN')}
            </Button>
          )}
          {!qbtcTokenAdded && (
            <Button style={{ margin: '0 16px 0 0' }} onClick={() => handleAddToken('qbtcToken')}>
              {t('ADD_QBTC_TOKEN')}
            </Button>
          )}
        </>
      )}
      <Button onClick={createVault}>
        <Icon name="add" />
        <span>{t('CREATE_QBTC_VAULT')}</span>
      </Button>
    </>
  );

  return (
    <PageWrap
      wrapContentClasses="wrap-content__column-2-1"
      pageHeader={t('SAVING_BORROWING')}
      pageButton={buttons}
    >
      <div style={{ display: 'grid', gap: '16px' }}>
        <SavingCryptoAssets />
        <BorrowCryptoAssets />
      </div>
      <Overview />
    </PageWrap>
  );
}

export default SavingAndBorrowing;
