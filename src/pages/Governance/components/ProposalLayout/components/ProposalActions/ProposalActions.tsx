import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProposalStatus } from '@q-dev/q-js-sdk';
import { Proposal } from 'typings/proposals';
import Button from 'ui/Button';
import Modal from 'ui/Modal';
import Tooltip from 'ui/Tooltip';

import { ShareButton } from 'components/ShareButton';

import useMetamaskReset from 'hooks/useMetamaskReset';

import VoteForm from './components/VoteForm';

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
import formTypes from 'constants/form-types';

interface Props {
  proposal: Proposal
  title: string
}

function ProposalActions ({ proposal, title }: Props) {
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
    CONTRACTS_NAMES.emergencyUpdateVoting
  ].includes(proposal.contract);

  const isApprovalContract = [
    CONTRACTS_NAMES.addressVoting,
    CONTRACTS_NAMES.upgradeVoting
  ].includes(proposal.contract);

  const getVotingState = (): { tooltip: string, enabled: boolean } => {
    switch (true) {
      case isApprovalContract || isContractWithoutVeto:
        return { enabled: isRootNode, tooltip: 'Only root nodes can vote' };
      case proposal.contract === CONTRACTS_NAMES.ePRSParametersVoting:
        return { enabled: isEPRSMember, tooltip: 'Only Q Root Node selection experts can vote' };
      case proposal.contract === CONTRACTS_NAMES.ePDRParametersVoting:
        return { enabled: isEPDRMember, tooltip: 'Only DeFi risk experts can vote' };
      case proposal.contract === CONTRACTS_NAMES.ePQFIParametersVoting:
        return { enabled: isEPQFIMember, tooltip: 'Only Q Fees & Incentives experts can vote' };
      default:
        return { enabled: true, tooltip: '' };
    }
  };

  const votingState = getVotingState();
  const isVetoShown = proposal.status === ProposalStatus.ACCEPTED &&
    !isContractWithoutVeto && !isApprovalContract;

  const voteText = isApprovalContract ? 'Approve' : 'Vote';

  const handleVote = () => {
    if (isApprovalContract) {
      dispatch(voteForProposal({ type: 'approve', proposal }));
      return;
    }

    setModalOpen(true);
  };

  const handleVeto = () => {
    dispatch(voteForProposal({ type: 'constitution', proposal }));
  };

  const handleExecute = () => {
    dispatch(executeProposal(proposal));
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <ShareButton
        title={`#${proposal.id} ${title}`}
        url={window.location.href}
      />

      {proposal.status === ProposalStatus.PENDING && (
        <Tooltip
          disabled={votingState.enabled}
          trigger={(
            <Button
              style={{ width: '160px' }}
              disabled={proposal.userVoted || !votingState.enabled}
              onClick={handleVote}
            >
              {proposal.userVoted ? 'You voted' : voteText}
            </Button>
          )}
        >
          {votingState.tooltip}
        </Tooltip>
      )}

      {isVetoShown && (
        <Tooltip
          disabled={isRootNode}
          trigger={(
            <Button
              look="danger"
              style={{ width: '160px' }}
              disabled={proposal.userVetoed || !isRootNode}
              onClick={handleVeto}
            >
              {proposal.userVetoed ? 'You vetoed' : 'Veto'}
            </Button>
          )}
        >
          Only root nodes can veto
        </Tooltip>
      )}

      {proposal.status === ProposalStatus.PASSED && (
        <Button onClick={handleExecute}>Execute</Button>
      )}

      <Modal
        open={modalOpen}
        title="Vote"
        tip="Your currently locked amount of Q inside the Q Vault will be extended until the end of this proposal"
        onClose={handleClose}
      >
        <VoteForm proposal={proposal} />
      </Modal>
    </div>
  );
}

export default ProposalActions;
