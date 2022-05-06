import React from 'react';
import { useSelector } from 'react-redux';

import CopyToClipboard from 'components/Base/CopyToClipboard';

import { AddressWrapper } from './styles';

import { networkSelector } from 'store/user-inf/selectors';

import { getExplorerUrlByChainId } from 'func/useful';

function ExplorerAddress ({ address }) {
  const network = useSelector(networkSelector);
  const explorerUrl = getExplorerUrlByChainId(network);

  return (
    <AddressWrapper>
      <a
        href={`${explorerUrl}/address/${address}`}
        target="_blank"
        rel="noreferrer"
        title="View on explorer"
      >
        <p>{address}</p>
      </a>

      <CopyToClipboard
        title="Copy address"
        valueToCopy={address}
      >
        <i className="mdi mdi-content-copy" />
      </CopyToClipboard>
    </AddressWrapper>
  );
}

export default ExplorerAddress;
