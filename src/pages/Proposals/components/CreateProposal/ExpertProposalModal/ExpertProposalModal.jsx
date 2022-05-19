import React, { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';

import MultiStepModal from 'components/Base/MultiStepModal';

import { useMultiStepForm } from 'hooks/useMultiStepForm';

import ConfirmStep from './components/ConfirmStep';
import ManageExpertStep from './components/ManageExpertStep';
import ParameterVoteStep from './components/ParameterVoteStep';
import TypeStep from './components/TypeStep';

import { createProposal } from 'store/voting/proposals/action-creators';

import { CONTRACT_TYPES } from 'constants/contracts';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

const DEFAULT_VALUES = {
  type: '',
  panelType: '',
  address: '',
  externalLink: '',
  params: []
};

function ExpertProposalModal ({ modalOpen, onHide }) {
  const dispatch = useDispatch();

  const { values, stepIndex, goNext, goBack, confirm, reset } = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (values) => {
      dispatch(createProposal(values));
    },
  });

  const handleHide = () => {
    reset();
    onHide();
  };

  return (
    <LocalStateProvider value={{ values, goNext, goBack, confirm }}>
      <MultiStepModal
        stepIndex={stepIndex}
        modalOpen={modalOpen}
        title="Q Expert Proposal"
        onHide={handleHide}
      >
        <TypeStep />
        {values.type === CONTRACT_TYPES.parameterVote
          ? <ParameterVoteStep />
          : <ManageExpertStep />
        }
        <ConfirmStep />
      </MultiStepModal>
    </LocalStateProvider>
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
export const useCreateProposal = () => useContext(LocalStateContext);

export default ExpertProposalModal;
