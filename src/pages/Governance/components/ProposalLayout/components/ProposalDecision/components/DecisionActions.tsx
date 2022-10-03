import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SlashingProposal } from 'typings/proposals';

import { useSlashingActions } from 'pages/Governance/hooks/useSlashingActions';
import Button from 'ui/Button';
import Modal from 'ui/Modal';
import Tooltip from 'ui/Tooltip';

import ProposeDecisionForm from './ProposeDecisionForm';

import { useRootNodes } from 'store/root-nodes/hooks';
import { useTransaction } from 'store/transaction/hooks';
import { useUser } from 'store/user/hooks';

import { ZERO_ADDRESS } from 'constants/boundaries';
import { ObjectionStatus } from 'constants/slashing';

interface Props {
  proposal: SlashingProposal;
}

function DecisionActions ({ proposal }: Props) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const {
    confirmDecision,
    recallDecision,
    executeDecision
  } = useSlashingActions(proposal.contract === 'rootNodesSlashingVoting');

  const { isRootNode } = useRootNodes();
  const user = useUser();

  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => {
    setModalOpen(false);
  };

  const decision = proposal.objEscrow.decision;

  const isDecisionEnded = decision.endDate.getTime() < Date.now();
  const isDecisionPassed = Number(decision.confirmationCount) >= Number(decision.requiredConfirmations);
  const canProposeDecision = decision.proposer !== user.address &&
    (isDecisionEnded || decision.proposer === ZERO_ADDRESS) &&
    proposal.objEscrow.objection.status === ObjectionStatus.PENDING;

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {!isDecisionEnded && decision.proposer === user.address && (
        <Tooltip
          trigger={(
            <Button
              compact
              look="ghost"
              onClick={() => submitTransaction({
                successMessage: t('RECALL_DECISION_SUCCESS'),
                submitFn: () => recallDecision(proposal.id)
              })}
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
              onClick={() => submitTransaction({
                successMessage: t('VOTE_TO_CONFIRM_DECISION_SUCCESS'),
                submitFn: () => confirmDecision(proposal.id),
              })}
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
              onClick={() => submitTransaction({
                successMessage: t('EXECUTE_DECISION_SUCCESS'),
                submitFn: () => executeDecision(proposal.id),
              })}
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
        <ProposeDecisionForm proposal={proposal} onSubmit={handleClose} />
      </Modal>
    </div>
  );
}

export default DecisionActions;
