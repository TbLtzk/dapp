import { useState } from 'react';
import { useSelector } from 'react-redux';

import { AnimateSharedLayout, motion } from 'framer-motion';

import { useWeb3Context } from 'hooks/useWeb3Context';

import { StyledNetwork } from './styles';

import { networkSelector } from 'store/user-inf/selectors';

import { getParametersDependsOnUrl } from 'func/useful';

function Network () {
  const network = Number(useSelector(networkSelector));
  const parameters = getParametersDependsOnUrl();
  const { switchNetwork, switchPending } = useWeb3Context();
  const [currentNetwork, setCurrentNetwork] = useState(network);

  const networks = [
    { title: 'MainNet', chainId: 35441 },
    { title: 'TestNet', chainId: 35443 },
    // { title: 'Devnet', chainId: 35442 },
  ];

  const handleChangeNetwork = (chainId) => {
    setCurrentNetwork(chainId);
      switchNetwork(chainId);
  };
  return (
    <AnimateSharedLayout>
      <StyledNetwork networksLength={networks.length}>
        {networks.map(({ chainId, title }) => (
          <motion.div
            key={chainId}
            className="network-switch"
            onClick={() => handleChangeNetwork(chainId)}
          >
            <span className={`network-label ${currentNetwork === chainId ? 'active-network' : ''}`}>{title}</span>
            {currentNetwork === chainId && <motion.div layoutId="underline" className="network-background" />}
          </motion.div>
        ))}
      </StyledNetwork>
    </AnimateSharedLayout>
  );
}

export default Network;
