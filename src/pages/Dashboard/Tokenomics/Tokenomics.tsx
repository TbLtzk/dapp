import { media } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import PageLayout from 'components/PageLayout';

import DashboardLink from '../components/DashboardLink';

import AllocationBlocks from './components/AllocationBlocks';
import AprBlock from './components/AprBlock';
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
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    ${media.lessThan('medium')} {
      gap: 16px;
      grid-template-columns: 1fr;
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
          <AprBlock />
        </div>
      </PageLayout>
    </StyledWrapper>
  );
}

export default Tokenomics;
