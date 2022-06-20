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

const LocalStateContext = createContext();

function ProposerRemarkModal ({ modalOpen, onHide, objection, contract, proposalId }) {
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

/**
 *
 * @returns {{
 *  values: typeof DEFAULT_VALUES,
 *  goNext: (form: typeof DEFAULT_VALUES) => void,
 *  goBack: () => void,
 *  confirm: (form: typeof DEFAULT_VALUES) => void,
 * }}
 */
export const useProposerRemark = () => useContext(LocalStateContext);

export default ProposerRemarkModal;
