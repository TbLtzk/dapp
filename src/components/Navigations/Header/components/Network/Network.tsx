import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useWeb3Context } from 'context/Web3ContextProvider';
import Button from 'ui/Button';
import SegmentedButton from 'ui/SegmentedButton';

import { networkSelector } from 'store/user-inf/selectors';

import { networks } from 'constants/config';
import { isDevnetdApp } from 'func/appConfig';

function Network () {
  const network = Number(useSelector(networkSelector));
  const { switchNetwork, switchNetworkError, setSwitchNetworkError } = useWeb3Context();
  const [currentNetwork, setCurrentNetwork] = useState(network);

  const networkOptions = [
    { value: 35441, label: 'MainNet' },
    { value: 35443, label: 'TestNet' },
    ...(isDevnetdApp() ? [{ value: 35442, label: 'DevNet' }] : []),
  ];

  useEffect(() => {
    if (switchNetworkError) {
      setCurrentNetwork(network);
      setSwitchNetworkError(false);
    }
  }, [switchNetworkError]);

  const handleChangeNetwork = (chainId: number) => {
    setCurrentNetwork(chainId);
    switchNetwork(chainId);
  };

  return networks[network]
    ? (
      <SegmentedButton
        value={currentNetwork}
        options={networkOptions}
        onChange={handleChangeNetwork}
      />
    )
    : (
      <Button
        alwaysEnabled
        className="network-wrong"
        onClick={() => switchNetwork()}
      >
        Wrong network
      </Button>
    );
}

export default Network;
