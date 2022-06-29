import { useSelector } from 'react-redux';

import Tabs from 'ui/Tabs';

import { activeProposalsByTypeSelector } from 'store/voting/proposals/selectors';

function ProposalsNav () {
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

  return <Tabs tabs={tabs} />;
}

export default ProposalsNav;
