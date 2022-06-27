import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { AnimateSharedLayout, motion } from 'framer-motion';

import { useWeb3Context } from 'hooks/useWeb3Context';

import { StyledNetwork } from './styles';

import { networkSelector } from 'store/user-inf/selectors';

import { networks } from 'constants/config';
import { isDevnetdApp } from 'func/useful';

function Network () {
  const network = Number(useSelector(networkSelector));
  const isDevnet = isDevnetdApp();
  const isQNetwork = Boolean(networks[network]);

  const { switchNetwork, switchNetworkError, setSwitchNetworkError } = useWeb3Context();
  const [currentNetwork, setCurrentNetwork] = useState(network);

  const networkList = [
    { title: 'MainNet', chainId: 35441 },
    { title: 'TestNet', chainId: 35443 },
    isDevnet && { title: 'DevNet', chainId: 35442 },
  ];

  useEffect(() => {
    if (switchNetworkError) {
      setCurrentNetwork(network);
      setSwitchNetworkError(false);
    }
  }, [switchNetworkError]);

  const handleChangeNetwork = (chainId) => {
    setCurrentNetwork(chainId);
    switchNetwork(chainId);
  };

  return (
    <AnimateSharedLayout>
      <StyledNetwork isQNetwork={isQNetwork} networksLength={networkList.length}>
        {isQNetwork
          ? (
            networkList.map(({ chainId, title }) => (
              <motion.div
                key={chainId}
                className="network-switch"
                onClick={() => handleChangeNetwork(chainId)}
              >
                <span className={`network-label ${currentNetwork === chainId ? 'active-network' : ''}`}>{title}</span>
                {currentNetwork === chainId && <motion.div layoutId="underline" className="network-background" />}
              </motion.div>
            ))
          )
          : (
            <motion.div className="network-wrong" onClick={() => switchNetwork()}>
              <motion.p on={{ scale: 1.2 }} >Wrong network</motion.p>
            </motion.div>
          )}
      </StyledNetwork>
    </AnimateSharedLayout>
  );
}

export default Network;
