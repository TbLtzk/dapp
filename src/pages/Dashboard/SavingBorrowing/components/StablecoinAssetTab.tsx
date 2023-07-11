import { useEffect } from 'react';

import { media } from '@q-dev/q-ui-kit';
import styled from 'styled-components';
import { StablecoinAsset } from 'typings/defi';

import useNetworkConfig from 'hooks/useNetworkConfig';

import BalanceOverview from './BalanceOverview';
import InterestRateBlock from './InterestRateBlock';

import { useInterestRates } from 'store/borrowing/hooks';

interface Props {
  stablecoinAsset: StablecoinAsset;
}

const StyledWrapper = styled.div`
  display: grid;
  gap: 24px;

  ${media.lessThan('medium')} {
    gap: 16px;
  }

  .stablecoin-asset-tab__rates {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;

    ${media.lessThan('medium')} {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
`;

function StablecoinAssetTab ({ stablecoinAsset }: Props) {
  const { collaterals } = useNetworkConfig();
  const { interestRates, loadInterestRates } = useInterestRates(stablecoinAsset);

  useEffect(() => {
    loadInterestRates(collaterals);
  }, []);

  return (
    <StyledWrapper>
      <BalanceOverview stablecoinAsset={stablecoinAsset} />
      <div className="stablecoin-asset-tab__rates">
        {interestRates.map(rate => (
          <InterestRateBlock
            key={rate.asset}
            rate={rate}
            stablecoinAsset={stablecoinAsset}
          />
        ))}
      </div>
    </StyledWrapper>
  );
}

export default StablecoinAssetTab;
