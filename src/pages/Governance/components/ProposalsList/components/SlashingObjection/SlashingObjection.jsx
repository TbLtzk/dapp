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

import { setEscrowAction } from 'store/voting/slashing-proposals/action-creators';

import { slashingTypes } from 'constants/slashingTypes';

function SlashingObjection ({ contract, proposalId, objData }) {
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const handleHideModal = () => {
    setModalOpen(false);
  };

  const handleEscrowAction = (type) => {
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
          objection={objData.types.objection}
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
