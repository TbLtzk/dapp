import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useWeb3Context } from 'context/Web3ContextProvider';
import copy from 'copy-to-clipboard';
import { motion } from 'framer-motion';

import AddressIcon from 'components/Custom/AddressIcon';
import Button from 'ui/Button';
import Icon from 'ui/Icon';

import { AddressDropdown } from './styles';

import { userAddressMetamask } from 'store/user-inf/selectors';

import { trimAddress } from 'utils/strings';

function UserAddress () {
  const { t } = useTranslation();
  const userAddress = useSelector(userAddressMetamask);
  const { disconnectWallet } = useWeb3Context();

  const [isCopied, setIsCopied] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);

  function copyAddress () {
    copy(userAddress);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }

  return (
    <AddressDropdown
      right
      open={addressOpen}
      trigger={
        <Button
          alwaysEnabled
          look="secondary"
          active={addressOpen}
        >
          <AddressIcon address={userAddress} size={20} />
          <span>{trimAddress(userAddress)}</span>
          <motion.span
            style={{ height: '100%' }}
            animate={{
              rotate: addressOpen ? 180 : 0,
            }}
          >
            <Icon name="expand-more" />
          </motion.span>
        </Button>
      }
      onToggle={setAddressOpen}
    >
      <div className="address-content">
        <h3 className="address-title text-xl font-semibold">
          <AddressIcon address={userAddress} size={32} />
          {trimAddress(userAddress)}
        </h3>

        <div className="address-main">
          <button
            type="button"
            className="address-action text-lg color-primary"
            onClick={copyAddress}
          >
            <Icon name="copy" />
            <span>{isCopied ? t('COPIED') : t('COPY_ADDRESS')}</span>
          </button>

          <button
            type="button"
            className="address-action text-lg color-primary"
            onClick={disconnectWallet}
          >
            <Icon name="sign-out" />
            <span>{t('DISCONNECT_WALLET')}</span>
          </button>
        </div>
      </div>
    </AddressDropdown>
  );
}

export default UserAddress;
