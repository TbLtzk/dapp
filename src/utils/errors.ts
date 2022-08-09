import * as Sentry from '@sentry/react';
import { t } from 'i18next';
import { SuccessMessage } from 'typings/transaction';
import { TransactionReceipt } from 'web3-eth';

export function captureError (error: unknown): void {
  console.error(error);

  if (import.meta.env.NODE_ENV !== 'development') {
    Sentry.captureMessage((error as Error).message);
  }
}

export function getSuccessMessage (type: string, transaction: TransactionReceipt, message?: string): SuccessMessage {
  return {
    type,
    transactionHash: transaction.transactionHash,
    message: message || t('TRANSACTION_SUCCESS'),
  };
}

export function getErrorMessage (err: unknown): { message: string } {
  const error = err as {
    message: string;
    code?: number;
    stack?: string;
  };

  if (error.code === 4001) {
    return { message: t('ERROR_TRANSACTION_REJECTED') };
  }

  if (error.message?.includes('Internal JSON-RPC error')) {
    const rpcErrorCode = error.message.match(/\[.+-(.+)\]/)?.at(1);
    return { message: rpcErrorCode ? t(`ERROR_${rpcErrorCode}`) : t('ERROR_RPC_UNKNOWN') };
  }

  return { message: error.message || t('ERROR_UNKNOWN') };
}
