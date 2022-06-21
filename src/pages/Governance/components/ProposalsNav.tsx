import { useSelector } from 'react-redux';

import TabsPanel from 'components/Base/TabsPanel';

import { activeProposalsByTypeSelector } from 'store/voting/proposals/selectors';

function ProposalsNav () {
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
  ];

  return <TabsPanel tabs={tabs} style={{ marginTop: '16px' }} />;
}

export default ProposalsNav;
