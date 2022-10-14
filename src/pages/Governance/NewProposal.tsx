import { useTranslation } from 'react-i18next';

import PageLayout from 'components/PageLayout';
import Tabs from 'components/Tabs';
import { TabRoute, TabSwitch } from 'components/Tabs/components';

import { NewExpertProposal, NewQProposal, NewRootProposal, NewSlashingProposal } from './components/NewProposal';

import { RoutePaths } from 'constants/routes';

function NewProposal () {
  const { t } = useTranslation();

  const tabs = [
    {
      id: 'q-proposal',
      label: t('Q_PROPOSAL'),
      link: RoutePaths.newQProposal
    },
    {
      id: 'root-node-proposal',
      label: t('ROOT_NODE_PROPOSAL'),
      link: RoutePaths.newRootNodeProposal
    },
    {
      id: 'expert-roposal',
      label: t('EXPERT_PROPOSAL'),
      link: RoutePaths.newExpertProposal
    },
    {
      id: 'slashing-proposal',
      label: t('SLASHING_PROPOSAL'),
      link: RoutePaths.newSlashingProposal
    },
  ];

  return (
    <PageLayout title={t('NEW_PROPOSAL')}>
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
    </PageLayout>
  );
}

export default NewProposal;
