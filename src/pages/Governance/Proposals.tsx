import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import PageWrap from 'components/Base/PageWrap';

import CreateProposal from './components/CreateProposal';
import ProposalFilters from './components/ProposalFilters/ProposalFilters';
import ProposalsList from './components/ProposalsList';
import ProposalsNav from './components/ProposalsNav';
import PurgeSlashing from './components/PurgeSlashing';
import VotingStats from './components/VotingStats';
import { ProposalFilter } from './types';

import { getProposalsByType } from 'store/voting/proposals/actions';

import { CONTRACTS_NAMES } from 'constants/contracts';
import { ProposalType } from 'constants/statuses';

function Proposals ({ type }: { type: ProposalType }) {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState<ProposalFilter>({
    status: 'all',
  });

  const proposalToContractMap: Record<ProposalType, string> = {
    'q-proposals': CONTRACTS_NAMES.constitutionVoting,
    'q-root-node-panel': CONTRACTS_NAMES.rootsVoting,
    'q-expert-proposals': CONTRACTS_NAMES.ePQFIMembershipVoting,
    'slashing-proposals': CONTRACTS_NAMES.rootNodesSlashingVoting,
    'contract-updates': CONTRACTS_NAMES.upgradeVoting,
  };

  useEffect(() => {
    setFilters({ status: 'all' });
    dispatch(getProposalsByType(proposalToContractMap[type]));
  }, [dispatch, type]);

  const createProposal = type !== 'contract-updates' &&
    <CreateProposal type={type} />;

  return (
    <PageWrap
      headerTitle="Governance"
      headerExtra={createProposal}
    >
      <VotingStats />
      {type === 'slashing-proposals' && <PurgeSlashing />}

      <ProposalsNav />
      <ProposalFilters
        filters={filters}
        onChange={setFilters}
      />
      <ProposalsList />
    </PageWrap>
  );
}

export default Proposals;
