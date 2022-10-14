import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Icon, media } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import Button from 'components/Button';
import PageLayout from 'components/PageLayout';

import BlockHeight from './components/BlockHeight';
import ConstitutionBlock from './components/ConstitutionBlock';
import RootNodesChart from './components/RootNodesChart';
import SavingBorrowingBlock from './components/SavingBorrowingBlock';
import TokenomicsBlock from './components/TokenomicsBlock';
import TotalRootNodes from './components/TotalRootNodes';
import TotalValidators from './components/TotalValidators';
import ValidatorsChart from './components/ValidatorsChart';

export const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-areas:
    "block constitution total-root total-validators"
    "tokenomics tokenomics saving saving"
    "root root validators validators";
  gap: 24px;

  ${media.lessThan('large')} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    grid-template-areas:
      "block constitution"
      "total-root total-validators"
      "tokenomics saving"
      "root validators";
  }

  ${media.lessThan('medium')} {
    grid-template-areas:
      "block constitution"
      "total-root total-validators"
      "tokenomics tokenomics"
      "saving saving"
      "root root"
      "validators validators";
  }

  ${media.lessThan('tablet')} {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      "block"
      "constitution"
      "total-root"
      "total-validators"
      "tokenomics"
      "saving"
      "root"
      "validators";
  }
`;

function DashboardLayout () {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t('DASHBOARD')}
      action={
        <Link to="/q-parameters">
          <Button block alwaysEnabled>
            <Icon name="list" />
            <span>{t('Q_PARAMETERS')}</span>
          </Button>
        </Link>
      }
    >
      <StyledWrapper>
        <BlockHeight />
        <ConstitutionBlock />
        <TotalRootNodes />
        <TotalValidators />
        <TokenomicsBlock />
        <SavingBorrowingBlock />
        <RootNodesChart />
        <ValidatorsChart />
      </StyledWrapper>
    </PageLayout>
  );
}

export default DashboardLayout;
