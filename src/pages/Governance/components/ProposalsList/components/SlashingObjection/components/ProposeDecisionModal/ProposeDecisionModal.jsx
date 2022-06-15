import React, { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';

import MultiStepModal from 'components/Base/MultiStepModal';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import ConfirmStep from './components/ConfirmStep';
import DecisionStep from './components/DecisionStep';

import { onEscrowProposeDecision } from 'store/voting/slashing-proposals/action-creators';

import formTypes from 'constants/form-types';

const DEFAULT_VALUES = {
  externalLink: '',
  percentage: '',
  isAppealNeglected: false,
};

const LocalStateContext = createContext();

function ProposeDecisionModal ({ modalOpen, onHide, contract, proposalId }) {
  const dispatch = useDispatch();

  const { values, stepIndex, goNext, goBack, confirm, reset } = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (values) => {
      dispatch(onEscrowProposeDecision(values, contract, proposalId));
    },
  });

  const handleHide = () => {
    reset();
    onHide();
  };

  useMetamaskReset(formTypes.proposeDecision, handleHide);

  return (
    <LocalStateContext.Provider value={{ values, goNext, goBack, confirm }}>
      <MultiStepModal
        stepIndex={stepIndex}
        modalOpen={modalOpen}
        title="Propose Decision"
        onHide={handleHide}
      >
        <DecisionStep />
        <ConfirmStep />
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
export const useProposeDecision = () => useContext(LocalStateContext);

export default ProposeDecisionModal;
