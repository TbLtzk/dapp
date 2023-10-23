import { useCallback, useRef, useState } from 'react';

import {
  Chain,
  ChainId,
  createProvider,
  CreateProviderOpts,
  FallbackEvmProvider,
  IProvider,
  ProviderProxyConstructor,
  TransactionResponse,
  TxRequestBody,
} from '@distributedlab/w3p';
import { errors } from 'errors';
import { ethers, providers, Signer } from 'ethers';
import { ProviderWrapper } from 'typings/provider';

import { initProvider, initSigner } from 'contracts/contract-instance';

import { ZERO_ADDRESS } from 'constants/boundaries';
import { FALLBACK_PROVIDER_NAMES } from 'constants/providers';

export const useProvider = (): ProviderWrapper => {
  const _provider = useRef<IProvider | null>(null);
  const [currentProvider, setCurrentProvider] =
    useState<providers.Web3Provider | providers.JsonRpcProvider>();
  const [currentSigner, setCurrentSigner] = useState<Signer>();
  const [providerReactiveState, setProviderReactiveState] = useState(() => {
    return {
      address: _provider.current?.address || ZERO_ADDRESS,
      isConnected: _provider.current?.isConnected || false,
      chainId: _provider.current?.chainId || '',
      chainType: _provider.current?.chainType,
      providerType: _provider.current?.providerType,
    };
  });

  const connect = async (): Promise<void> => _provider.current?.connect();

  const disconnect = async () => {
    if (_provider.current?.disconnect) {
      await _provider.current.disconnect();
    }

    _provider.current?.clearHandlers();
    _provider.current = null;
    setCurrentSigner(undefined);
    setCurrentProvider(undefined);
  };

  const addChain = async (chain: Chain): Promise<void> =>
    _provider.current?.addChain?.(chain);

  const getBalance = async (address: string): Promise<string> => {
    if (!currentProvider) return '0';
    return (await currentProvider?.getBalance(address))?.toString();
  };

  const switchChain = async (chainId: ChainId): Promise<void> =>
    _provider.current?.switchChain?.(chainId);

  const switchNetwork = async (chainId: ChainId, chain?: Chain) => {
    try {
      await switchChain(chainId);
    } catch (error) {
      if (chain &&
        (error instanceof errors.ProviderInternalError ||
          error instanceof errors.ProviderChainNotFoundError)
      ) {
        await addChain(chain);
      } else {
        throw error;
      }
    }
  };

  const signAndSendTx = async (
    txRequestBody: TxRequestBody,
  ): Promise<TransactionResponse> =>
    _provider.current?.signAndSendTx?.(txRequestBody) ?? '';

  const signMessage = async (message: string): Promise<string> =>
    _provider.current?.signMessage?.(message) ?? '';

  const getHashFromTxResponse = (txResponse: TransactionResponse): string =>
    _provider.current?.getHashFromTx?.(txResponse) ?? '';

  const getTxUrl = (chain: Chain, txHash: string): string =>
    _provider.current?.getTxUrl?.(chain, txHash) ?? '';

  const getAddressUrl = (chain: Chain, address: string): string =>
    _provider.current?.getAddressUrl?.(chain, address) ?? '';

  const init = useCallback(async (
    providerProxyConstructor: ProviderProxyConstructor,
    createProviderOpts: CreateProviderOpts<FALLBACK_PROVIDER_NAMES>,
  ) => {
    _provider.current?.clearHandlers();

    _provider.current = await createProvider(
      providerProxyConstructor,
      {
        providerDetector: createProviderOpts.providerDetector,
        listeners: {
          ...createProviderOpts.listeners,
          onAccountChanged: (e) => {
            createProviderOpts?.listeners?.onAccountChanged?.(e);
          },
          onChainChanged: (e) => {
            createProviderOpts?.listeners?.onChainChanged?.(e);
          },
          onConnect: (e) => {
            createProviderOpts?.listeners?.onConnect?.(e);
            _updateProviderState();
          },
          onDisconnect: (e) => {
            createProviderOpts?.listeners?.onDisconnect?.(e);
          },
        }
      },
    );

    const rawProvider = _provider.current.rawProvider;

    if (rawProvider) {
      const web3Provider = providerProxyConstructor.prototype instanceof FallbackEvmProvider
        ? rawProvider as unknown as providers.JsonRpcProvider
        : new ethers.providers.Web3Provider(rawProvider as providers.ExternalProvider);
      if (_provider.current?.isConnected) {
        const signer = web3Provider.getSigner();
        initSigner(signer);
        setCurrentSigner(signer);
      }
      initProvider(web3Provider);
      setCurrentProvider(web3Provider);
    }
    _updateProviderState();
  }, []);

  const _updateProviderState = () => {
    setProviderReactiveState({
      address: _provider.current?.address || ZERO_ADDRESS,
      isConnected: _provider.current?.isConnected || false,
      chainId: _provider.current?.chainId || '',
      chainType: _provider.current?.chainType,
      providerType: _provider.current?.providerType,
    });
  };

  return {
    init,
    currentProvider,
    currentSigner,
    ...providerReactiveState,
    connect,
    disconnect,
    addChain,
    switchNetwork,
    signMessage,
    signAndSendTx,
    getTxUrl,
    getHashFromTxResponse,
    getAddressUrl,
    getBalance
  };
};
