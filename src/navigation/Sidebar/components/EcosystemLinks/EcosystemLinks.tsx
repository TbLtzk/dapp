import { useSelector } from 'react-redux';

import Button from 'ui/Button';
import Icon, { IconName } from 'ui/Icon';

import { LinksContainer } from './styles';

import { networkSelector } from 'store/user-inf/selectors';

import { getExplorerUrlByChainId, getGnosisSafeUrlByChainId, getQBridgeUrlByChainId } from 'func/appConfig';

function EcosystemLinks () {
  const chainId = useSelector(networkSelector);
  const links: { icon: IconName; href: string }[] = [
    {
      href: getGnosisSafeUrlByChainId(chainId),
      icon: 'gnosis-safe',
    },
    {
      href: getExplorerUrlByChainId(chainId),
      icon: 'explorer',
    },
    {
      href: getQBridgeUrlByChainId(chainId),
      icon: 'bridge',
    },
  ];

  return (
    <LinksContainer>
      {links.map(({ href, icon }) => (
        <a
          key={href}
          className="ecosystem-link"
          target="_blank"
          href={href}
          rel="noreferrer"
        >
          <Button
            block
            icon
            look="ghost"
          >
            <Icon name={icon} className="ecosystem-link-icon" />
          </Button>
        </a>
      ))}
    </LinksContainer>
  );
}

export default EcosystemLinks;
