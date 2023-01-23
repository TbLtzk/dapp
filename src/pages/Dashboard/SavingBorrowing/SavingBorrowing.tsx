import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { media } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import PageLayout from 'components/PageLayout';

import useNetworkConfig from 'hooks/useNetworkConfig';

import DashboardLink from '../components/DashboardLink';

import BalanceOverview from './components/BalanceOverview';
import InterestRateBlock from './components/InterestRateBlock';

import { useInterestRates } from 'store/borrowing/hooks';

const StyledWrapper = styled.div`
  .saving-borrowing__main {
    display: grid;
    gap: 24px;

    ${media.lessThan('medium')} {
      gap: 16px;
    }
  }

  .saving-borrowing-rates {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;

    ${media.lessThan('medium')} {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
`;

function SavingBorrowing () {
  const { t } = useTranslation();
  const { collaterals } = useNetworkConfig();
  const { interestRates, getInterestRates } = useInterestRates();

  useEffect(() => {
    getInterestRates(collaterals);
  }, []);

  return (
    <StyledWrapper>
      <DashboardLink />
      <PageLayout title={t('SAVING_BORROWING')}>
        <div className="saving-borrowing__main">
          <BalanceOverview />
          <div className="saving-borrowing-rates">
            {interestRates.map(rate => (
              <InterestRateBlock key={rate.asset} rate={rate}/>
            ))}
          </div>
        </div>
      </PageLayout>
    </StyledWrapper>
  );
}

export default SavingBorrowing;
