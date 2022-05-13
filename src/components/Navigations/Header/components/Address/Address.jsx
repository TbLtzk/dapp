import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';

import Button from 'components/Base/Button';

import { userAddressMetamask } from 'store/user-inf/selectors';

function Address () {
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
      <div title={userAddress}>
        <Button
          look="white"
          style={{
            width: '270px',
            margin: '0 0 0 20px',
          }}
          onClick={handleCopy}
        >
          <i className="mdi mdi-content-copy" />
          <span style={{ marginLeft: '5px' }}>
            {isCopied ? 'Copied!' : userAddress.substring(0, 30) + '...'}
          </span>
        </Button>
      </div>
    </CopyToClipboard>
  );
}

export default Address;
