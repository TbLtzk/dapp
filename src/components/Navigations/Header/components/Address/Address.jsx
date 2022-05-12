import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import { CopyAddressContainer } from 'components/Navigations/Sidebar/styles';

import { userAddressMetamask } from 'store/user-inf/selectors';

function Address () {
  const userAddress = useSelector(userAddressMetamask);
  const [copy, setCopy] = useState(false);

  function handleCopy () {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  }

  const title = (
    <CopyAddressContainer>
      {copy
        ? (
          <span className="copied">
            <i className="mdi mdi-content-copy" /> Copied!
          </span>
        )
        : (
          <span>
            <i className="mdi mdi-content-copy" /> {userAddress.substring(0, 30) + '...'}
          </span>
        )}
    </CopyAddressContainer>
  );

  return (
    <CopyToClipboard text={userAddress}>
      <div title={userAddress}>
        <Button
          icon="copy"
          type="white"
          title={title}
          style={{
            width: '270px',
            margin: '0 0 0 20px'
          }}
          onClick={handleCopy}
        />
      </div>
    </CopyToClipboard>
  );
}

export default Address;
