import { useSelector } from 'react-redux';

import { networkSelector } from 'store/user-inf/selectors';

import { chainIdToNetworkMap, networkConfigsMap, ORIGIN_NETWORK_NAME } from 'constants/config';

function useNetworkConfig () {
  const chainId = useSelector(networkSelector);
  const network = chainIdToNetworkMap[chainId] || ORIGIN_NETWORK_NAME;
  return networkConfigsMap[network];
}

export default useNetworkConfig;
