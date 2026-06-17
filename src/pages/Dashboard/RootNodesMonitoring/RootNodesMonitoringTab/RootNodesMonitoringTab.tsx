
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { media, Spinner } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import PageLayout from 'components/PageLayout';
import {
  isGovernanceOperatorEligible,
  useL0GovernanceEligibility,
} from 'pages/L0Governance/hooks/L0GovernanceEligibilityContext';
import NotFound from 'pages/NotFound';

import DashboardLink from '../../components/DashboardLink';
import { L0GovernanceActionsProvider } from '../L0GovernanceActionsContext';
import { useRootNodesMonitoringContext } from '../RootNodesMonitoringContext';

import ExclusionProposedBlock from './components/ExclusionProposedBlock';
import L0GovernanceSigningInfo from './components/L0GovernanceSigningInfo';
import L0ProposedBlock from './components/L0ProposedBlock';
import OnchainActiveBlock from './components/OnchainActiveBlock';
import RecentTransitionBlock from './components/RecentTransitionBlock';
import RootNodesMonitoringTable from './components/RootNodesMonitoringTable';
import { getCosignatureStatus } from './helpers/table-collect-data';

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
    align-items: stretch;

    > .block {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    ${media.lessThan('large')} {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }
    
    ${media.lessThan('tablet')} {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;

function RootNodesMonitoringGovernanceContent () {
  const {
    latestCosignatureMetrics,
    blockHeight,
  } = useRootNodesMonitoringContext();
  const l0GovernanceEligibility = useL0GovernanceEligibility();

  const showGovernanceActions = isGovernanceOperatorEligible(l0GovernanceEligibility.status);

  const connectedCosignatureStatus = useMemo(() => {
    if (!showGovernanceActions || !l0GovernanceEligibility.rootAccount) {
      return null;
    }

    return getCosignatureStatus(
      l0GovernanceEligibility.rootAccount,
      latestCosignatureMetrics,
      blockHeight,
    );
  }, [
    blockHeight,
    latestCosignatureMetrics,
    l0GovernanceEligibility.rootAccount,
    showGovernanceActions,
  ]);

  return (
    <>
      <div className="root-nodes-monitoring__blocks-wrap">
        <OnchainActiveBlock
          connectedCosignatureStatus={connectedCosignatureStatus}
          showGovernanceActions={showGovernanceActions}
        />
        <L0ProposedBlock
          connectedCosignatureStatus={connectedCosignatureStatus}
          showGovernanceActions={showGovernanceActions}
        />
        <ExclusionProposedBlock
          connectedCosignatureStatus={connectedCosignatureStatus}
          showGovernanceActions={showGovernanceActions}
        />
        <RecentTransitionBlock
          showGovernanceActions={showGovernanceActions}
          connectedRootAccount={l0GovernanceEligibility.rootAccount}
        />
      </div>
      <L0GovernanceSigningInfo />
      <RootNodesMonitoringTable />
    </>
  );
}

function RootNodesMonitoring () {
  const { t } = useTranslation();
  const {
    isInitiallyLoaded,
    isLoadingFailed,
  } = useRootNodesMonitoringContext();
  const { rootMembersLoading } = useRootNodes();

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

  return (
    <StyledWrapper>
      <DashboardLink />
      <PageLayout title={t('ROOT_NODES_MONITORING')}>
        <L0GovernanceActionsProvider>
          <RootNodesMonitoringGovernanceContent />
        </L0GovernanceActionsProvider>
      </PageLayout>
    </StyledWrapper>
  );
}

export default RootNodesMonitoring;
