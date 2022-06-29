import { memo } from 'react';
import { useSelector } from 'react-redux';

import ConnectWallet from './components/ConnectWallet';
import Network from './components/Network';
import Settings from './components/Settings';
import UserAddress from './components/UserAddress';
import { StyledHeader } from './styles';

import { loadTypeSelector } from 'store/user-inf/selectors';

import { LOAD_TYPES } from 'constants/statuses';

function Header () {
  const loadType = useSelector(loadTypeSelector);

  return (
    <StyledHeader>
      <Network />
      <div className="header-actions">
        {loadType !== LOAD_TYPES.loaded ? <ConnectWallet /> : <UserAddress />}
        <Settings />
      </div>
    </StyledHeader>
  );
}

export default memo(Header);
