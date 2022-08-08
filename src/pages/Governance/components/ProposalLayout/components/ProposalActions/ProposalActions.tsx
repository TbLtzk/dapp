import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ProposalStatus } from '@q-dev/q-js-sdk';
import { Proposal } from 'typings/proposals';

import { ShareButton } from 'components/ShareButton';
import Button from 'ui/Button';
import Modal from 'ui/Modal';
import Tooltip from 'ui/Tooltip';

import useMetamaskReset from 'hooks/useMetamaskReset';

import VoteForm from './components/VoteForm';

import {
  isUserEPDRMembershipSelector,
  isUserEPQFIMembershipSelector,
  isUserEPRSMembershipSelector,
} from 'store/membership/selectors';
import { isUserRootNode } from 'store/root-node/selectors';
import { executeProposal, voteForProposal } from 'store/voting/proposals/actions';

import { CONTRACTS_NAMES } from 'constants/contracts';
import formTypes from 'constants/form-types';

interface Props {
  proposal: Proposal;
  title: string;
}

function ProposalActions ({ proposal, title }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isRootNode = useSelector(isUserRootNode);
  const isEPDRMember = useSelector(isUserEPDRMembershipSelector);
  const isEPQFIMember = useSelector(isUserEPQFIMembershipSelector);
  const isEPRSMember = useSelector(isUserEPRSMembershipSelector);

  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => {
    setModalOpen(false);
  };

  useMetamaskReset(formTypes.vote, handleClose);

  const isContractWithoutVeto = [
    CONTRACTS_NAMES.validatorsSlashingVoting,
    CONTRACTS_NAMES.emergencyUpdateVoting,
  ].includes(proposal.contract);

  const isApprovalContract = [CONTRACTS_NAMES.addressVoting, CONTRACTS_NAMES.upgradeVoting].includes(proposal.contract);

  const getVotingState = (): { tooltip: string; enabled: boolean } => {
    switch (true) {
      case isApprovalContract || isContractWithoutVeto:
        return { enabled: isRootNode, tooltip: t('ROOT_NODES_VOTE_TIP') };
      case proposal.contract === CONTRACTS_NAMES.ePRSParametersVoting:
        return { enabled: isEPRSMember, tooltip: t('ROOT_NODE_SELECTION_EXPERTS_VOTE_TIP') };
      case proposal.contract === CONTRACTS_NAMES.ePDRParametersVoting:
        return { enabled: isEPDRMember, tooltip: t('DEFI_RISK_EXPERTS_VOTE_TIP') };
      case proposal.contract === CONTRACTS_NAMES.ePQFIParametersVoting:
        return { enabled: isEPQFIMember, tooltip: t('FEES_INCENTIVES_EXPERTS_VOTE_TIP') };
      default:
        return { enabled: true, tooltip: '' };
    }
  };

  const votingState = getVotingState();
  const isVetoShown = proposal.status === ProposalStatus.ACCEPTED && !isContractWithoutVeto && !isApprovalContract;

  const voteText = isApprovalContract ? t('APPROVE') : t('VOTE');
  const voteTextForTransaction = isApprovalContract ? t('APPROVE_SUCCESS') : t('VOTE_SUCCESS');

  const handleVote = () => {
    if (isApprovalContract) {
      dispatch(voteForProposal({ type: 'approve', proposal }, voteTextForTransaction));
      return;
    }

    setModalOpen(true);
  };

  const handleVeto = () => {
    dispatch(voteForProposal({ type: 'constitution', proposal }, t('VETO_SUCCESS')));
  };

  const handleExecute = () => {
    dispatch(executeProposal(proposal, t('EXECUTE_SUCCESS')));
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <ShareButton title={`#${proposal.id} ${title}`} url={window.location.href} />

      {proposal.status === ProposalStatus.PENDING && (
        <Tooltip
          disabled={votingState.enabled}
          trigger={
            <Button
              style={{ width: '160px' }}
              disabled={proposal.userVoted || !votingState.enabled}
              onClick={handleVote}
            >
              {proposal.userVoted ? t('YOU_VOTED') : voteText}
            </Button>
          }
        >
          {votingState.tooltip}
        </Tooltip>
      )}

      {isVetoShown && (
        <Tooltip
          disabled={isRootNode}
          trigger={
            <Button
              look="danger"
              style={{ width: '160px' }}
              disabled={proposal.userVetoed || !isRootNode}
              onClick={handleVeto}
            >
              {proposal.userVetoed ? t('YOU_VETOED') : t('VETO')}
            </Button>
          }
        >
          {t('ROOT_NODES_VETO_TIP')}
        </Tooltip>
      )}

      {proposal.status === ProposalStatus.PASSED && <Button onClick={handleExecute}>{t('EXECUTE')}</Button>}

      <Modal
        open={modalOpen}
        title={t('VOTE')}
        tip={t('VOTE_MODAL_TIP')}
        onClose={handleClose}
      >
        <VoteForm proposal={proposal} />
      </Modal>
    </div>
  );
}

export default ProposalActions;
