import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useTranslation } from 'react-i18next';

import { useWeb3Context } from 'context/Web3ContextProvider';

import Button from 'ui/Button';
import SegmentedButton from 'ui/SegmentedButton';

import { useUser } from 'store/user/hooks';

import { chainIdToNetworkMap, networkConfigsMap } from 'constants/config';

function Network () {
  const { switchNetwork, switchNetworkError, setSwitchNetworkError } = useWeb3Context();
  const { t } = useTranslation();
  const alert = useAlert();

  const { chainId } = useUser();
  const [currentNetwork, setCurrentNetwork] = useState(chainId);
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
      alert.error(t('SWITCH_NETWORK_ERROR'));
      setCurrentNetwork(chainId);
      setSwitchNetworkError(false);
    }
  }, [switchNetworkError]);

  const handleChangeNetwork = (chainId: number) => {
    setCurrentNetwork(chainId);
    switchNetwork(chainId);
  };

  return chainIdToNetworkMap[chainId]
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
        {t('SWITCH_TO_Q')}
      </Button>
    );
}

export default Network;
