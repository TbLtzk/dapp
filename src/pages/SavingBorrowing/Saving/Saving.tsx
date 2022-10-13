import { useEffect } from 'react';

import styled from 'styled-components';
import { media } from 'styles/media';

import SavingsTable from './components/SavingsTable';
import StableCoinBalance from './components/StableCoinBalance';
import SystemBalance from './components/SystemBalance';
import TotalSavingBalance from './components/TotalSaving';
import TotalSupply from './components/TotalSupply';

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
  const { getSavingAssets } = useSavingAssets();

  useEffect(() => {
    getSavingAssets();
  }, []);

  return (
    <StyledWrapper>
      <div className="saving-overview">
        <StableCoinBalance />
        <TotalSavingBalance />
        <TotalSupply />
        <SystemBalance />
      </div>

      <SavingsTable />
    </StyledWrapper>
  );
}

export default Saving;
