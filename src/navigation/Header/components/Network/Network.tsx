import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useWeb3Context } from 'context/Web3ContextProvider';

import SegmentedButton from 'ui/SegmentedButton';

import { useTransaction } from 'store/transaction/hooks';
import { useUser } from 'store/user/hooks';

import { networkConfigsMap } from 'constants/config';

function Network () {
  const { switchNetwork, switchNetworkError, setSwitchNetworkError } = useWeb3Context();
  const { t } = useTranslation();
  const { setTransactionError } = useTransaction();

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
      setTransactionError(t('SWITCH_NETWORK_ERROR'));
      setCurrentNetwork(chainId);
      setSwitchNetworkError(false);
    }
  }, [switchNetworkError]);

  const handleChangeNetwork = (chainId: number) => {
    setCurrentNetwork(chainId);
    switchNetwork(chainId);
  };

  return <SegmentedButton
    value={currentNetwork}
    options={networkOptions}
    onChange={handleChangeNetwork}
  />;
}

export default Network;
