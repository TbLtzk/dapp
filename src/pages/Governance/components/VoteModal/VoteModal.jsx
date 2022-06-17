import { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';

import MultiStepModal from 'components/Base/MultiStepModal';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import BasicVoteStep from './components/BasicVoteStep';
import ConfirmStep from './components/ConfirmStep';
import ConstitutionVoteStep from './components/ConstitutionVoteStep';

import { voteForProposal } from 'store/voting/proposals/actions';

import formTypes from 'constants/form-types';
import { STATUSES } from 'constants/statuses';
import { VOTING_TYPES } from 'constants/votingTypes';

const DEFAULT_VALUES = {
  isVotedFor: false,
};

const LocalStateContext = createContext();

function VoteModal ({ modalOpen, proposal, onHide }) {
  const dispatch = useDispatch();

  const isPendingProposal = proposal.status === STATUSES.pending;
  const type = isPendingProposal
    ? VOTING_TYPES.basic
    : VOTING_TYPES.constitution;

  const { values, stepIndex, goNext, goBack, confirm, reset } = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (values) => {
      dispatch(
        voteForProposal({
          ...values,
          type,
          proposalId: proposal.id,
          contract: proposal.contract
        })
      );
    },
  });

  const handleHide = () => {
    reset();
    onHide();
  };

  useMetamaskReset(formTypes.vote, handleHide);

  return (
    <LocalStateContext.Provider value={{ values, goNext, goBack, confirm }}>
      <MultiStepModal
        stepIndex={stepIndex}
        modalOpen={modalOpen}
        title={`${isPendingProposal ? 'Vote' : 'Veto'} for proposal`}
        onHide={handleHide}
      >
        {isPendingProposal ? <BasicVoteStep /> : <ConstitutionVoteStep />}
        <ConfirmStep type={type} contract={proposal.contract} />
      </MultiStepModal>
    </LocalStateContext.Provider>
  );
}

/**
 *
 * @returns {{
 *  values: typeof DEFAULT_VALUES,
 *  goNext: (form: typeof DEFAULT_VALUES) => void,
 *  goBack: () => void,
 *  confirm: (form: typeof DEFAULT_VALUES) => void,
 * }}
 */
export const useVote = () => useContext(LocalStateContext);

export default VoteModal;
