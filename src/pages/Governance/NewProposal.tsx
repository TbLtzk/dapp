import Tabs from 'ui/Tabs';
import { TabRoute, TabSwitch } from 'ui/Tabs/components';

import PageWrap from 'components/Base/PageWrap';

import { NewExpertProposal, NewQProposal, NewRootProposal, NewSlashingProposal } from './components/NewProposal';

import { RoutePaths } from 'constants/routes';

function NewProposal () {
  const tabs = [
    {
      id: 'q-proposal',
      label: 'Q Proposal',
      link: RoutePaths.newQProposal
    },
    {
      id: 'root-node-proposal',
      label: 'Root Node Proposal',
      link: RoutePaths.newRootNodeProposal
    },
    {
      id: 'expert-roposal',
      label: 'Expert Proposal',
      link: RoutePaths.newExpertProposal
    },
    {
      id: 'slashing-proposal',
      label: 'Slashing Proposal',
      link: RoutePaths.newSlashingProposal
    },
  ];

  return (
    <PageWrap pageHeader="New proposal">
      <Tabs tabs={tabs} />
      <TabSwitch>
        <>
          <TabRoute exact path={RoutePaths.newQProposal}>
            <NewQProposal />
          </TabRoute>

          <TabRoute exact path={RoutePaths.newRootNodeProposal}>
            <NewRootProposal />
          </TabRoute>

          <TabRoute exact path={RoutePaths.newExpertProposal}>
            <NewExpertProposal />
          </TabRoute>

          <TabRoute exact path={RoutePaths.newSlashingProposal}>
            <NewSlashingProposal />
          </TabRoute>
        </>
      </TabSwitch>
    </PageWrap>
  );
}

export default NewProposal;
