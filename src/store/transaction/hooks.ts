import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { SubmitTransactionResponse } from '@q-dev/q-js-sdk';
import { t } from 'i18next';
import { TransactionReceipt } from 'web3-eth';

import { reset, setErrorMessage, setHash, setLoading, setSuccessMessage } from './reducer';

import { useAppSelector } from 'store';

import { captureError } from 'utils/errors';

export function useTransaction () {
  const dispatch = useDispatch();

  const transactionLoading = useAppSelector(({ transaction }) => transaction.isLoading);
  const transactionHash = useAppSelector(({ transaction }) => transaction.hash);
  const successMessage = useAppSelector(({ transaction }) => transaction.successMessage);
  const errorMessage = useAppSelector(({ transaction }) => transaction.errorMessage);

  async function submitTransaction ({
    submitFn,
    successMessage,
    hideLoading = false,
    onSuccess = () => {},
    onError = () => {},
  }: {
    submitFn: () => Promise<SubmitTransactionResponse | undefined>;
    successMessage?: string;
    hideLoading?: boolean;
    onSuccess?: () => void;
    onError?: (error?: unknown) => void;
  }) {
    try {
      if (!hideLoading) {
        dispatch(setLoading(true));
      }
      const submitResponse = await submitFn();

      if (!submitResponse) return;

      const promise = new Promise((resolve, reject) => {
        submitResponse.promiEvent
          .once('transactionHash', (txHash: string) => { dispatch(setHash(txHash)); })
          .once('receipt', (receipt: TransactionReceipt) => {
            onSuccess();
            dispatch(setSuccessMessage(successMessage || t('TRANSACTION_SUCCESS')));
            resolve(receipt);
          })
          .on('error', (e: unknown) => { reject(e); });
      });

      await promise;
    } catch (error) {
      captureError(error);
      dispatch(setErrorMessage(getErrorMessage(error)));
      onError(error);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    transactionLoading,
    transactionHash,
    successMessage,
    errorMessage,

    submitTransaction: useCallback(submitTransaction, []),
    setTransactionLoading: useCallback((isLoading: boolean) => dispatch(setLoading(isLoading)), []),
    setTransactionError: useCallback((errorMessage: string) => dispatch(setErrorMessage(errorMessage)), []),
    resetTransaction: useCallback(() => dispatch(reset()), []),
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

    return t('ERROR_UNKNOWN');
  }

  if (error.message === 'execution reverted') {
    return t('ERROR_TRANSACTION_REVERTED');
  }

  const rpcErrorCode = error.message.match(/\[.+-(.+)\]/)?.at(1);
  return rpcErrorCode
    ? t(`ERROR_${rpcErrorCode}`)
    : t('ERROR_RPC_UNKNOWN');
}
