import * as Sentry from '@sentry/react';
import { t } from 'i18next';

export function captureError (error: unknown) {
  console.error(error);

  if (import.meta.env.NODE_ENV !== 'development') {
    Sentry.captureMessage((error as Error).message);
  }
}

export function getErrorMessage (err: unknown) {
  const error = err as {
    message: string;
    code?: number;
    stack?: string;
  };

  if (error.code === 4001) {
    return t('ERROR_TRANSACTION_REJECTED');
  }

  if (error.message?.includes('Internal JSON-RPC error')) {
    const rpcErrorCode = error.message.match(/\[.+-(.+)\]/)?.at(1);
    return rpcErrorCode
      ? t(`ERROR_${rpcErrorCode}`)
      : t('ERROR_RPC_UNKNOWN');
  }

  return error.message || t('ERROR_UNKNOWN');
}
