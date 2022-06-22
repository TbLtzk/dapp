import { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';

import MultiStepModal from 'components/Base/MultiStepModal';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import ConfirmStep from './components/ConfirmStep';
import DecisionStep from './components/DecisionStep';

import { onEscrowProposeDecision } from 'store/voting/slashing/actions';

import formTypes from 'constants/form-types';

const DEFAULT_VALUES = {
  externalLink: '',
  percentage: '',
  isAppealNeglected: false as string | boolean,
};

const LocalStateContext = createContext({
  values: DEFAULT_VALUES,
  goNext: (_: Partial<typeof DEFAULT_VALUES>) => {},
  goBack: () => {},
  confirm: (_: typeof DEFAULT_VALUES) => {},
});

interface Props {
  modalOpen: boolean
  contract: string
  proposalId: string
  onHide: () => void
}

function ProposeDecisionModal ({ modalOpen, contract, proposalId, onHide }: Props) {
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

export const useProposeDecision = () => useContext(LocalStateContext);

export default ProposeDecisionModal;
