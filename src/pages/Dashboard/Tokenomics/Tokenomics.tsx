import styled from 'styled-components';
import { media } from 'styles/media';

import PageLayout from 'components/PageLayout';

import DashboardLink from '../components/DashboardLink';

import AllocationBlocks from './components/AllocationBlocks';
import PoolBalances from './components/PoolBalances';
import TokenHolderRewards from './components/TokenHolderRewards';

const StyledWrapper = styled.div`
  .tokenomics__main {
    display: grid;
    gap: 24px;

    ${media.lessThan('medium')} {
      gap: 16px;
    }
  }

  .tokenomics__balance-blocks {
    display: grid;
    grid-template: "holder holder balance" / 1fr 1fr 1fr;
    gap: 24px;

    ${media.lessThan('medium')} {
      gap: 16px;
      grid-template: "holder" "balance" / 1fr;
    }
  }
`;

function Tokenomics () {
  return (
    <StyledWrapper>
      <DashboardLink />
      <PageLayout title="Tokenomics">
        <div className="tokenomics__main">
          <AllocationBlocks />
          <div className="tokenomics__balance-blocks">
            <TokenHolderRewards />
            <PoolBalances />
          </div>
        </div>
      </PageLayout>
    </StyledWrapper>
  );
}

export default Tokenomics;
