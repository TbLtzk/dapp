import { Fragment, useEffect } from 'react';

import { media } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import useNetworkConfig from 'hooks/useNetworkConfig';

import SavingsTable from './components/SavingsTable';
import StableCoinBalance from './components/StableCoinBalance';
import SystemBalance from './components/SystemBalance';

import { useSavingAssets } from 'store/saving/hooks';

const StyledWrapper = styled.div`
  display: grid;
  gap: 32px;

  .saving-overview {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;

    ${media.lessThan('large')} {
      grid-template-columns: 1fr 1fr;
    }

    ${media.lessThan('medium')} {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
`;

function Saving () {
  const { loadSavingAssets } = useSavingAssets();
  const { stablecoins } = useNetworkConfig();

  useEffect(() => {
    loadSavingAssets();
  }, []);

  return (
    <StyledWrapper>
      <div className="saving-overview">
        {stablecoins.map((asset) => (
          <Fragment key={asset}>
            <StableCoinBalance asset={asset} />
            <SystemBalance asset={asset} />
          </Fragment>
        ))}
      </div>

      <SavingsTable />
    </StyledWrapper>
  );
}

export default Saving;
