import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { AnimatePresence, motion } from 'framer-motion';
import Button from 'ui/Button';
import Icon, { IconName } from 'ui/Icon';
import Modal from 'ui/Modal';
import Spinner from 'ui/Spinner';
import { ToastType } from 'ui/Toast/Toast';

import useChangesListener from 'hooks/useChangesListener';

import ShowInExplorer from './components/ShowInExplorer';
import { TransactionModalContainer } from './styles';

import { getUserBalances, setClearTransaction, setTransactionLoadingComplete } from 'store/transaction-handler/actions';
import {
  errorMessageSelector,
  successMessageSelector,
  transactionHashSelector,
  transactionLoadingSelector,
} from 'store/transaction-handler/selectors';

export type TransactionType = ToastType | 'confirm' | 'loading';

const transactionTypeTitles = {
  info: 'INFORMATION',
  success: 'TRANSACTION_SUCCESS',
  error: 'TRANSACTION_REJECTED',
  loading: 'WAITING_FOR_CONFIRMATION',
  confirm: 'WAITING_FOR_SUCCESS',
};

const iconsNames = {
  error: 'cross',
  info: 'warning',
  success: 'double-check',
};

function TransactionModal () {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const alert = useAlert();

  const transactionError = useSelector(errorMessageSelector);
  const transactionSuccess = useSelector(successMessageSelector);
  const transactionHash = useSelector(transactionHashSelector);
  const transactionLoading = useSelector(transactionLoadingSelector);

  const [modalOpen, setModalOpen] = useState(false);

  const [hash, setHash] = useState('');
  const [transactionMessage, setTransactionMessage] = useState('');
  const [isUserCloseModal, setIsUserCloseModal] = useState(true);
  const [transactionType, setTransactionType] = useState<TransactionType>('loading');

  const handleTransaction = (type: ToastType, transaction: any) => {
    setTransactionMessage(transaction.message);
    setHash(transaction?.transactionHash);
    setTransactionType(type);
    if (isUserCloseModal) {
      alert[type](transaction.message);
    }
    dispatch(getUserBalances());
    dispatch(setClearTransaction());
  };

  const handleUserCloseModal = () => {
    setModalOpen(false);
    setIsUserCloseModal(true);
    dispatch(setTransactionLoadingComplete());
  };

  useChangesListener(transactionError, () => handleTransaction('error', transactionError));
  useChangesListener(transactionHash, () => setTransactionType('confirm'));
  useChangesListener(transactionSuccess, () => handleTransaction('success', transactionSuccess));

  useEffect(() => {
    if (transactionLoading) {
      setModalOpen(true);
      setTransactionMessage('');
      setIsUserCloseModal(false);
      setTransactionType('loading');
    }
  }, [transactionLoading]);

  const transactionContent = () => {
    switch (transactionType) {
      case 'loading': {
        return (
          <div className="transaction-loading centered">
            <Spinner size={160} thickness={4} />
            <p className="text-md break-word color-primary">{t('WAITING_FOR_A_TRANSACTION_TO_BE_CONFIRMED')}</p>
          </div>
        );
      }
      case 'confirm': {
        return (
          <>
            <Spinner size={110} thickness={4} />
            <div>
              <p className="text-xl break-word color-primary">{t('TRANSACTION_CONFIRMED')}</p>
              <span>{t('WAITING_FOR_SUCCESS')}</span>
              <ShowInExplorer hash={transactionHash ?? ''} />
            </div>
          </>
        );
      }
      default: {
        return (
          <>
            <div>
              <Icon name={iconsNames[transactionType] as IconName} />
              <p className="text-xl break-word color-primary">{transactionMessage}</p>
              {transactionType === 'success' && <ShowInExplorer hash={hash} />}
            </div>
            <Button style={{ width: '100%' }} onClick={handleUserCloseModal}>
              {t('CLOSE')}
            </Button>
          </>
        );
      }
    }
  };

  return (
    <Modal
      title={t(transactionTypeTitles[transactionType])}
      open={modalOpen}
      onClose={handleUserCloseModal}
    >
      <TransactionModalContainer transactionType={transactionType}>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={transactionType}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="centered"
          >
            {transactionContent()}
          </motion.div>
        </AnimatePresence>
      </TransactionModalContainer>
    </Modal>
  );
}

export default TransactionModal;
