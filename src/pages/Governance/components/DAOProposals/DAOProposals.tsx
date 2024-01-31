import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { ProposalFilterStatus } from 'typings/proposals';

import DAOProposalFilters from './DAOProposalFilters';
import DAOProposalsList from './DAOProposalsList';

import { useDaoProposals } from 'store/proposals/hooks';

function DAOProposals () {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const { loadActiveDAOProposalsCount } = useDaoProposals();
  const [proposalStatus, setProposalStatus] = useState<ProposalFilterStatus>(getDefaultStatus());

  useEffect(() => {
    setProposalStatus(getDefaultStatus());
    loadActiveDAOProposalsCount();
  }, []);

  function getDefaultStatus () {
    const queryStatus = query.get('status');
    return queryStatus === 'active' || queryStatus === 'ended'
      ? queryStatus
      : '';
  }

  const handleStatusChange = (value: ProposalFilterStatus) => {
    setProposalStatus(value);
    loadActiveDAOProposalsCount();
  };

  return (
    <div className="proposals">
      <DAOProposalFilters
        status={proposalStatus}
        onChange={handleStatusChange}
      />

      <DAOProposalsList status={proposalStatus} />
    </div>
  );
}

export default DAOProposals;
