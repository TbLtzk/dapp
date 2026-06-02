
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { media, Spinner, Tooltip } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import Button from 'components/Button';
import PageLayout from 'components/PageLayout';
import { useL0GovernanceEligibility } from 'pages/L0Governance/hooks/useL0GovernanceEligibility';
import NotFound from 'pages/NotFound';

import useNetworkConfig from 'hooks/useNetworkConfig';

import DashboardLink from '../../components/DashboardLink';
import { useRootNodesMonitoringContext } from '../RootNodesMonitoringContext';

import ExclusionProposedBlock from './components/ExclusionProposedBlock';
import L0ProposedBlock from './components/L0ProposedBlock';
import OnchainActiveBlock from './components/OnchainActiveBlock';
import RecentTransitionBlock from './components/RecentTransitionBlock';
import RootNodesMonitoringTable from './components/RootNodesMonitoringTable';

import { useRootNodes } from 'store/root-nodes/hooks';

import { RoutePaths } from 'constants/routes';

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
  const { featureFlags } = useNetworkConfig();
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

  const isEligibleForL0Governance = (
    l0GovernanceEligibility.status === 'eligible-root' ||
    l0GovernanceEligibility.status === 'eligible-alias'
  );

  const l0GovernanceDisabledReason = (() => {
    switch (l0GovernanceEligibility.status) {
      case 'loading':
        return t('L0_ELIGIBILITY_LOADING');
      case 'disconnected':
        return t('L0_ELIGIBILITY_DISCONNECTED');
      case 'wrong-network':
        return t('L0_ELIGIBILITY_WRONG_NETWORK');
      case 'unknown-alias':
        return t('L0_ELIGIBILITY_UNKNOWN_ALIAS');
      case 'read-only':
      default:
        return t('L0_ELIGIBILITY_READ_ONLY');
    }
  })();

  return (
    <StyledWrapper>
      <DashboardLink />
      <PageLayout
        title={t('ROOT_NODES_MONITORING')}
        action={featureFlags.l0Governance && (isEligibleForL0Governance
          ? (
            <Link to={RoutePaths.dashboardRootNodesMonitoringL0Governance}>
              <Button
                block
                alwaysEnabled
                look="secondary"
              >
                {t('OPEN_L0_GOVERNANCE')}
              </Button>
            </Link>
          )
          : (
            <Tooltip
              trigger={(
                <span>
                  <Button
                    block
                    disabled
                    look="secondary"
                  >{t('OPEN_L0_GOVERNANCE')}</Button>
                </span>
              )}
            >
              <span>{l0GovernanceDisabledReason}</span>
            </Tooltip>
          ))}
      >
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
