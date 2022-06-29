
import CopyToClipboard from 'components/Base/CopyToClipboard';

import AddressIcon from '../AddressIcon';

import { AddressWrapper } from './styles';

import { trimAddress } from 'func/useful';

function Address ({
  address,
  short = false,
  hideTooltip = false,
  iconed = false,
  semibold = false,
  children = null
}) {
  const addressContent = (
    <p>{short ? trimAddress(address) : address}</p>
  );

  return (
    <AddressWrapper $semibold={semibold}>
      {iconed && (
        <AddressIcon
          address={address}
          size={20}
          style={{ margin: '2px 8px 2px 2px' }}
        />
      )}
      {children || addressContent}

      <CopyToClipboard
        value={address}
        hideTooltip={hideTooltip}
      />
    </AddressWrapper>
  );
}

export default Address;
