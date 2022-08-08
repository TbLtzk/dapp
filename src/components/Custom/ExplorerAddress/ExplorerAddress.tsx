import { useSelector } from 'react-redux';

import Address from '../Address';

import { ExplorerLink } from './styles';

import { networkSelector } from 'store/user-inf/selectors';

import { getExplorerUrlByChainId } from 'utils/appConfig';
import { trimAddress } from 'utils/useful';

function ExplorerAddress ({
  address,
  short = false,
  ...rest
}: Parameters<typeof Address>[0]) {
  const network = useSelector(networkSelector);
  const explorerUrl = getExplorerUrlByChainId(network);

  return (
    <Address
      address={address}
      short={short}
      {...rest}
    >
      <ExplorerLink
        href={`${explorerUrl}/address/${address}`}
        target="_blank"
        rel="noreferrer"
        title="View on Explorer"
      >
        <p className="ellipsis" style={{ marginBottom: 0 }}>
          {short ? trimAddress(address) : address}
        </p>
      </ExplorerLink>
    </Address>
  );
}

export default ExplorerAddress;
