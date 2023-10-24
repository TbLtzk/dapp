import {
  Chain,
  CHAIN_TYPES,
  ChainId,
  CreateProviderOpts,
  ProviderProxyConstructor,
  PROVIDERS,
  TransactionResponse,
  TxRequestBody,
} from '@distributedlab/w3p';
import { ethers, Signer } from 'ethers';

import { FALLBACK_PROVIDER_NAMES } from 'constants/providers';

export type SupportedProviders = PROVIDERS | FALLBACK_PROVIDER_NAMES;

/**
 * composable object of designated provider,
 * which we can use to solve user needs
 */
export interface ProviderWrapper {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  signMessage: (message: string) => Promise<string>;
  currentProvider?: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider;
  currentSigner?: Signer;

  init: (
    proxy: ProviderProxyConstructor,
    detector: CreateProviderOpts<FALLBACK_PROVIDER_NAMES>
  ) => Promise<{ isConnected: boolean }>;
  chainId: ChainId;
  chainType?: CHAIN_TYPES;
  providerType?: string;
  address: string;
  switchNetwork: (chainId: ChainId, chain?: Chain) => Promise<void>;
  addChain: (chain: Chain) => Promise<void>;
  signAndSendTx: (txRequestBody: TxRequestBody) => Promise<TransactionResponse>;
  isConnected: boolean;
  getHashFromTxResponse: (txResponse: TransactionResponse) => string;
  getTxUrl: (chain: Chain, txHash: string) => string;
  getAddressUrl: (chain: Chain, address: string) => string;
  getBalance: (address: string) => Promise<string>;
}
