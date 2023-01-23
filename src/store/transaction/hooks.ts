import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { SubmitTransactionResponse } from '@q-dev/q-js-sdk';
import { t } from 'i18next';
import uniqueId from 'lodash/uniqueId';

import { PendingTransaction, setPendingTransactions } from './reducer';

import { getState, useAppSelector } from 'store';

import { captureError } from 'utils/errors';
import { eventBus, getTxEventName } from 'utils/event-bus';

export function useTransaction () {
  const dispatch = useDispatch();

  const pendingTransactions = useAppSelector(({ transaction }) => transaction.pendingTransactions);

  async function submitTransaction ({
    submitFn,
    successMessage,
    hideLoading = false,
    onSuccess = () => {},
    onError = () => {},
  }: {
    submitFn: () => Promise<SubmitTransactionResponse | void | undefined>;
    successMessage?: string;
    hideLoading?: boolean;
    onSuccess?: () => void;
    onError?: (error?: unknown) => void;
  }) {
    const transaction: PendingTransaction = {
      id: uniqueId(),
      hideLoading,
      title: successMessage || t('TRANSACTION_SUCCESS')
    };

    const { pendingTransactions } = getState().transaction;
    dispatch(setPendingTransactions([...pendingTransactions, transaction]));

    try {
      const submitResponse = await submitFn();

      if (submitResponse?.promiEvent) {
        submitResponse.promiEvent
          .once('transactionHash', (txHash: string) => {
            eventBus.emit(getTxEventName(transaction.id, 'hash'), txHash);
          });

        await submitResponse.promiEvent;
      }

      onSuccess();

      eventBus.emit(getTxEventName(transaction.id, 'success'), transaction.title);
    } catch (error) {
      captureError(error);
      onError(error);
      eventBus.emit(getTxEventName(transaction.id, 'error'), getErrorMessage(error));
    }
  }

  const removeTransaction = (id: string) => {
    const { pendingTransactions } = getState().transaction;
    dispatch(setPendingTransactions(pendingTransactions.filter(tx => tx.id !== id)));
  };

  return {
    pendingTransactions,
    submitTransaction: useCallback(submitTransaction, []),
    removeTransaction: useCallback(removeTransaction, []),
  };
}

function getErrorMessage (err: unknown): string {
  const error = err as {
    message: string;
    code?: number;
    stack?: string;
  };

  if (error.code === 4001) {
    return t('ERROR_TRANSACTION_REJECTED');
  }

  if (!error.message?.includes('Internal JSON-RPC error')) {
    if (error.message?.includes('Transaction has been reverted by the EVM')) {
      return t('ERROR_TRANSACTION_REVERTED_BY_EVM');
    }

    return error.message || t('ERROR_UNKNOWN');
  }

  if (error.message === 'execution reverted') {
    return t('ERROR_TRANSACTION_REVERTED');
  }

  const rpcErrorCode = error.message.match(/\[.+-(.+)\]/)?.at(1);
  return rpcErrorCode
    ? t(`ERROR_${rpcErrorCode}`)
    : t('ERROR_RPC_UNKNOWN');
}
