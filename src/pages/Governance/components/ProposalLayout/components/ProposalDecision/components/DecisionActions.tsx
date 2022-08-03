import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isRootNode = useSelector(isUserRootNode);
  const userAddress = useSelector(userAddressMetamask);

  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => {
    setModalOpen(false);
  };

  useMetamaskReset(formTypes.proposeDecision, handleClose);

  const handleEscrowAction = (type: string, label: string) => {
    dispatch(setEscrowAction(proposal.contract, proposal.id, type, label));
  };

  const decision = proposal.objEscrow.decision;

  const isDecisionEnded = decision.endDate.getTime() < Date.now();
  const isDecisionPassed = decision.confirmationCount >= decision.requiredConfirmations;
  const canProposeDecision = decision.proposer !== userAddress &&
    (isDecisionEnded || decision.proposer === ZERO_ADDRESS);

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {!isDecisionEnded && decision.proposer === userAddress && (
        <Tooltip
          trigger={(
            <Button
              compact
              look="ghost"
              onClick={() => handleEscrowAction(escrowTypes.recall, t('RECALL_DECISION_SUCCESS'))}
            >
              {t('RECALL_DECISION')}
            </Button>
          )}
        >
          {t('RECALL_DECISION_TIP')}
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
              onClick={() => handleEscrowAction(escrowTypes.confirm, t('VOTE_TO_CONFIRM_DECISION_SUCCESS'))}
            >
              {t('VOTE_TO_CONFIRM_DECISION')}
            </Button>
          )}
        >
          {t('ROOT_NODES_VOTE_TIP')}
        </Tooltip>
      )}

      {isDecisionPassed && !isDecisionEnded && (
        <Tooltip
          trigger={(
            <Button
              compact
              look="secondary"
              disabled={!isRootNode}
              onClick={() => handleEscrowAction(escrowTypes.execute, t('EXECUTE_DECISION_SUCCESS'))}
            >
              {t('EXECUTE_DECISION')}
            </Button>
          )}
        >
          {t('EXECUTE_DECISION_TIP')}
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
              {t('PROPOSE_DECISION')}
            </Button>
          )}
        >
          {t('PROPOSE_DECISION_TIP')}
        </Tooltip>
      )}

      <Modal
        open={modalOpen}
        title={t('PROPOSE_DECISION')}
        tip={t('PROPOSE_DECISION_MODAL_TIP')}
        onClose={handleClose}
      >
        <ProposeDecisionForm proposal={proposal} />
      </Modal>
    </div>
  );
}

export default DecisionActions;
