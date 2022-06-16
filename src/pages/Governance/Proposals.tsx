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
import { ProposalType } from 'constants/statuses';

function Proposals ({ type }: { type: ProposalType }) {
  const dispatch = useDispatch();

  const proposalToContractMap: Record<ProposalType, string> = {
    'q-proposals': CONTRACTS_NAMES.constitutionVoting,
    'q-root-node-panel': CONTRACTS_NAMES.rootsVoting,
    'q-expert-proposals': CONTRACTS_NAMES.ePQFIMembershipVoting,
    'slashing-proposals': CONTRACTS_NAMES.rootNodesSlashingVoting,
    'contract-updates': CONTRACTS_NAMES.upgradeVoting,
  };

  useEffect(() => {
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
      <ProposalFilters />
      <ProposalsList type={type} />
    </PageWrap>
  );
}

export default Proposals;
