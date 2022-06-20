import { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';

import MultiStepModal from 'components/Base/MultiStepModal';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import ConfirmStep from './components/ConfirmStep';
import LinkStep from './components/LinkStep';

import { onEscrowCastObjection } from 'store/voting/slashing/actions';

import formTypes from 'constants/form-types';

const DEFAULT_VALUES = {
  externalLink: '',
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

function CastObjectionModal ({ modalOpen, contract, proposalId, onHide }: Props) {
  const dispatch = useDispatch();

  const { values, stepIndex, goNext, goBack, confirm, reset } = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (values) => {
      dispatch(onEscrowCastObjection(values, contract, proposalId));
    },
  });

  const handleHide = () => {
    reset();
    onHide();
  };

  useMetamaskReset(formTypes.castObjection, handleHide);

  return (
    <LocalStateContext.Provider value={{ values, goNext, goBack, confirm }}>
      <MultiStepModal
        stepIndex={stepIndex}
        modalOpen={modalOpen}
        title="Cast Objection"
        onHide={handleHide}
      >
        <LinkStep />
        <ConfirmStep />
      </MultiStepModal>
    </LocalStateContext.Provider>
  );
}

export const useCastObjection = () => useContext(LocalStateContext);

export default CastObjectionModal;
