import { errors } from 'errors';
import { t } from 'i18next';

export function getErrorMessage (error: Error | unknown): string {
  if (!(error instanceof Error)) return t('ERROR_UNKNOWN');

  if (!error.message?.includes('Internal JSON-RPC error')) {
    if (error.message?.includes('Transaction has been reverted by the EVM')) {
      return t('ERROR_TRANSACTION_REVERTED_BY_EVM');
    }
    if (error.message?.includes('bad address checksum')) {
      return t('ERROR_INVALID_ADDRESS');
    }

    if (error.message?.includes('User rejected request')) {
      return t('ERROR_TRANSACTION_REJECTED');
    }

    if (error.message?.includes('Delegations are not refreshed')) {
      return t('ERROR_DELEGATIONS');
    }

    return t('ERROR_UNKNOWN');
  }

  if (error.message === 'execution reverted') {
    return t('ERROR_TRANSACTION_REVERTED');
  }

  const rpcErrorCode = error.message.match(/\[.+-(.+)\]/)?.at(1);

  if (rpcErrorCode) {
    return t(`ERROR_${rpcErrorCode}`);
  }

  return getEthErrorMessage(error);
}

export function getEthErrorMessage (error: Error): string {
  switch (error.constructor) {
    case errors.ProviderChainNotFoundError:
      return t('ERROR_PROVIDER_CHAIN_NOT_FOUND');
    case errors.ProviderNotInitializedError:
      return t('ERROR_PROVIDER_NOT_INITIALIZED');
    case errors.ProviderUserRejectedRequest:
      return t('ERROR_TRANSACTION_REJECTED');
    case errors.ProviderUnauthorized:
      return t('ERROR_PROVIDER_UNAUTHORIZED');
    case errors.ProviderUnsupportedMethod:
      return t('ERROR_PROVIDER_UNSUPPORTED_METHOD');
    case errors.ProviderDisconnected:
      return t('ERROR_PROVIDER_DISCONNECTED');
    case errors.ProviderChainDisconnected:
      return t('ERROR_PROVIDER_CHAIN_DISCONNECTED');
    case errors.ProviderParseError:
      return t('ERROR_PROVIDER_PARSE_ERROR');
    case errors.ProviderInvalidRequest:
      return t('ERROR_PROVIDER_INVALID_REQUEST');
    case errors.ProviderMethodNotFound:
      return t('ERROR_PROVIDER_METHOD_NOT_FOUND');
    case errors.ProviderInvalidParams:
      return t('ERROR_PROVIDER_INVALID_PARAMS');
    case errors.ProviderInternalError:
      return t('ERROR_PROVIDER_INTERNAL_ERROR');
    case errors.ProviderInvalidInput:
      return t('ERROR_PROVIDER_INVALID_INPUT');
    case errors.ProviderResourceNotFound:
      return t('ERROR_PROVIDER_RESOURCE_NOT_FOUND');
    case errors.ProviderResourceUnavailable:
      return t('ERROR_PROVIDER_RESOURCE_UNAVAILABLE');
    case errors.ProviderTransactionRejected:
      return t('ERROR_PROVIDER_TRANSACTION_REJECTED');
    case errors.ProviderMethodNotSupported:
      return t('ERROR_PROVIDER_METHOD_NOT_SUPPORTED');
    case errors.ProviderLimitExceeded:
      return t('ERROR_PROVIDER_LIMIT_EXCEEDED');
    case errors.ProviderJsonRpcVersionNotSupported:
      return t('ERROR_PROVIDER_JSON_RPC_VERSION_NOT_SUPPORTED');
    default:
      return t('ERROR_RPC_UNKNOWN');
  }
}
