import { useSelector } from 'react-redux';

import Button from 'ui/Button';
import Icon, { IconName } from 'ui/Icon';

import { LinksContainer } from './styles';

import { networkSelector } from 'store/user-inf/selectors';

import { getExplorerUrlByChainId, getGnosisSafeUrlByChainId, getQBridgeUrlByChainId } from 'func/appConfig';

function EcosystemLinks () {
  const chainId = useSelector(networkSelector);
  const links = [
    {
      href: getGnosisSafeUrlByChainId(chainId),
      icon: 'gnosis-safe' as IconName,
    },
    {
      href: getExplorerUrlByChainId(chainId),
      icon: 'explorer' as IconName,
    },
    {
      href: getQBridgeUrlByChainId(chainId),
      icon: 'bridge' as IconName,
    },
  ];

  return (
    <LinksContainer>
      {links.map(({ href, icon }) => (
        <a
          key={href}
          tabIndex={-1}
          className="ecosystem-link"
          target="_blank"
          href={href}
          rel="noreferrer"
        >
          <Button icon look="ghost">
            <Icon name={icon} className="ecosystem-link-icon" />
          </Button>
        </a>
      ))}
    </LinksContainer>
  );
}

export default EcosystemLinks;
