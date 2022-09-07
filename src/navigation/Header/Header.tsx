import { memo } from 'react';

import Button from 'components/Button';

import Balance from './components/Balance';
import ConnectWallet from './components/ConnectWallet';
import Network from './components/Network';
import Settings from './components/Settings';
import UserAddress from './components/UserAddress';
import { StyledHeader } from './styles';

import { useUser } from 'store/user/hooks';

import { LOAD_TYPES } from 'constants/statuses';

function Header ({ onMenuClick }: { onMenuClick: () => void }) {
  const { loadType } = useUser();

  return (
    <StyledHeader>
      <div className="header__content">
        <div className="header__left">
          <div className="header__network">
            <Network />
          </div>
          <Button
            alwaysEnabled
            icon
            className="header__menu"
            look="secondary"
            onClick={onMenuClick}
          >
            <i className="mdi mdi-menu" style={{ fontSize: '20px' }} />
          </Button>
        </div>
        <div className="header__actions">
          {loadType !== LOAD_TYPES.loaded
            ? (
              <ConnectWallet />
            )
            : (
              <>
                <Balance />
                <UserAddress />
              </>
            )}
          <Settings />
        </div>
      </div>
    </StyledHeader>
  );
}

export default memo(Header);
