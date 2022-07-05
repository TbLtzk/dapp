import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router';

import { ProposalType } from 'typings/proposals';
import Tabs from 'ui/Tabs';
import { TabSwitch } from 'ui/Tabs/components';

import PageWrap from 'components/Base/PageWrap';

import CreateProposal from './components/CreateProposal';
import VotingStats from './components/VotingStats';
import Proposals from './Proposals';

import { activeProposalsByTypeSelector } from 'store/voting/proposals/selectors';

function Governance () {
  const { pathname } = useLocation();

  const qActiveProposals = useSelector(activeProposalsByTypeSelector('q'));
  const rootActiveProposals = useSelector(activeProposalsByTypeSelector('rootNode'));
  const expertActiveProposals = useSelector(activeProposalsByTypeSelector('expert'));
  const slashingActiveProposals = useSelector(activeProposalsByTypeSelector('slashing'));
  const contractActiveProposals = useSelector(activeProposalsByTypeSelector('contractUpdate'));

  const pathToTypeMap: Record<string, ProposalType> = {
    '/governance/q-proposals': 'q',
    '/governance/q-root-node-panel': 'rootNode',
    '/governance/q-expert-proposals': 'expert',
    '/governance/slashing-proposals': 'slashing',
  };

  const type = pathToTypeMap[pathname];
  const createProposal = type !== 'contractUpdate' && <CreateProposal type={type} />;

  const tabs = [
    {
      id: 'q-proposals',
      label: 'Q Proposals',
      count: qActiveProposals.length,
      link: '/governance/q-proposals',
    },
    {
      id: 'root-node-panel',
      label: 'Root Node Panel',
      count: rootActiveProposals.length,
      link: '/governance/q-root-node-panel',
    },
    {
      id: 'expert-roposals',
      label: 'Expert Proposals',
      count: expertActiveProposals.length,
      link: '/governance/q-expert-proposals',
    },
    {
      id: 'slashing-proposals',
      label: 'Slashing Proposals',
      count: slashingActiveProposals.length,
      link: '/governance/slashing-proposals',
    },
    {
      id: 'contract-updates',
      label: 'Contract Updates',
      count: contractActiveProposals.length,
      link: '/governance/contract-updates',
    },
  ];

  const redirectTab = tabs.find((tab) => tab.count > 0) || tabs[0];

  return (
    <PageWrap pageHeader="Governance" pageButton={createProposal}>
      <VotingStats />
      <Tabs tabs={tabs} />
      <TabSwitch>
        <>
          <Route exact path="/governance">
            <Redirect to={redirectTab.link} />
          </Route>

          <Route exact path="/governance/q-proposals">
            <Proposals type="q" />
          </Route>

          <Route exact path="/governance/q-root-node-panel">
            <Proposals type="rootNode" />
          </Route>

          <Route exact path="/governance/q-expert-proposals">
            <Proposals type="expert" />
          </Route>

          <Route exact path="/governance/slashing-proposals">
            <Proposals type="slashing" />
          </Route>

          <Route exact path="/governance/contract-updates">
            <Proposals type="contractUpdate" />
          </Route>
        </>
      </TabSwitch>
    </PageWrap>
  );
}

export default Governance;
