import { useSelector } from 'react-redux';

import { NetworkWrapper } from '../../styles';

import { networkSelector } from 'store/user-inf/selectors';

import { networks } from 'constants/config';
import { getParametersDependsOnUrl } from 'func/useful';

function Network () {
  const network = useSelector(networkSelector);
  const parameters = getParametersDependsOnUrl();

  return (
    <NetworkWrapper network={network}>
      Network: Q {networks[network || parameters.chainId]}
    </NetworkWrapper>
  );
}

export default Network;
