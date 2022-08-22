import Address from '../Address';

import { RedirectAddressLink } from './styles';

import { trimAddress } from 'utils/strings';

type AddressProps = Parameters<typeof Address>[0];

interface Props extends AddressProps {
  to: string;
}

function RedirectAddress ({ address, short = false, to = '', ...rest }: Props) {
  return (
    <Address
      address={address}
      short={short}
      {...rest}
    >
      <RedirectAddressLink to={to} title="Validator Profile">
        <p className="ellipsis">{short ? trimAddress(address) : address}</p>
      </RedirectAddressLink>
    </Address>
  );
}

export default RedirectAddress;
