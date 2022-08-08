import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useWeb3Context } from 'context/Web3ContextProvider';

import Button from 'ui/Button';
import SegmentedButton from 'ui/SegmentedButton';

import { networkSelector } from 'store/user-inf/selectors';

import { chainIdToNetworkMap, networkConfigsMap } from 'constants/config';

function Network () {
  const network = Number(useSelector(networkSelector));
  const { switchNetwork, switchNetworkError, setSwitchNetworkError } = useWeb3Context();
  const { t } = useTranslation();
  const [currentNetwork, setCurrentNetwork] = useState(network);

  const isDevnet = ![
    networkConfigsMap.mainnet.dAppUrl,
    networkConfigsMap.testnet.dAppUrl,
  ].includes(window.location.origin);

  const networkOptions = [
    { value: 35441, label: t('MAINNET') },
    { value: 35443, label: t('TESTNET') },
    ...(isDevnet ? [{ value: 35442, label: t('DEVNET') }] : []),
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

  return chainIdToNetworkMap[network]
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
        {t('WRONG_NETWORK')}
      </Button>
    );
}

export default Network;
