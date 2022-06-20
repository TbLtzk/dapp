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

import { getProposals } from 'store/voting/proposals/actions';

import { ProposalType } from 'constants/statuses';

function Proposals ({ type }: { type: ProposalType }) {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState<ProposalFilter>({
    status: 'all',
  });

  useEffect(() => {
    setFilters({ status: 'all' });
    dispatch(getProposals(type));
  }, [dispatch, type]);

  const createProposal = type !== 'contractUpdate' &&
    <CreateProposal type={type} />;

  return (
    <PageWrap
      headerTitle="Governance"
      headerExtra={createProposal}
    >
      <VotingStats />
      {type === 'slashing' && <PurgeSlashing />}

      <ProposalsNav />
      <ProposalFilters
        filters={filters}
        onChange={setFilters}
      />
      <ProposalsList type={type} />
    </PageWrap>
  );
}

export default Proposals;
