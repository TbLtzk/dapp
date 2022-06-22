import { useState } from 'react';
import { useDispatch } from 'react-redux';

import CastObjectionModal from './components/CastObjectionModal';
import DecisionActions from './components/DecisionActions';
import DecisionDetails from './components/DecisionDetails';
import ObjectionDetails from './components/ObjectionDetails';
import ProposeDecisionModal from './components/ProposeDecisionModal';
import ProposerRemarkModal from './components/ProposerRemarkModal';
import SlashingActions from './components/SlashingActions';
import { SlashingObjectionContainer } from './styles';

import { setEscrowAction } from 'store/voting/slashing/actions';

import { slashingTypes } from 'constants/slashingTypes';

interface Props {
  contract: string
  proposalId: string
  objData: {
    objection: Record<string, string>
    decision: Record<string, string>
    types: Record<string, boolean>
  }
}

function SlashingObjection ({ contract, proposalId, objData }: Props) {
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const openModal = (type: string) => {
    setModalType(type);
    setModalOpen(true);
  };

  const handleHideModal = () => {
    setModalOpen(false);
  };

  const handleEscrowAction = (type: string) => {
    dispatch(setEscrowAction(contract, proposalId, type));
  };

  const modalProps = {
    modalOpen,
    contract,
    proposalId,
    objection: objData.objection,
    onHide: handleHideModal,
  };

  const modalMap = {
    [slashingTypes.castObjection]: <CastObjectionModal {...modalProps} />,
    [slashingTypes.proposeDecision]: <ProposeDecisionModal {...modalProps} />,
    [slashingTypes.proposerRemark]: <ProposerRemarkModal {...modalProps} />,
  };

  return (
    <SlashingObjectionContainer>
      <h3>Slashing Objection</h3>

      <div className="list-card__tow-colm">
        <ObjectionDetails objection={objData.objection} />
        <DecisionDetails decision={objData.decision} />
      </div>

      <div className="list-card__line" />

      <div className="action__buttons">
        <SlashingActions
          isRootNode={objData.types.isRootNode}
          onAction={openModal}
        />

        <DecisionActions
          recallDecision={objData.types.recallDecision}
          isRootNode={objData.types.isRootNode}
          onAction={handleEscrowAction}
        />
      </div>

      {modalMap[modalType]}
    </SlashingObjectionContainer>
  );
}

export default SlashingObjection;
