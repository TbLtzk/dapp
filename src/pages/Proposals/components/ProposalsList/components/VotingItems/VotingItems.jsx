import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import Tooltip from 'components/Base/Tooltip';

import ModalVote from '../ModalVote';

import {
  isUserEPDRMembershipSelector,
  isUserEPQFIMembershipSelector,
  isUserEPRSMembershipSelector
} from 'store/membership/selectors';
import { isUserRootNode } from 'store/root-node/selectors';
import {
  executeProposal,
  setStepVoteCounter,
  setVoteProposalObj,
  voteForProposal
} from 'store/voting/proposals/action-creators';

import { CONTRACTS_NAMES } from 'constants/contracts';

const PROPOSAL_STATUS = {
  passed: 'Passed',
  pending: 'Pending',
  accepted: 'Accepted'
};

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

function VotingItems ({ proposal }) {
  const dispatch = useDispatch();

  const isRootNode = useSelector(isUserRootNode);
  const isEPDRMembership = useSelector(isUserEPDRMembershipSelector);
  const isEPQFIMembership = useSelector(isUserEPQFIMembershipSelector);
  const isEPRSMembership = useSelector(isUserEPRSMembershipSelector);

  const [modalShow, setModalShow] = useState(false);

  const contractsWithoutVeto =
        proposal.contract === CONTRACTS_NAMES.validatorsSlashingVoting ||
        proposal.contract === CONTRACTS_NAMES.emergencyUpdateVoting;

  const epqfiParametersVoting = proposal.contract === CONTRACTS_NAMES.ePQFIParametersVoting;
  const eprsParametersVoting = proposal.contract === CONTRACTS_NAMES.ePRSParametersVoting;
  const epdrParametersVoting = proposal.contract === CONTRACTS_NAMES.ePDRParametersVoting;

  const approvalContracts =
        proposal.contract === CONTRACTS_NAMES.addressVoting || proposal.contract === CONTRACTS_NAMES.upgradeVoting;

  function checkVoteUser () {
    switch (true) {
      case proposal.status === PROPOSAL_STATUS.accepted:
        return { disabled: true, info: TOOLTIP_INFO.votePeriod };
      case proposal.userVoted:
        return { disabled: proposal.userVoted, info: TOOLTIP_INFO.userVoted };
      case approvalContracts: {
        return { disabled: !isRootNode, info: TOOLTIP_INFO.isNotRootNode };
      }
      case contractsWithoutVeto:
        return {
          disabled: !isRootNode,
          info: isRootNode ? TOOLTIP_INFO.votePeriod : TOOLTIP_INFO.isNotRootNode
        };
      case eprsParametersVoting:
        return { disabled: !isEPRSMembership, info: TOOLTIP_INFO.isEprsExpert };
      case epdrParametersVoting:
        return { disabled: !isEPDRMembership, info: TOOLTIP_INFO.isDeFiExpert };
      case epqfiParametersVoting:
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
      case proposal.status === PROPOSAL_STATUS.pending:
        return { disabled: true, info };
      case proposal.status === PROPOSAL_STATUS.accepted:
        return { disabled: !isRootNode, info };
      default:
        return { disabled: true, info: '' };
    }
  }

  const isUserCanVote = checkVoteUser();
  const isUserCanVeto = checkVetoUser();

  const onProposalVote = () => {
    setModalShow(true);
  };

  const onProposalExecute = () => {
    dispatch(
      executeProposal({
        idProposal: proposal.id,
        contract: proposal.contract
      })
    );
  };

  const onChooseTypeOfVoting = () => {
    const type = proposal.status === 'Pending' ? 'basic-vote-on-proposal' : 'constitution-check';
    dispatch(setVoteProposalObj({ first: type, contract: proposal.contract, id: proposal.id }));
  };

  const handleVote = () => {
    onProposalVote();
    onChooseTypeOfVoting();
  };

  const handleApprove = () => {
    dispatch(setVoteProposalObj({ contract: proposal.contract, id: proposal.id }));
    dispatch(voteForProposal({ contract: proposal.contract, id: proposal.id, first: 'approve' }));
  };

  const handleHideModal = () => {
    setModalShow(false);
    dispatch(setStepVoteCounter(1));
  };

  const addCardLine = proposal.status === 'Passed' || proposal.status === 'Pending' || proposal.status === 'Accepted';

  return (
    <div>
      {addCardLine ? <div className="list-card__line" /> : null}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {proposal.status === 'Passed' ? <Button handleButton={onProposalExecute} title="Execute" /> : null}
        {proposal.status === 'Pending' || proposal.status === 'Accepted'
          ? (
            <>
              <Tooltip disabled={!isUserCanVote.disabled} additionalInfo={isUserCanVote.info}>
                <Button
                  icon="checkbox-marked-outline"
                  width="100px"
                  title={approvalContracts ? 'Approve' : 'Vote'}
                  disabled={isUserCanVote.disabled}
                  handleButton={approvalContracts ? handleApprove : handleVote}
                />
              </Tooltip>
              {contractsWithoutVeto || approvalContracts
                ? null
                : (
                  <>
                    <div style={{ width: '20px' }} />
                    <Tooltip disabled={!isUserCanVeto.disabled} additionalInfo={isUserCanVeto.info}>
                      <Button
                        icon="window-close"
                        width="100px"
                        title="Veto"
                        disabled={isUserCanVeto.disabled}
                        handleButton={handleVote}
                      />
                    </Tooltip>
                  </>
                )}
            </>
          )
          : null}
      </div>
      {modalShow
        ? (
          <ModalVote
            proposalStatus={proposal.status}
            proposalContract={proposal.contract}
            proposalId={proposal.id}
            vetoEndTime={proposal.vetoEndTime}
            activeTab={0}
            modalShow={modalShow}
            onHide={handleHideModal}
          />
        )
        : null}
    </div>
  );
}

export default VotingItems;
