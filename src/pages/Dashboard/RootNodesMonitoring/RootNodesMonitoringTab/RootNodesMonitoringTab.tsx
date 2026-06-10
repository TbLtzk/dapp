
import { useTranslation } from 'react-i18next';

import { media, Spinner } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import PageLayout from 'components/PageLayout';
import { useL0GovernanceEligibility } from 'pages/L0Governance/hooks/useL0GovernanceEligibility';
import NotFound from 'pages/NotFound';

import DashboardLink from '../../components/DashboardLink';
import { L0GovernanceActionsProvider } from '../L0GovernanceActionsContext';
import { useRootNodesMonitoringContext } from '../RootNodesMonitoringContext';

import ExclusionProposedBlock from './components/ExclusionProposedBlock';
import L0ProposedBlock from './components/L0ProposedBlock';
import OnchainActiveBlock from './components/OnchainActiveBlock';
import RecentTransitionBlock from './components/RecentTransitionBlock';
import RootNodesMonitoringTable from './components/RootNodesMonitoringTable';

import { useRootNodes } from 'store/root-nodes/hooks';

const CenteredContainer = styled.div`
  display: flex;
  height: calc(100vh - 72px);
  justify-content: center;
  align-items: center;
`;

const StyledWrapper = styled.div`
  .root-nodes-monitoring__blocks-wrap {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
    margin-bottom: 24px;

    ${media.lessThan('large')} {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }
    
    ${media.lessThan('tablet')} {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

function RootNodesMonitoring () {
  const { t } = useTranslation();
  const { isInitiallyLoaded, isLoadingFailed } = useRootNodesMonitoringContext();
  const { rootMembersLoading } = useRootNodes();
  const l0GovernanceEligibility = useL0GovernanceEligibility();

  if (!isInitiallyLoaded && isLoadingFailed) {
    return <NotFound title={t('ERROR_PLEASE_TRY_AGAIN')} />;
  }

  if (!isInitiallyLoaded || rootMembersLoading) {
    return (
      <CenteredContainer>
        <Spinner size={100} thickness={4} />
      </CenteredContainer>
    );
  }

  const showGovernanceActions = (
    l0GovernanceEligibility.status === 'eligible-root' ||
    l0GovernanceEligibility.status === 'eligible-alias'
  );

  return (
    <StyledWrapper>
      <DashboardLink />
      <PageLayout title={t('ROOT_NODES_MONITORING')}>
        <L0GovernanceActionsProvider>
          <div className="root-nodes-monitoring__blocks-wrap">
            <OnchainActiveBlock showGovernanceActions={showGovernanceActions} />
            <L0ProposedBlock showGovernanceActions={showGovernanceActions} />
            <ExclusionProposedBlock showGovernanceActions={showGovernanceActions} />
            <RecentTransitionBlock />
          </div>
          <RootNodesMonitoringTable />
        </L0GovernanceActionsProvider>
      </PageLayout>
    </StyledWrapper>
  );
}

export default RootNodesMonitoring;
