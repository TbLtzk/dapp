import { useDispatch, useSelector } from 'react-redux';

import { MODE } from 'components/Base/DashboardMode/DashboardMode';
import TabsPanel from 'components/Base/TabsPanel';

import { mode } from 'store/dashboard-mode/selectors';

function ProposalsNav () {
  const dispatch = useDispatch();
  const appMode = useSelector(mode);

  // const qCount = useSelector(qActiveProposalsCountSelector);
  // const rootCount = useSelector(rootActiveProposalsCountSelector);
  // const expertCount = useSelector(expertActiveProposalsCountSelector);
  // const slashingCount = useSelector(slashingActiveProposalsCountSelector);
  // const contractCount = useSelector(contractUpdatesActiveProposalsCountSelector);

  const qCount = 2;
  const rootCount = 2;
  const expertCount = 2;
  const slashingCount = 2;
  const contractCount = 2;

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
