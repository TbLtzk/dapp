import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PageWrap from 'components/Base/PageWrap';

import CreateProposal from './components/CreateProposal';
import ProposalFilters from './components/ProposalFilters';
import ProposalsList from './components/ProposalsList';
import ProposalsNav from './components/ProposalsNav';
import PurgeSlashing from './components/PurgeSlashing';
import VotingStats from './components/VotingStats';

import { getProposalsByType } from 'store/voting/proposals/action-creators';

import { CONTRACTS_NAMES } from 'constants/contracts';
import { PROPOSALS_TYPES, ProposalType } from 'constants/statuses';

function Proposals ({ type }: { type: ProposalType }) {
  const dispatch = useDispatch();

  const contractName = {
    [PROPOSALS_TYPES.proposals]: CONTRACTS_NAMES.constitutionVoting,
    [PROPOSALS_TYPES.rootNodePanel]: CONTRACTS_NAMES.rootsVoting,
    [PROPOSALS_TYPES.expertProposals]: CONTRACTS_NAMES.ePQFIMembershipVoting,
    [PROPOSALS_TYPES.slashingProposals]: CONTRACTS_NAMES.rootNodesSlashingVoting,
    [PROPOSALS_TYPES.contractUpdates]: CONTRACTS_NAMES.upgradeVoting,
  }[type];

  useEffect(() => {
    dispatch(getProposalsByType(contractName));
  }, [dispatch, type]);

  const createProposal = type !== PROPOSALS_TYPES.contractUpdates &&
    <CreateProposal type={type} />;

  return (
    <PageWrap
      headerTitle="Governance"
      headerExtra={createProposal}
    >
      <VotingStats />
      {type === PROPOSALS_TYPES.slashingProposals && <PurgeSlashing />}

      <ProposalsNav />
      <ProposalFilters />
      <ProposalsList type={type} />
    </PageWrap>
  );
}

export default Proposals;
