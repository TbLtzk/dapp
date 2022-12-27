import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';

import { AnimatePresence, motion } from 'framer-motion';
import { includes } from 'lodash';
import styled from 'styled-components';

import Button from 'ui/Button';
import Icon from 'ui/Icon';
import Modal from 'ui/Modal';
import Spinner from 'ui/Spinner';
import { getToastColor } from 'ui/Toast/colors';
import { ToastType, toastTypes } from 'ui/Toast/Toast';

import TxHashLink from './TxHashLink';

import { useQVault } from 'store/q-vault/hooks';
import { useTransaction } from 'store/transaction/hooks';
import { PendingTransaction } from 'store/transaction/reducer';

import { eventBus, getTxEventName } from 'utils/event-bus';

export type TxState = 'loading' | 'hash' | 'success' | 'error';

const TransactionModalContainer = styled.div<{ txState: TxState }>`
  display: flex;
  height: 250px;
  width: 100%;
  padding-top: ${({ txState }) => (txState === 'error' ? '30px' : '10px')};

  .tx-loading {
    margin-top: 10px;
    height: 100%;
  }

  .tx-text {
    padding-top: 10px;
  }

  .tx-centered {
    text-align: center;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
  }

  .tx-icon {
    color: ${({ theme, txState }) =>
      includes(toastTypes, txState) && getToastColor(theme, txState as ToastType)};
    font-size: 70px;
  }
`;

interface Props {
  transaction: PendingTransaction;
}

function TransactionModal ({ transaction }: Props) {
  const { t } = useTranslation();
  const alert = useAlert();

  const { removeTransaction } = useTransaction();
  const { loadAllBalances } = useQVault();

  const [modalOpen, setModalOpen] = useState(false);
  const [txState, setTxState] = useState<TxState>('loading');
  const [txHash, setTxHash] = useState('');
  const [txMessage, setTxMessage] = useState('');

  useEffect(() => {
    if (!transaction.hideLoading) {
      setModalOpen(true);
    }
  }, [transaction]);

  useEffect(() => {
    const txId = transaction.id;
    eventBus.once(getTxEventName(txId, 'hash'), handleHash);
    eventBus.once(getTxEventName(txId, 'success'), (message) => handleType('success', message));
    eventBus.once(getTxEventName(txId, 'error'), (message) => handleType('error', message));

    return () => {
      eventBus.off(getTxEventName(txId, 'hash'));
      eventBus.off(getTxEventName(txId, 'success'));
      eventBus.off(getTxEventName(txId, 'error'));
    };
  }, [transaction, modalOpen]);

  const handleHash = (hash: string) => {
    setTxState('hash');
    setTxHash(hash);
  };

  const handleType = async (type: 'success' | 'error', message: string) => {
    setTxState(type);
    setTxMessage(message);

    if (!modalOpen) {
      alert[type](message);
      removeTransaction(transaction.id);
    }

    await loadAllBalances();
  };

  const handleClose = () => {
    setModalOpen(false);
    if (txState === 'success' || txState === 'error') {
      setTimeout(() => removeTransaction(transaction.id), 300);
    }
  };

  const txStateTitles: Record<TxState, string> = {
    loading: t('WAITING_FOR_CONFIRMATION'),
    hash: t('WAITING_FOR_SUCCESS'),
    success: t('TRANSACTION_SUCCESS'),
    error: t('TRANSACTION_REJECTED'),
  };

  return (
    <Modal
      title={txStateTitles[txState]}
      open={modalOpen}
      onClose={handleClose}
    >
      <TransactionModalContainer txState={txState}>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={txState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="tx-centered"
          >
            {txState === 'loading' && (
              <div className="tx-loading tx-centered">
                <Spinner size={160} thickness={4} />
                <p className="text-md break-word color-primary tx-text">
                  {t('WAITING_FOR_A_TRANSACTION_TO_BE_CONFIRMED')}
                </p>
              </div>
            )}

            {txState === 'hash' && (
              <>
                <Spinner size={110} thickness={4} />
                <div>
                  <p className="text-xl break-word color-primary tx-text">
                    {t('TRANSACTION_CONFIRMED')}
                  </p>
                  <span>{t('WAITING_FOR_SUCCESS')}</span>
                  <TxHashLink hash={txHash} />
                </div>
              </>
            )}

            {(txState === 'success' || txState === 'error') && (
              <>
                <div>
                  <Icon name={txState === 'success' ? 'double-check' : 'cross'} className="tx-icon" />
                  <p className="text-xl break-word color-primary tx-text">{txMessage}</p>
                  {txState === 'success' && <TxHashLink hash={txHash} />}
                </div>
                <Button style={{ width: '100%' }} onClick={handleClose}>
                  {t('CLOSE')}
                </Button>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </TransactionModalContainer>
    </Modal>
  );
}

export default TransactionModal;
