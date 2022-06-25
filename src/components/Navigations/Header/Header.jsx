import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LogoImg from 'components/Base/LogoImg';

import Address from './components/Address';
import ConnectWallet from './components/ConnectWallet';
import Network from './components/Network';
import Settings from './components/Settings';
import { ElementsWrapper, HeaderWrapper, WrapLogo } from './styles';

import { loadTypeSelector } from 'store/user-inf/selectors';

import { LOAD_TYPES } from 'constants/statuses';

function Header() {
  const loadType = useSelector(loadTypeSelector);

  return (
    <HeaderWrapper>
      <WrapLogo>
        <Link to="/">
          <LogoImg />
        </Link>
      </WrapLogo>

      <ElementsWrapper>
        <Network />
        <div>
          {loadType === LOAD_TYPES.loaded ? <Address /> : <ConnectWallet />}
          <Settings />
        </div>
      </ElementsWrapper>
    </HeaderWrapper>
  );
}

export default memo(Header);
