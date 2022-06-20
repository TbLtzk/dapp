import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import Tooltip from 'components/Base/Tooltip';

import VoteModal from './VoteModal';

import {
  isUserEPDRMembershipSelector,
  isUserEPQFIMembershipSelector,
  isUserEPRSMembershipSelector
} from 'store/membership/selectors';
import { isUserRootNode } from 'store/root-node/selectors';
import {
  executeProposal,
  voteForProposal
} from 'store/voting/proposals/actions';

import { CONTRACTS_NAMES } from 'constants/contracts';
import { STATUSES } from 'constants/statuses';
import { VOTING_TYPES } from 'constants/votingTypes';

const TOOLTIP_INFO = {
  votePeriod: 'Voting period has ended.',
  userVoted: 'User already voted.',
  vetoPeriod: 'Veto period not started or ended.',
  userVetoed: 'User already vetoed.',
  isNotRootNode: 'User is not root node.',
  isDeFiExpert: 'User is not member of DeFi risk expert panel.',
  isFeesExpert: 'User is not member of Q fees & incentives expert panel.',
  isEprsExpert: 'User is not member of Q Root Node selection expert panel.'
};

function VotingItems ({ proposal }: { proposal: any }) {
  const dispatch = useDispatch();

  const isRootNode = useSelector(isUserRootNode);
  const isEPDRMembership = useSelector(isUserEPDRMembershipSelector);
  const isEPQFIMembership = useSelector(isUserEPQFIMembershipSelector);
  const isEPRSMembership = useSelector(isUserEPRSMembershipSelector);

  const [modalOpen, setModalOpen] = useState(false);

  const isContractWithoutVeto = [
    CONTRACTS_NAMES.validatorsSlashingVoting,
    CONTRACTS_NAMES.emergencyUpdateVoting
  ].includes(proposal.contract);

  const isApprovalContract = [
    CONTRACTS_NAMES.addressVoting,
    CONTRACTS_NAMES.upgradeVoting
  ].includes(proposal.contract);

  function checkVoteUser () {
    switch (true) {
      case proposal.status === STATUSES.accepted:
        return { disabled: true, info: TOOLTIP_INFO.votePeriod };
      case proposal.userVoted:
        return { disabled: proposal.userVoted, info: TOOLTIP_INFO.userVoted };
      case isApprovalContract:
        return { disabled: !isRootNode, info: TOOLTIP_INFO.isNotRootNode };
      case isContractWithoutVeto:
        return {
          disabled: !isRootNode,
          info: isRootNode ? TOOLTIP_INFO.votePeriod : TOOLTIP_INFO.isNotRootNode
        };
      case proposal.contract === CONTRACTS_NAMES.ePRSParametersVoting:
        return { disabled: !isEPRSMembership, info: TOOLTIP_INFO.isEprsExpert };
      case proposal.contract === CONTRACTS_NAMES.ePDRParametersVoting:
        return { disabled: !isEPDRMembership, info: TOOLTIP_INFO.isDeFiExpert };
      case proposal.contract === CONTRACTS_NAMES.ePQFIParametersVoting:
        return { disabled: !isEPQFIMembership, info: TOOLTIP_INFO.isFeesExpert };
      default:
        return { disabled: false, info: '' };
    }
  }

  function checkVetoUser () {
    const info = isRootNode ? TOOLTIP_INFO.vetoPeriod : TOOLTIP_INFO.isNotRootNode;
    switch (true) {
      case proposal.userVetoed:
        return { disabled: true, info: TOOLTIP_INFO.userVetoed };
      case proposal.status === STATUSES.pending:
        return { disabled: true, info };
      case proposal.status === STATUSES.accepted:
        return { disabled: !isRootNode, info };
      default:
        return { disabled: true, info: '' };
    }
  }

  const userVote = checkVoteUser();
  const userVeto = checkVetoUser();

  const onProposalExecute = () => {
    dispatch(
      executeProposal({
        idProposal: proposal.id,
        contract: proposal.contract
      })
    );
  };

  const handleVote = () => {
    setModalOpen(true);
  };

  const handleApprove = () => {
    dispatch(voteForProposal({
      type: VOTING_TYPES.approve,
      contract: proposal.contract,
      proposalId: proposal.id,
    }));
  };

  const isLineShown = [
    STATUSES.passed,
    STATUSES.pending,
    STATUSES.accepted
  ].includes(proposal.status);

  return (
    <div>
      {isLineShown && <div className="list-card__line" />}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {proposal.status === STATUSES.passed && (
          <Button onClick={onProposalExecute}>Execute</Button>
        )}

        {(proposal.status === STATUSES.pending || proposal.status === STATUSES.accepted) && (
          <>
            <Tooltip disabled={!userVote.disabled} additionalInfo={userVote.info}>
              <Button
                style={{ width: '100px' }}
                disabled={userVote.disabled}
                onClick={isApprovalContract ? handleApprove : handleVote}
              >
                <i className="mdi mdi-checkbox-marked-outline" />
                <span>{isApprovalContract ? 'Approve' : 'Vote'}</span>
              </Button>
            </Tooltip>

            {!isContractWithoutVeto && !isApprovalContract && (
              <>
                <div style={{ width: '20px' }} />
                <Tooltip disabled={!userVeto.disabled} additionalInfo={userVeto.info}>
                  <Button
                    style={{ width: '100px' }}
                    disabled={userVeto.disabled}
                    onClick={handleVote}
                  >
                    <i className="mdi mdi-window-close" />
                    <span>Veto</span>
                  </Button>
                </Tooltip>
              </>
            )}
          </>
        )}
      </div>

      <VoteModal
        modalOpen={modalOpen}
        proposal={proposal}
        onHide={() => setModalOpen(false)}
      />
    </div>
  );
}

export default VotingItems;
