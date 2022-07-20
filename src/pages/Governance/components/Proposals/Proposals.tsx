import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

import { ProposalFilter, ProposalFilterStatus, ProposalType } from 'typings/proposals';

import ProposalFilters from './components/ProposalFilters';
import ProposalsList from './components/ProposalsList';

import { getProposals } from 'store/voting/proposals/actions';

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
    return { status: (query.get('status') || '') as ProposalFilterStatus };
  }

  const handleFiltersChange = (value: ProposalFilter) => {
    setFilters(value);
    dispatch(getProposals(type));
  };

  return (
    <div className="proposals">
      <ProposalFilters
        type={type}
        filters={filters}
        onChange={handleFiltersChange}
      />

      <ProposalsList type={type} status={filters.status} />
    </div>
  );
}

export default Proposals;
