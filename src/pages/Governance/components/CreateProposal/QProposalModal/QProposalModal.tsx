import { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';

import MultiStepModal from 'components/Base/MultiStepModal';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import ConfirmStep from './components/ConfirmStep';
import ConstitutionStep from './components/ConstitutionStep';
import LinkStep from './components/LinkStep';
import ParamsStep from './components/ParamsStep';
import TypeStep from './components/TypeStep';

import { createProposal } from 'store/voting/proposals/actions';

import { CONTRACT_TYPES } from 'constants/contracts';
import formTypes from 'constants/form-types';

const DEFAULT_VALUES = {
  type: '',
  classification: '',
  hash: '',
  externalLink: '',
  isParamsChanged: false,
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

function QProposalModal ({ modalOpen, onHide }: Props) {
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

  useMetamaskReset(formTypes.qProposal, handleHide);

  const isConstitutionType = values.type === CONTRACT_TYPES.constitutionUpdate;
  const shouldChangeParams = isConstitutionType && values.isParamsChanged;

  return (
    <LocalStateContext.Provider value={{ values, goNext, goBack, confirm }}>
      <MultiStepModal
        stepIndex={stepIndex}
        modalOpen={modalOpen}
        title="Q Proposal"
        onHide={handleHide}
      >
        <TypeStep />
        {isConstitutionType ? <ConstitutionStep /> : <LinkStep />}
        {shouldChangeParams ? <ParamsStep /> : <ConfirmStep />}
        {values.params.length > 0 && <ConfirmStep />}
      </MultiStepModal>
    </LocalStateContext.Provider>
  );
}

export const useCreateProposal = () => useContext(LocalStateContext);

export default QProposalModal;
