import { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';

import MultiStepModal from 'components/Base/MultiStepModal';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import ConfirmStep from './components/ConfirmStep';
import RemarkStep from './components/RemarkStep';

import { onEscrowProposerRemark } from 'store/voting/slashing/actions';

import formTypes from 'constants/form-types';

const DEFAULT_VALUES = {
  proposerRemark: '',
};

const LocalStateContext = createContext({
  values: DEFAULT_VALUES,
  goNext: (_: Partial<typeof DEFAULT_VALUES>) => {},
  goBack: () => {},
  confirm: (_: typeof DEFAULT_VALUES) => {},
});

interface Props {
  modalOpen: boolean
  objection: Record<string, string>
  contract: string
  proposalId: string
  onHide: () => void
}

function ProposerRemarkModal ({
  modalOpen,
  objection,
  contract,
  proposalId,
  onHide
}: Props) {
  const dispatch = useDispatch();

  const { values, stepIndex, goNext, goBack, confirm, reset } = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (values) => {
      dispatch(
        onEscrowProposerRemark(
          { ...values, isAppealConfirmed: objection.appealConfirmed === 'yes' },
          contract,
          proposalId
        )
      );
    },
  });

  const handleHide = () => {
    reset();
    onHide();
  };

  useMetamaskReset(formTypes.proposerRemark, handleHide);

  return (
    <LocalStateContext.Provider value={{ values, goNext, goBack, confirm }}>
      <MultiStepModal
        stepIndex={stepIndex}
        modalOpen={modalOpen}
        title="Proposer Remark"
        onHide={handleHide}
      >
        <RemarkStep />
        <ConfirmStep />
      </MultiStepModal>
    </LocalStateContext.Provider>
  );
}

export const useProposerRemark = () => useContext(LocalStateContext);

export default ProposerRemarkModal;
