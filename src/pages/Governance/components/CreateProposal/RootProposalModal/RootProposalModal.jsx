import { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';

import MultiStepModal from 'components/Base/MultiStepModal';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import AddNodeStep from './components/AddNodeStep';
import ConfirmStep from './components/ConfirmStep';
import RemoveNodeStep from './components/RemoveNodeStep';
import TypeStep from './components/TypeStep';

import { createProposal } from 'store/voting/proposals/action-creators';

import { CONTRACT_TYPES } from 'constants/contracts';
import formTypes from 'constants/form-types';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

const DEFAULT_VALUES = {
  type: '',
  externalLink: '',
  address: '',
  hash: '',
  isRemovingNode: false
};

function RootProposalModal ({ modalOpen, onHide }) {
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

  useMetamaskReset(formTypes.rootNodeProposal, handleHide);

  return (
    <LocalStateProvider value={{ values, goNext, goBack, confirm }}>
      <MultiStepModal
        stepIndex={stepIndex}
        modalOpen={modalOpen}
        title="Q Root Node Panel Proposal"
        onHide={handleHide}
      >
        <TypeStep />
        {values.type === CONTRACT_TYPES.addAnewRootNode
          ? <AddNodeStep />
          : <RemoveNodeStep />
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

export default RootProposalModal;
