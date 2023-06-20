import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ContractTransaction } from 'ethers';
import { ErrorHandler, getErrorMessage } from 'helpers';
import { t } from 'i18next';
import uniqueId from 'lodash/uniqueId';

import { setTransactions, Transaction, TransactionEditableParams } from './reducer';

import { getState, useAppSelector } from 'store';
import { useQVault } from 'store/q-vault/hooks';

import { Bus } from 'utils/event-bus';

interface TxWithCaller {
  tx: ContractTransaction;
  onSuccess: () => void;
  onFinally?: () => void;
}

export type SubmitTransactionFn = () => Promise<ContractTransaction | TxWithCaller | void | undefined>;

export function useTransaction () {
  const dispatch = useDispatch();
  const { loadAllBalances } = useQVault();

  const pendingTransactions = useAppSelector(({ transaction }) => {
    return transaction.transactions.filter((item: Transaction) =>
      item.status === 'sending' || item.status === 'waitingConfirmation');
  });

  const transactions = useAppSelector(({ transaction }) => transaction.transactions);

  async function submitTransaction ({
    submitFn,
    successMessage,
    isClosedModal = false,
    onSuccess = () => {},
    onConfirm = () => {},
    onError = () => {},
  }: {
    submitFn: SubmitTransactionFn;
    successMessage?: string;
    isClosedModal?: boolean;
    onSuccess?: () => void;
    onConfirm?: () => void;
    onError?: (error?: unknown) => void;
  }) {
    let onFinally: undefined | (() => void);
    const transaction: Transaction = {
      id: uniqueId(),
      isClosedModal,
      message: successMessage || t('DEFAULT_MESSAGE_TX'),
      status: 'waitingConfirmation',
    };

    const { transactions } = getState().transaction;
    dispatch(setTransactions([{ ...transaction }, ...transactions]));

    try {
      const submitResponse = await submitFn();

      if (submitResponse) {
        const tx = (submitResponse as TxWithCaller)?.tx || submitResponse;

        updateTransaction(transaction.id, { hash: tx.hash, status: 'sending' });
        onConfirm();
        await tx.wait();
        if ('onSuccess' in submitResponse && typeof submitResponse.onSuccess === 'function') {
          submitResponse.onSuccess();
        }
        if ('onFinally' in submitResponse && typeof submitResponse.onFinally === 'function') {
          onFinally = submitResponse.onFinally;
        }
      }
      updateTransaction(transaction.id, { status: 'success' });
      onSuccess();

      const currTx = getTxById(transaction.id);
      if (currTx?.isClosedModal) {
        Bus.success(currTx.message);
      }
    } catch (error) {
      getTxById(transaction.id)?.isClosedModal
        ? ErrorHandler.process(error)
        : ErrorHandler.processWithoutFeedback(error);

      onError(error);
      updateTransaction(transaction.id, { status: 'error', message: getErrorMessage(error) });

      await loadAllBalances();
    }

    onFinally?.();
  }

  const getTxById = (id: string) => {
    const { transactions } = getState().transaction;
    return transactions.find((tx: Transaction) => tx.id === id);
  };

  const updateTransaction = (id: string, params: TransactionEditableParams) => {
    const { transactions } = getState().transaction;
    const txIndex = transactions.findIndex((tx: Transaction) => tx.id === id);
    if (txIndex === -1) return;
    const newTxs = [...transactions];
    newTxs[txIndex] = { ...newTxs[txIndex], ...params };
    dispatch(setTransactions(newTxs));
  };

  return {
    pendingTransactions,
    transactions,
    submitTransaction: useCallback(submitTransaction, []),
    updateTransaction: useCallback(updateTransaction, []),
  };
}
