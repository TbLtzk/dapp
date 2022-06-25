import { createContext, useContext } from 'react';

import { Web3Data } from 'components/Custom/Web3ContextProvider/Web3ContextProvider';

export type Web3ContextData = {
  web3ProviderData: Web3Data;
};

export const Web3Context = createContext({} as Web3ContextData);

export const useWeb3Context = () => {
  const { web3ProviderData } = useContext(Web3Context);
  if (!Object.keys(web3ProviderData).length) {
    throw new Error(
      'useWeb3Context() can only be used inside of <Web3ContextProvider />, ' + 'please declare it at a higher level.'
    );
  }

  return web3ProviderData;
};
