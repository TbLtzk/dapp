export { default } from './Web3ContextProvider';

// import { ReactNode, useEffect, useState } from 'react';

// import { Web3ReactProvider } from '@web3-react/core';
// import { Connector } from '@web3-react/types';
// import { getConnectorForWallet, useConnectors } from 'connectors';
// import Web3 from 'web3';

// import useLocalStorage from 'hooks/useLocalStorage';

// import { getContractRegistryInstance } from 'contracts/contract-instance';

// import { networks } from 'constants/config';
// import { LOAD_TYPES } from 'constants/statuses';
// import ErrorHandler from 'func/ErrorHandler';
// import { getParametersDependsOnUrl } from 'func/useful';

// const connect = async (connector: Connector) => {
//   try {
//     if (connector.connectEagerly) {
//       await connector.connectEagerly();
//     } else {
//       await connector.activate();
//     }
//   } catch (error) {
//     console.error(`web3-react eager connection error: ${error}`);
//   }
// };
// const { ethereum } = window;

// function Web3Provider ({ children }: { children: ReactNode }) {
//   const { rpc, chainId } = getParametersDependsOnUrl();
//   const [init, setInit] = useState(LOAD_TYPES.loading);

//   const [selectedWallet] = useLocalStorage('selectedWallet', undefined);
//   const [selectedChainId] = useLocalStorage('selectedChainId', chainId);

//   const connectors = useConnectors(selectedWallet, selectedChainId);

//   useEffect(() => {
//     initConnection();
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

// export default Web3Provider;
