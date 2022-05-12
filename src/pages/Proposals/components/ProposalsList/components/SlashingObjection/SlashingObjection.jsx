import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'components/Base/Button';
import Tooltip from 'components/Base/Tooltip';

import { SlashingObjectionContainer } from './ModalSlashingObjection/styles';
import ListDetails from './ListDetails';
import ModalSlashingObjection from './ModalSlashingObjection';

import { setCreatedStepsLimit, setCreateObj, setStepCounter } from 'store/modal-handler/action-creators';
import { setVoteProposalObj } from 'store/voting/proposals/action-creators';
import { setEscrowAction } from 'store/voting/slashing-proposals/action-creators';

import { CONTRACTS_NAMES } from 'constants/contracts';
import { escrowTypes } from 'constants/escrowTypes';
import { slashingTypes } from 'constants/slashingTypes';

const INFO = {
  castObjection: 'The slashed party can object to this executed slashing proposal and seek for an arbitral award.',
  confirmApeal: 'Slashing proposer confirms that a slashed node has initiated a court appeal to receive an arbitral award.',
  proposeDecision: 'Any Root Node can propose a decision that is based on an arbitral award or the explicit lack of such.',
  voteToConfirmDecision: 'Any Root Node is obliged to vote and confirm proposed decision.',
  recallDecision: 'The proposer of the current proposed decision may take back the decision from voting.',
  executeDecision: 'Any Root Node can execute a Decision, clearing the escrow and distributing slashed amounts according final confirmed decision.',
  notRootNode: 'User is not a Root Node'
};

function SlashingObjection ({ contract, proposalId, objData }) {
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);
  const [activeModal, setActiveModal] = useState('');

  const objectionData = [
    {
      title: 'Status',
      value: objData.objection.statusObjection
    },
    {
      title: 'Remark',
      value: objData.objection.remark
    },
    {
      title: 'Proposer Remark',
      value: String(objData.objection.proposerRemark)
    },
    {
      title: 'Candidate Appeal Confirmation',
      value: String(objData.objection.appealConfirmed)
    },
    {
      title: 'Executed',
      value: String(objData.objection.executed)
    },
    {
      title: 'Slashed Amount',
      value: objData.objection.slashedAmount + ' Q'
    },
    {
      title: 'Objection End Time',
      value: objData.objection.objectionEndTime
    },
    {
      title: 'Appeal End Time',
      value: objData.objection.appealEndTime
    }
  ];

  const decisionData = [
    {
      title: 'Current Decision Proposer',
      value: objData.decision.proposer
    },
    {
      title: 'Current Decision End Time',
      value: objData.decision.endDate
    },
    {
      title: 'Remark',
      value: objData.decision.externalReference
    },
    {
      title: 'Adjusted Slashing Percentage',
      value: objData.decision.percentage + ' %'
    },
    {
      title: 'Current Confirmation Count',
      value: objData.decision.confirmationCount
    },
    {
      title: 'Required Confirmations',
      value: objData.decision.requiredConfirmations
    },
    {
      title: 'Current Confirmation Percentage',
      value: objData.decision.currentConfirmationPercentage + ' %'
    }
  ];

  const onEscrowAction = (escrowType) => {
    const contractName = CONTRACTS_NAMES.validatorsSlashingVoting
      ? CONTRACTS_NAMES.validatorsSlashingEscrow
      : CONTRACTS_NAMES.rootNodesSlashingEscrow;
    dispatch(setEscrowAction(contractName, proposalId, escrowType));
    dispatch(setVoteProposalObj({ contract, id: proposalId }));
  };

  const onShowModal = (activeTab) => {
    setModalShow(true);
    setActiveModal(activeTab);
    dispatch(setStepCounter(1));
    dispatch(setCreatedStepsLimit(2));
    dispatch(setCreateObj({ first: activeTab }));
  };

  const onHide = () => {
    setModalShow(false);
    dispatch(setCreateObj({}));
  };
  const { isRootNode, recallDecision, objection } = objData.types;

  const voteToConfirmDecitionButton = isRootNode ? INFO.voteToConfirmDecision : INFO.notRootNode;
  const executeDecisionButton = isRootNode ? INFO.executeDecision : INFO.notRootNode;
  const proposeDecisionButton = isRootNode ? INFO.proposeDecision : INFO.notRootNode;

  return (
    <SlashingObjectionContainer>
      <h3>Slashing Objection</h3>

      <div className="list-card__tow-colm">
        <div>
          <h6>Objection</h6>
          <ListDetails list={objectionData} />
        </div>
        <div>
          <h6>Decision</h6>
          <ListDetails list={decisionData} />
        </div>
      </div>
      <div className="list-card__line" />

      <div className="action__buttons">
        <div>
          <Tooltip shown={true} additionalInfo={INFO.castObjection}>
            <Button
              disabled={!objection}
              margin="10px 10px 10px 10px"
              width="175px"
              title="Cast Objection"
              onClick={() => onShowModal(slashingTypes.castObjection)}
            />
          </Tooltip>

          <Tooltip shown={true} additionalInfo={INFO.confirmApeal}>
            <Button
              margin="10px 10px 10px 10px"
              width="175px"
              title="Confirm appeal"
              onClick={() => onShowModal(slashingTypes.proposerRemark)}
            />
          </Tooltip>

          <Tooltip shown={true} additionalInfo={proposeDecisionButton}>
            <Button
              disabled={!isRootNode}
              margin="10px 10px 10px 10px"
              width="175px"
              title="Propose Decision"
              onClick={() => onShowModal(slashingTypes.proposeDecision)}
            />
          </Tooltip>
        </div>
        <div>
          <Tooltip shown={true} additionalInfo={INFO.recallDecision}>
            <Button
              disabled={!recallDecision}
              margin="10px 10px 10px 10px"
              width="175px"
              title="Recall Decision"
              onClick={() => onEscrowAction(escrowTypes.recall)}
            />
          </Tooltip>
          <Tooltip shown={true} additionalInfo={voteToConfirmDecitionButton}>
            <Button
              disabled={!isRootNode}
              margin="10px 10px 10px 10px"
              width="175px"
              title="Vote to confirm Decision"
              onClick={() => onEscrowAction(escrowTypes.confirm)}
            />
          </Tooltip>

          <Tooltip shown={true} additionalInfo={executeDecisionButton}>
            <Button
              disabled={!isRootNode}
              margin="10px 10px 10px 10px"
              width="175px"
              title="Execute Decision"
              onClick={() => onEscrowAction(escrowTypes.execute)}
            />
          </Tooltip>
        </div>
      </div>

      <ModalSlashingObjection
        contract={contract}
        proposalId={proposalId}
        activeTab={activeModal}
        modalShow={modalShow}
        onHide={onHide}
      />
    </SlashingObjectionContainer>
  );
}

export default SlashingObjection;
