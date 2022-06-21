import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

import { ProposalFilter, ProposalFilterStatus } from 'typings/filters';

import PageWrap from 'components/Base/PageWrap';

import CreateProposal from './components/CreateProposal';
import ProposalFilters from './components/ProposalFilters/ProposalFilters';
import ProposalsList from './components/ProposalsList/ProposalsList';
import ProposalsNav from './components/ProposalsNav';
import VotingStats from './components/VotingStats';

import { getProposals } from 'store/voting/proposals/actions';

import { ProposalType } from 'constants/statuses';

function Proposals ({ type }: { type: ProposalType }) {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const [filters, setFilters] = useState<ProposalFilter>(getDefaultFilters());

  useEffect(() => {
    setFilters(getDefaultFilters());
    dispatch(getProposals(type));
  }, [dispatch, type]);

  function getDefaultFilters () {
    return { status: query.get('status') as ProposalFilterStatus || 'all' };
  }

  const handleFiltersChange = (value: ProposalFilter) => {
    setFilters(value);
    dispatch(getProposals(type));
  };

  const createProposal = type !== 'contractUpdate' &&
    <CreateProposal type={type} />;

  return (
    <PageWrap
      pageHeader="Governance"
      pageButton={createProposal}
    >
      <VotingStats type={type} />
      <ProposalsNav />
      <ProposalFilters
        filters={filters}
        onChange={handleFiltersChange}
      />
      <ProposalsList type={type} status={filters.status} />
    </PageWrap>
  );
}

export default Proposals;
