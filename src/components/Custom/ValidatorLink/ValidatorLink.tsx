import { Icon } from '@q-dev/q-ui-kit';

import useNetworkConfig from 'hooks/useNetworkConfig';

import Address from '../Address';

import { StyledValidatorLink } from './styles';

function ValidatorLink ({ address, }: Parameters<typeof Address>[0]) {
  const { explorerUrl } = useNetworkConfig();

  return (
    <StyledValidatorLink
      href={`${explorerUrl}/address/${address}`}
      target="_blank"
      rel="noreferrer"
      title="View on Explorer"
    >
      <Icon name="external-link" className="validator-link__icon"/>
    </StyledValidatorLink>
  );
}

export default ValidatorLink;
