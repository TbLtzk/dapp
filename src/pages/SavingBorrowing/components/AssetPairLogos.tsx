
import { HTMLAttributes } from 'react';

import styled from 'styled-components';
import { Asset } from 'typings/defi';

import AssetLogo from 'components/AssetLogo';

const StyledWrapper = styled.div`
  display: flex;

  .asset-pair-logo {
    position: relative;

    &:not(:first-child) {
      margin-left: -8px;
    }

    &::after {
      content: '';
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      position: absolute;
      top: 0;
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.background};
    }

    .asset-pair-logo-icon {
      width: 40px;
    }
  }
`;

interface Props extends HTMLAttributes<HTMLDivElement> {
  collateral: Asset;
  borrowing: 'QUSD';
}

function AssetPairLogos ({ collateral, borrowing, ...rest }: Props) {
  return (
    <StyledWrapper {...rest}>
      <div className="asset-pair-logo">
        <AssetLogo asset={collateral} className="asset-pair-logo-icon" />
      </div>
      <div className="asset-pair-logo">
        <AssetLogo asset={borrowing} className="asset-pair-logo-icon" />
      </div>
    </StyledWrapper>
  );
}

export default AssetPairLogos;
