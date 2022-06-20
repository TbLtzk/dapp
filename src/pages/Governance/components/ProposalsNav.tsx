import { useSelector } from 'react-redux';

import { MODE } from 'components/Base/DashboardMode/DashboardMode';
import TabsPanel from 'components/Base/TabsPanel';

import { mode } from 'store/dashboard-mode/selectors';
import { activeProposalsCountByTypeSelector } from 'store/voting/proposals/selectors';

function ProposalsNav () {
  const appMode = useSelector(mode);

  const qCount = useSelector(activeProposalsCountByTypeSelector('q'));
  const rootCount = useSelector(activeProposalsCountByTypeSelector('rootNode'));
  const expertCount = useSelector(activeProposalsCountByTypeSelector('expert'));
  const slashingCount = useSelector(activeProposalsCountByTypeSelector('slashing'));
  const contractCount = useSelector(activeProposalsCountByTypeSelector('contractUpdate'));

  const tabs = [
    {
      label: 'Q Proposals',
      count: qCount,
      link: '/governance/q-proposals',
    },
    {
      label: 'Root Node Panel',
      count: rootCount,
      link: '/governance/q-root-node-panel',
    },
    ...(appMode === MODE.advanced
      ? [
        {
          label: 'Expert Proposals',
          count: expertCount,
          link: '/governance/q-expert-proposals',
        },
        {
          label: 'Slashing Proposals',
          count: slashingCount,
          link: '/governance/slashing-proposals',
        },
        {
          label: 'Contract Updates',
          count: contractCount,
          link: '/governance/contract-updates',
        },
      ]
      : []
    ),
  ];

  return <TabsPanel tabs={tabs} style={{ marginTop: '24px' }} />;
}

export default ProposalsNav;
