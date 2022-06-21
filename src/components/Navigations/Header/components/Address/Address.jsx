import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Button from 'components/Base/Button';

import { userAddressMetamask } from 'store/user-inf/selectors';

import { trimAddress } from 'func/useful';

function Address () {
  const { t } = useTranslation();
  const userAddress = useSelector(userAddressMetamask);
  const [isCopied, setIsCopied] = useState(false);

  function handleCopy () {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }

  return (
    <CopyToClipboard text={userAddress}>
      <div title={userAddress} style={{ marginLeft: '20px' }}>
        <Button
          look="white"
          style={{ minWidth: '120px' }}
          onClick={handleCopy}
        >
          <i className="mdi mdi-content-copy" />
          <span style={{ marginLeft: '5px' }}>{isCopied ? t('COPIED') : trimAddress(userAddress)}</span>
        </Button>
      </div>
    </CopyToClipboard>
  );
}

export default Address;
