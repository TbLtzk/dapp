
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { media, Spinner } from '@q-dev/q-ui-kit';
import { ErrorHandler } from 'helpers';
import styled from 'styled-components';

import PageLayout from 'components/PageLayout';
import NotFound from 'pages/NotFound';

import DashboardLink from '../../components/DashboardLink';

import ExclusionProposedBlock from './components/ExclusionProposedBlock';
import L0ProposedBlock from './components/L0ProposedBlock';
import OnchainActiveBlock from './components/OnchainActiveBlock';
import RecentTransitionBlock from './components/RecentTransitionBlock';
import RootNodesMonitoringTable from './components/RootNodesMonitoringTable';

import { useRootNodes, useRootNodesMonitoring } from 'store/root-nodes/hooks';

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
  const { rootMembersLoading, getRootMembers } = useRootNodes();
  const { loadRootNodesMonitoringData } = useRootNodesMonitoring();
  const [isMonitoringDataLoading, setIsMonitoringDataLoading] = useState(true);
  const [isMonitoringDataError, setIsMonitoringDataError] = useState(false);

  async function loadMonitoringData () {
    try {
      await loadRootNodesMonitoringData();
    } catch (e) {
      setIsMonitoringDataError(true);
      ErrorHandler.processWithoutFeedback(e);
    }
    setIsMonitoringDataLoading(false);
  }

  useEffect(() => {
    loadMonitoringData();
    getRootMembers();
  }, []);

  if (isMonitoringDataLoading || rootMembersLoading) {
    return (
      <CenteredContainer>
        <Spinner size={100} thickness={4} />
      </CenteredContainer>
    );
  }

  if (isMonitoringDataError) {
    return <NotFound title={t('ERROR_PLEASE_TRY_AGAIN')} />;
  }

  return (
    <StyledWrapper>
      <DashboardLink />
      <PageLayout title={t('ROOT_NODES_MONITORING')}>
        <div className="root-nodes-monitoring__blocks-wrap">
          <OnchainActiveBlock />
          <L0ProposedBlock />
          <ExclusionProposedBlock />
          <RecentTransitionBlock />
        </div>
        <RootNodesMonitoringTable />
      </PageLayout>
    </StyledWrapper>
  );
}

export default RootNodesMonitoring;
