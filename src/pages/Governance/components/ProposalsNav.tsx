import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MODE } from 'components/Base/DashboardMode/DashboardMode';
import TabsPanel from 'components/Base/TabsPanel';

import { mode } from 'store/dashboard-mode/selectors';
import { getContractUpdatesProposals } from 'store/voting/contract-updates/actions';
import { contractUpdatesActiveProposalsCountSelector } from 'store/voting/contract-updates/selectors';
import { getExpertProposals } from 'store/voting/expert-proposals/actions';
import { expertActiveProposalsCountSelector } from 'store/voting/expert-proposals/selectors';
import { getQProposals } from 'store/voting/q-proposals/actions';
import { qActiveProposalsCountSelector } from 'store/voting/q-proposals/selectors';
import { getRootProposals } from 'store/voting/root-node-proposals/actions';
import { rootActiveProposalsCountSelector } from 'store/voting/root-node-proposals/selectors';
import { getSlashingProposals } from 'store/voting/slashing-proposals/actions';
import { slashingActiveProposalsCountSelector } from 'store/voting/slashing-proposals/selectors';

function ProposalsNav () {
  const dispatch = useDispatch();
  const appMode = useSelector(mode);

  const qCount = useSelector(qActiveProposalsCountSelector);
  const rootCount = useSelector(rootActiveProposalsCountSelector);
  const expertCount = useSelector(expertActiveProposalsCountSelector);
  const slashingCount = useSelector(slashingActiveProposalsCountSelector);
  const contractCount = useSelector(contractUpdatesActiveProposalsCountSelector);

  useEffect(() => {
    dispatch(getQProposals());
    dispatch(getRootProposals());

    if (appMode === MODE.advanced) {
      dispatch(getExpertProposals());
      dispatch(getSlashingProposals());
      dispatch(getContractUpdatesProposals());
    }
  }, [dispatch, appMode]);

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
