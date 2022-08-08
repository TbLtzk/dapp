import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import PageLayout from 'components/PageLayout';
import Button from 'ui/Button';
import Icon from 'ui/Icon';
import Tabs from 'ui/Tabs';
import { TabRoute, TabSwitch } from 'ui/Tabs/components';

import Proposals from './components/Proposals';
import VotingStats from './components/VotingStats';

import { activeProposalsByTypeSelector } from 'store/voting/proposals/selectors';

import { RoutePaths } from 'constants/routes';

function Governance () {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const qActiveProposals = useSelector(activeProposalsByTypeSelector('q'));
  const rootActiveProposals = useSelector(activeProposalsByTypeSelector('rootNode'));
  const expertActiveProposals = useSelector(activeProposalsByTypeSelector('expert'));
  const slashingActiveProposals = useSelector(activeProposalsByTypeSelector('slashing'));
  const contractActiveProposals = useSelector(activeProposalsByTypeSelector('contractUpdate'));

  const tabs = [
    {
      id: 'q-proposals',
      label: t('Q_PROPOSALS'),
      count: qActiveProposals.length,
      link: RoutePaths.qProposals,
    },
    {
      id: 'root-node-panel',
      label: t('ROOT_NODE_PANEL'),
      count: rootActiveProposals.length,
      link: RoutePaths.rootNodePanel,
    },
    {
      id: 'expert-roposals',
      label: t('EXPERT_PROPOSALS'),
      count: expertActiveProposals.length,
      link: RoutePaths.expertProposals,
    },
    {
      id: 'slashing-proposals',
      label: t('SLASHING_PROPOSALS'),
      count: slashingActiveProposals.length,
      link: RoutePaths.slashingProposals,
    },
    {
      id: 'contract-updates',
      label: t('CONTRACT_UPDATES'),
      count: contractActiveProposals.length,
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
