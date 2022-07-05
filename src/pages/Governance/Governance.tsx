import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import Button from 'ui/Button';
import Icon from 'ui/Icon';
import Tabs from 'ui/Tabs';
import { TabRoute, TabSwitch } from 'ui/Tabs/components';

import PageWrap from 'components/Base/PageWrap';

import VotingStats from './components/VotingStats';
import Proposals from './Proposals';

import { activeProposalsByTypeSelector } from 'store/voting/proposals/selectors';

import { RoutePaths } from 'constants/routes';

function Governance () {
  const { pathname } = useLocation();

  const qActiveProposals = useSelector(activeProposalsByTypeSelector('q'));
  const rootActiveProposals = useSelector(activeProposalsByTypeSelector('rootNode'));
  const expertActiveProposals = useSelector(activeProposalsByTypeSelector('expert'));
  const slashingActiveProposals = useSelector(activeProposalsByTypeSelector('slashing'));
  const contractActiveProposals = useSelector(activeProposalsByTypeSelector('contractUpdate'));

  const tabs = [
    {
      id: 'q-proposals',
      label: 'Q Proposals',
      count: qActiveProposals.length,
      link: RoutePaths.qProposals,
    },
    {
      id: 'root-node-panel',
      label: 'Root Node Panel',
      count: rootActiveProposals.length,
      link: RoutePaths.rootNodePanel,
    },
    {
      id: 'expert-roposals',
      label: 'Expert Proposals',
      count: expertActiveProposals.length,
      link: RoutePaths.expertProposals,
    },
    {
      id: 'slashing-proposals',
      label: 'Slashing Proposals',
      count: slashingActiveProposals.length,
      link: RoutePaths.slashingProposals,
    },
    {
      id: 'contract-updates',
      label: 'Contract Updates',
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
    <PageWrap
      pageHeader="Governance"
      pageButton={pathname !== RoutePaths.contractUpdates && (
        <Link to={pathToNewProposalPath[pathname] || RoutePaths.newQProposal}>
          <Button>
            <Icon name="add" />
            <span>Create proposal</span>
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
    </PageWrap>
  );
}

export default Governance;
