import { useSelector } from 'react-redux';

import { MODE } from 'components/Base/DashboardMode/DashboardMode';
import TabsPanel from 'components/Base/TabsPanel';

import { mode } from 'store/dashboard-mode/selectors';
import { activeProposalsByTypeSelector } from 'store/voting/proposals/selectors';

function ProposalsNav () {
  const appMode = useSelector(mode);

  const qActiveProposals = useSelector(activeProposalsByTypeSelector('q'));
  const rootActiveProposals = useSelector(activeProposalsByTypeSelector('rootNode'));
  const expertActiveProposals = useSelector(activeProposalsByTypeSelector('expert'));
  const slashingActiveProposals = useSelector(activeProposalsByTypeSelector('slashing'));
  const contractActiveProposals = useSelector(activeProposalsByTypeSelector('contractUpdate'));

  const tabs = [
    {
      label: 'Q Proposals',
      count: qActiveProposals.length,
      link: '/governance/q-proposals',
    },
    {
      label: 'Root Node Panel',
      count: rootActiveProposals.length,
      link: '/governance/q-root-node-panel',
    },
    ...(appMode === MODE.advanced
      ? [
        {
          label: 'Expert Proposals',
          count: expertActiveProposals.length,
          link: '/governance/q-expert-proposals',
        },
        {
          label: 'Slashing Proposals',
          count: slashingActiveProposals.length,
          link: '/governance/slashing-proposals',
        },
        {
          label: 'Contract Updates',
          count: contractActiveProposals.length,
          link: '/governance/contract-updates',
        },
      ]
      : []
    ),
  ];

  return <TabsPanel tabs={tabs} style={{ marginTop: '24px' }} />;
}

export default ProposalsNav;
