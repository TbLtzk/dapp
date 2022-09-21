import { useEffect } from 'react';

import styled from 'styled-components';
import { media } from 'styles/media';

import useNetworkConfig from 'hooks/useNetworkConfig';

import AssetCard from './components/AssetCard';
import AssetCardSkeleton from './components/AssetCardSkeleton';

import { useInterestRates } from 'store/borrowing/hooks';

import { fillArray } from 'utils/arrays';

const StyledWrapper = styled.div`
  .borrowing__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;

    ${media.lessThan('large')} {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }
`;

function Borrowing () {
  const { collaterals } = useNetworkConfig();
  const {
    interestRates,
    interestRatesLoading,
    getInterestRates
  } = useInterestRates();

  useEffect(() => {
    getInterestRates(collaterals);
  }, []);

  return (
    <StyledWrapper>
      <div className="borrowing__list">
        {interestRatesLoading
          ? fillArray(4).map((i) => (
            <AssetCardSkeleton key={i} />
          ))
          : interestRates.map(rate => (
            <AssetCard key={rate.asset} rate={rate}/>
          ))}
      </div>
    </StyledWrapper>
  );
}

export default Borrowing;
