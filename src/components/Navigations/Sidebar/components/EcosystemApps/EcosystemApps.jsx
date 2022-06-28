import { useSelector } from 'react-redux';

import { motion } from 'framer-motion';

import { EcosystemAppsStyle } from '../../styles';

import { theme } from 'store/theme/selectors';
import { networkSelector } from 'store/user-inf/selectors';

import { getExplorerUrlByChainId, getGnosisSafeUrlByChainId, getQBridgeUrlByChainId } from 'func/appConfig';

function EcosystemApps () {
  const themeColor = useSelector(theme);
  const chainId = useSelector(networkSelector);
  const explorerUrl = getExplorerUrlByChainId(chainId);
  const gnosisUrl = getGnosisSafeUrlByChainId(chainId);
  const qBridgeUrl = getQBridgeUrlByChainId(chainId);

  const apps = [
    {
      id: 'gnosis',
      link: gnosisUrl,
      src: '/icons/gnosis.svg',
    },
    {
      id: 'blockexplorer',
      link: explorerUrl,
      src: '/icons/blockexplorer.svg',
    },
    {
      id: 'bridge',
      link: qBridgeUrl,
      src: '/icons/bridge.svg',
    },
  ];

  return (
    <EcosystemAppsStyle theme={themeColor}>
      {apps.map((app) => (
        <div key={app.id} className="app_contaier">
          <a
            target="_blank"
            href={app.link}
            rel="noreferrer"
          >
            <motion.img
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              src={app.src}
              alt={app.id}
            />
          </a>
        </div>
      ))}
    </EcosystemAppsStyle>
  );
}

export default EcosystemApps;
