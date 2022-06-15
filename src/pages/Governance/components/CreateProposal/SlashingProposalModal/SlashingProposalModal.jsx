import React, { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';

import MultiStepModal from 'components/Base/MultiStepModal';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import ConfirmStep from './components/ConfirmStep';
import NominateStep from './components/NominateStep';
import TypeStep from './components/TypeStep';

import { createProposal } from 'store/voting/proposals/action-creators';

import formTypes from 'constants/form-types';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

const DEFAULT_VALUES = {
  type: '',
  externalLink: '',
  address: '',
  percent: '',
};

function SlashingProposalModal ({ modalOpen, onHide }) {
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

  useMetamaskReset(formTypes.slashingProposal, handleHide);

  return (
    <LocalStateProvider value={{ values, goNext, goBack, confirm }}>
      <MultiStepModal
        stepIndex={stepIndex}
        modalOpen={modalOpen}
        title="Q Slashing Proposal"
        onHide={handleHide}
      >
        <TypeStep />
        <NominateStep />
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

export default SlashingProposalModal;
