import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'ui/Button';

import Balance from './components/Balance';
import ConnectWallet from './components/ConnectWallet';
import Network from './components/Network';
import Settings from './components/Settings';
import UserAddress from './components/UserAddress';
import { StyledHeader } from './styles';

import { useTransaction } from 'store/transaction/hooks';
import { useUser } from 'store/user/hooks';

import { LOAD_TYPES } from 'constants/statuses';

function Header ({ onMenuClick }: { onMenuClick: () => void }) {
  const { t } = useTranslation();
  const { loadType } = useUser();

  const { pendingTransactions } = useTransaction();

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
                {pendingTransactions.length > 0 && (
                  <Button
                    loading
                    look="secondary"
                    className="header__transactions"
                  >
                    {t('COUNT_PENDING', { count: pendingTransactions.length })}
                  </Button>
                )}
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
