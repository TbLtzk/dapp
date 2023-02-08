import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal, Tooltip } from '@q-dev/q-ui-kit';
import { SlashingProposal } from 'typings/proposals';

import Button from 'components/Button';
import { useSlashingActions } from 'pages/Governance/hooks/useSlashingActions';

import ProposeDecisionForm from './ProposeDecisionForm';

import { useRootNodes } from 'store/root-nodes/hooks';
import { useTransaction } from 'store/transaction/hooks';
import { useUser } from 'store/user/hooks';

import { checkConfirmedDecision } from 'contracts/helpers/voting/slashing';

import { ZERO_ADDRESS } from 'constants/boundaries';
import { ObjectionStatus } from 'constants/slashing';

interface Props {
  proposal: SlashingProposal;
}

function DecisionActions ({ proposal }: Props) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { address } = useUser();
  const {
    confirmDecision,
    recallDecision,
    executeDecision
  } = useSlashingActions(proposal.contract === 'rootNodesSlashingVoting');

  const { isRootNode } = useRootNodes();
  const user = useUser();

  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { objection, decision } = proposal.objEscrow;
  const isDecisionEnded = decision.endDate.getTime() < Date.now() || objection.status === ObjectionStatus.EXECUTED;
  const isDecisionPassed = Number(decision.confirmationCount) >= Number(decision.requiredConfirmations);
  const canProposeDecision = decision.proposer !== user.address &&
    (isDecisionEnded || decision.proposer === ZERO_ADDRESS) &&
    objection.status === ObjectionStatus.PENDING;

  useEffect(() => {
    checkConfirmedDecision({ proposal, address }).then(setHasConfirmed);
    return () => setHasConfirmed(false);
  }, []);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleDecisionSubmit = () => {
    handleClose();
    setHasConfirmed(true);
  };

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {!isDecisionEnded && decision.proposer === user.address && (
        <Tooltip
          trigger={(
            <Button
              compact
              look="ghost"
              onClick={() => submitTransaction({
                successMessage: t('RECALL_DECISION_TX'),
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
              disabled={hasConfirmed || !isRootNode}
              onClick={() => submitTransaction({
                successMessage: t('VOTE_TO_CONFIRM_DECISION_TX'),
                onSuccess: () => setHasConfirmed(true),
                submitFn: () => confirmDecision(proposal.id),
              })}
            >
              {hasConfirmed ? t('YOU_VOTED') : t('VOTE_TO_CONFIRM_DECISION')}
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
                successMessage: t('EXECUTE_DECISION_TX'),
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
        <ProposeDecisionForm proposal={proposal} onSubmit={handleDecisionSubmit} />
      </Modal>
    </div>
  );
}

export default DecisionActions;
