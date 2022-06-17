import { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';

import MultiStepModal from 'components/Base/MultiStepModal';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import ConfirmStep from './components/ConfirmStep';
import LinkStep from './components/LinkStep';

import { onEscrowCastObjection } from 'store/voting/slashing-proposals/actions';

import formTypes from 'constants/form-types';

const DEFAULT_VALUES = {
  externalLink: '',
};

const LocalStateContext = createContext();

function CastObjectionModal ({ modalOpen, onHide, contract, proposalId }) {
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

/**
 *
 * @returns {{
 *  values: typeof DEFAULT_VALUES,
 *  goNext: (form: typeof DEFAULT_VALUES) => void,
 *  goBack: () => void,
 *  confirm: (form: typeof DEFAULT_VALUES) => void,
 * }}
 */
export const useCastObjection = () => useContext(LocalStateContext);

export default CastObjectionModal;
