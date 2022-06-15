import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageWrap from 'components/Base/PageWrap';

import CreateProposal from './components/CreateProposal';
import ProposalFilters from './components/ProposalFilters';
import ProposalsList from './components/ProposalsList';
import ProposalsNav from './components/ProposalsNav';
import PurgeSlashing from './components/PurgeSlashing';
import VotingStats from './components/VotingStats';

import {
  contractUpdatesActiveProposalsCountSelector,
  contractUpdatesActiveProposalsSelector,
  contractUpdatesEndedProposalsCountSelector,
  contractUpdatesEndedProposalsSelector
} from 'store/voting/contract-updates/selectors';
import {
  expertActiveProposalsCountSelector,
  expertActiveProposalsSelector,
  expertEndedProposalsCountSelector,
  expertEndedProposalsSelector
} from 'store/voting/expert-proposals/selectors';
import { getProposalsByType } from 'store/voting/proposals/action-creators';
import {
  qActiveProposalsCountSelector,
  qActiveProposalsSelector,
  qEndedProposalsCountSelector,
  qEndedProposalsSelector
} from 'store/voting/q-proposals/selectors';
import {
  rootActiveProposalsCountSelector,
  rootActiveProposalsSelector,
  rootEndedProposalsCountSelector,
  rootEndedProposalsSelector
} from 'store/voting/root-node-proposals/selectors';
import {
  slashingActiveProposalsCountSelector,
  slashingActiveProposalsSelector,
  slashingEndedProposalsCountSelector,
  slashingEndedProposalsSelector
} from 'store/voting/slashing-proposals/selectors';

import { CONTRACTS_NAMES } from 'constants/contracts';
import { PROPOSALS_TYPES } from 'constants/statuses';

function Proposals ({ type }) {
  const {
    proposalsSelector,
    endedProposalsSelector,
    activeProposalsCountSelector,
    endedProposalsCountSelector,
    oneContractName,
  } = getProposalsData(type);

  const dispatch = useDispatch();
  const proposals = useSelector(proposalsSelector);
  const endedProposals = useSelector(endedProposalsSelector);
  const activeProposalsCount = useSelector(activeProposalsCountSelector);
  const endedProposalsCount = useSelector(endedProposalsCountSelector);

  function getProposalsData (type) {
    switch (type) {
      case PROPOSALS_TYPES.proposals:
        return {
          oneContractName: CONTRACTS_NAMES.constitutionVoting,
          proposalsSelector: qActiveProposalsSelector,
          endedProposalsSelector: qEndedProposalsSelector,
          activeProposalsCountSelector: qActiveProposalsCountSelector,
          endedProposalsCountSelector: qEndedProposalsCountSelector
        };
      case PROPOSALS_TYPES.rootNodePanel:
        return {
          oneContractName: CONTRACTS_NAMES.rootsVoting,
          proposalsSelector: rootActiveProposalsSelector,
          endedProposalsSelector: rootEndedProposalsSelector,
          activeProposalsCountSelector: rootActiveProposalsCountSelector,
          endedProposalsCountSelector: rootEndedProposalsCountSelector
        };
      case PROPOSALS_TYPES.expertProposals:
        return {
          oneContractName: CONTRACTS_NAMES.ePQFIMembershipVoting,
          proposalsSelector: expertActiveProposalsSelector,
          endedProposalsSelector: expertEndedProposalsSelector,
          activeProposalsCountSelector: expertActiveProposalsCountSelector,
          endedProposalsCountSelector: expertEndedProposalsCountSelector
        };
      case PROPOSALS_TYPES.slashingProposals:
        return {
          oneContractName: CONTRACTS_NAMES.rootNodesSlashingVoting,
          proposalsSelector: slashingActiveProposalsSelector,
          endedProposalsSelector: slashingEndedProposalsSelector,
          activeProposalsCountSelector: slashingActiveProposalsCountSelector,
          endedProposalsCountSelector: slashingEndedProposalsCountSelector
        };
      case PROPOSALS_TYPES.contractUpdates:
        return {
          title: 'Contract Updates',
          oneContractName: CONTRACTS_NAMES.upgradeVoting,
          proposalsSelector: contractUpdatesActiveProposalsSelector,
          endedProposalsSelector: contractUpdatesEndedProposalsSelector,
          activeProposalsCountSelector: contractUpdatesActiveProposalsCountSelector,
          endedProposalsCountSelector: contractUpdatesEndedProposalsCountSelector
        };
    }
  }

  useEffect(() => {
    dispatch(getProposalsByType(oneContractName));
  }, [dispatch, type]);

  const createProposal = type !== PROPOSALS_TYPES.contractUpdates &&
    <CreateProposal type={type} />;

  return (
    <PageWrap headerTitle="Governance" headerExtra={createProposal}>
      <div>
        <VotingStats />
        {type === PROPOSALS_TYPES.slashingProposals && <PurgeSlashing />}
      </div>

      <ProposalsNav />
      <ProposalFilters />

      <ProposalsList
        proposals={endedProposals}
        proposalsKind={type}
        proposalsCount={endedProposalsCount}
      />
    </PageWrap>
  );
}

export default Proposals;
