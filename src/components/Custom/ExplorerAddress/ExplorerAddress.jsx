import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import jazzicon from '@metamask/jazzicon';

import CopyToClipboard from 'components/Base/CopyToClipboard';

import { AddressWrapper } from './styles';

import { networkSelector } from 'store/user-inf/selectors';

import { getExplorerUrlByChainId, trimAddress } from 'func/useful';

function ExplorerAddress ({
  address,
  short = false,
  hideTooltip = false,
  iconed = false,
  semibold = false,
}) {
  const network = useSelector(networkSelector);
  const explorerUrl = getExplorerUrlByChainId(network);

  const iconRef = useRef();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!iconed) return;

    const addressSlice = address.slice(2, 10);
    const identicon = jazzicon(20, parseInt(addressSlice, 16));

    iconRef.current.innerHTML = '';
    iconRef.current.appendChild(identicon);
  }, [address, iconed]);

  return (
    <AddressWrapper $semibold={semibold}>
      {iconed && <div ref={iconRef} className="address-icon" />}

      <a
        href={`${explorerUrl}/address/${address}`}
        target="_blank"
        rel="noreferrer"
        title="View on explorer"
      >
        <p>{short ? trimAddress(address) : address}</p>
      </a>

      <CopyToClipboard
        title="Copy address"
        valueToCopy={address}
        hideTooltip={hideTooltip}
        onCopy={setIsCopied}
      >
        <i className={`mdi mdi-${isCopied ? 'check-circle-outline' : 'content-copy'}`} />
      </CopyToClipboard>
    </AddressWrapper>
  );
}

export default ExplorerAddress;
