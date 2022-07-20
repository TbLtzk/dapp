import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SlashingProposal } from 'typings/proposals';
import Button from 'ui/Button';
import Modal from 'ui/Modal';
import Tooltip from 'ui/Tooltip';

import useMetamaskReset from 'hooks/useMetamaskReset';

import ProposeDecisionForm from './ProposeDecisionForm';

import { isUserRootNode } from 'store/root-node/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';
import { setEscrowAction } from 'store/voting/slashing/actions';

import { ZERO_ADDRESS } from 'constants/config';
import { escrowTypes } from 'constants/escrowTypes';
import formTypes from 'constants/form-types';

interface Props {
  proposal: SlashingProposal
}

function DecisionActions ({ proposal }: Props) {
  const dispatch = useDispatch();
  const isRootNode = useSelector(isUserRootNode);
  const userAddress = useSelector(userAddressMetamask);

  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => {
    setModalOpen(false);
  };

  useMetamaskReset(formTypes.proposeDecision, handleClose);

  const handleEscrowAction = (type: string) => {
    dispatch(setEscrowAction(proposal.contract, proposal.id, type));
  };

  const decision = proposal.objEscrow.decision;

  const isDecisionEnded = decision.endDate.getTime() < Date.now();
  const isDecisionPassed = decision.confirmationCount >= decision.requiredConfirmations;
  const canProposeDecision = decision.proposer !== userAddress &&
    (isDecisionEnded || decision.proposer === ZERO_ADDRESS);

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {!isDecisionEnded && decision.proposer === userAddress && (
        <Tooltip
          trigger={(
            <Button
              compact
              look="ghost"
              onClick={() => handleEscrowAction(escrowTypes.recall)}
            >
              Recall Decision
            </Button>
          )}
        >
          The proposer of the current proposed decision may take back the decision from voting
        </Tooltip>
      )}

      {!isDecisionEnded && (
        <Tooltip
          disabled={isRootNode}
          trigger={(
            <Button
              compact
              look="secondary"
              disabled={!isRootNode}
              onClick={() => handleEscrowAction(escrowTypes.confirm)}
            >
              Vote to confirm Decision
            </Button>
          )}
        >
          Only root nodes can vote
        </Tooltip>
      )}

      {isDecisionPassed && !isDecisionEnded && (
        <Tooltip
          trigger={(
            <Button
              compact
              look="secondary"
              disabled={!isRootNode}
              onClick={() => handleEscrowAction(escrowTypes.execute)}
            >
              Execute Decision
            </Button>
          )}
        >
          Any Root Node can execute a Decision, clearing the escrow and distributing slashed amounts
          according final confirmed decision
        </Tooltip>
      )}

      {canProposeDecision && (
        <Tooltip
          disabled={isRootNode}
          trigger={(
            <Button
              compact
              look="secondary"
              disabled={!isRootNode}
              onClick={() => setModalOpen(true)}
            >
              Propose Decision
            </Button>
          )}
        >
          Only root nodes can propose decision
        </Tooltip>
      )}

      <Modal
        open={modalOpen}
        title="Propose Decision"
        tip="As a Root Node you can propose a decision that is based on an arbitral award or the explicit lack of such"
        onClose={handleClose}
      >
        <ProposeDecisionForm proposal={proposal} />
      </Modal>
    </div>
  );
}

export default DecisionActions;
