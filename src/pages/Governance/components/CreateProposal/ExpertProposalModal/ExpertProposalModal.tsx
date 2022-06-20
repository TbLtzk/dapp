import { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';

import MultiStepModal from 'components/Base/MultiStepModal';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import ConfirmStep from './components/ConfirmStep';
import ManageExpertStep from './components/ManageExpertStep';
import ParameterVoteStep from './components/ParameterVoteStep';
import TypeStep from './components/TypeStep';

import { createProposal } from 'store/voting/proposals/actions';

import { CONTRACT_TYPES } from 'constants/contracts';
import formTypes from 'constants/form-types';

const DEFAULT_VALUES = {
  type: '',
  panelType: '',
  address: '',
  externalLink: '',
  params: [] as { key: string, type: string, value: string }[]
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

function ExpertProposalModal ({ modalOpen, onHide }: Props) {
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

  useMetamaskReset(formTypes.expertProposal, handleHide);

  return (
    <LocalStateContext.Provider value={{ values, goNext, goBack, confirm }}>
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
    </LocalStateContext.Provider>
  );
}

export const useCreateProposal = () => useContext(LocalStateContext);

export default ExpertProposalModal;
