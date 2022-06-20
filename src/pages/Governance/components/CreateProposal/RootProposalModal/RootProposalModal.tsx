import { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';

import MultiStepModal from 'components/Base/MultiStepModal';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import AddNodeStep from './components/AddNodeStep';
import ConfirmStep from './components/ConfirmStep';
import RemoveNodeStep from './components/RemoveNodeStep';
import TypeStep from './components/TypeStep';

import { createProposal } from 'store/voting/proposals/actions';

import { CONTRACT_TYPES } from 'constants/contracts';
import formTypes from 'constants/form-types';

const DEFAULT_VALUES = {
  type: '',
  externalLink: '',
  address: '',
  hash: '',
  isRemovingNode: false
};

const LocalStateContext = createContext({
  values: DEFAULT_VALUES,
  goNext: (_: Partial<typeof DEFAULT_VALUES>) => {},
  goBack: () => {},
  confirm: (_: typeof DEFAULT_VALUES) => {},
});

interface Props {
  modalOpen: boolean
  onHide: () => void
}

function RootProposalModal ({ modalOpen, onHide }: Props) {
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
    <LocalStateContext.Provider value={{ values, goNext, goBack, confirm }}>
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
    </LocalStateContext.Provider>
  );
}

export const useCreateProposal = () => useContext(LocalStateContext);

export default RootProposalModal;
