import { useTranslation } from 'react-i18next';
import { Redirect, Route, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { Icon } from '@q-dev/q-ui-kit';

import Button from 'components/Button';
import PageLayout from 'components/PageLayout';
import Tabs from 'components/Tabs';
import { TabRoute, TabSwitch } from 'components/Tabs/components';

import Proposals from './components/Proposals';
import VotingStats from './components/VotingStats';

import { useProposals } from 'store/proposals/hooks';

import { RoutePaths } from 'constants/routes';

function Governance () {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { getActiveProposalsByType } = useProposals();

  const tabs = [
    {
      id: 'q-proposals',
      label: t('Q_PROPOSALS'),
      count: getActiveProposalsByType('q').length,
      link: RoutePaths.qProposals,
    },
    {
      id: 'root-node-panel',
      label: t('ROOT_NODE_PANEL'),
      count: getActiveProposalsByType('rootNode').length,
      link: RoutePaths.rootNodePanel,
    },
    {
      id: 'expert-roposals',
      label: t('EXPERT_PROPOSALS'),
      count: getActiveProposalsByType('expert').length,
      link: RoutePaths.expertProposals,
    },
    {
      id: 'slashing-proposals',
      label: t('SLASHING_PROPOSALS'),
      count: getActiveProposalsByType('slashing').length,
      link: RoutePaths.slashingProposals,
    },
    {
      id: 'contract-updates',
      label: t('CONTRACT_UPDATES'),
      count: getActiveProposalsByType('contractUpdate').length,
      link: RoutePaths.contractUpdates,
    },
  ];

  const pathToNewProposalPath: Record<string, string> = {
    [RoutePaths.qProposals]: RoutePaths.newQProposal,
    [RoutePaths.rootNodePanel]: RoutePaths.newRootNodeProposal,
    [RoutePaths.expertProposals]: RoutePaths.newExpertProposal,
    [RoutePaths.slashingProposals]: RoutePaths.newSlashingProposal,
  };

  const redirectTab = tabs.find(tab => tab.count > 0) || tabs[0];

  return (
    <PageLayout
      title={t('GOVERNANCE')}
      action={pathname !== RoutePaths.contractUpdates && (
        <Link to={pathToNewProposalPath[pathname] || RoutePaths.newQProposal}>
          <Button block>
            <Icon name="add" />
            <span>{t('CREATE_PROPOSAL')}</span>
          </Button>
        </Link>
      )}
    >
      <VotingStats />
      <Tabs tabs={tabs} />
      <TabSwitch>
        <>
          <Route exact path={RoutePaths.governance}>
            <Redirect to={redirectTab.link} />
          </Route>

          <TabRoute exact path={RoutePaths.qProposals}>
            <Proposals type="q" />
          </TabRoute>

          <TabRoute exact path={RoutePaths.rootNodePanel}>
            <Proposals type="rootNode" />
          </TabRoute>

          <TabRoute exact path={RoutePaths.expertProposals}>
            <Proposals type="expert" />
          </TabRoute>

          <TabRoute exact path={RoutePaths.slashingProposals}>
            <Proposals type="slashing" />
          </TabRoute>

          <TabRoute exact path={RoutePaths.contractUpdates}>
            <Proposals type="contractUpdate" />
          </TabRoute>
        </>
      </TabSwitch>
    </PageLayout>
  );
}

export default Governance;
