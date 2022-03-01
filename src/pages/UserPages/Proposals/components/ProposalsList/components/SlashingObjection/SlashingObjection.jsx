import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCreatedStepsLimit, setCreateObj, setStepCounter } from 'store/modal-handler/action-creators'
import { setEscrowAction } from 'store/voting/slashing-proposals/action-creators'
import ListDetails from './ListDetails'
import ModalSlashingObjection from './ModalSlashingObjection'
import { SlashingObjectionContainer } from './ModalSlashingObjection/styles'
import Button from 'components/Base/Buttons/Button'
import { escrowTypes, slashingTypes } from './ModalSlashingObjection/CreateStep1/constants'
import { CONTRACTS_NAMES } from 'constants/contracts'
import { setVoteProposalObj } from 'store/voting/proposals/action-creators'

function SlashingObjection ({ contract, proposalId, objData }) {
  const dispatch = useDispatch()

  const [modalShow, setModalShow] = useState(false)
  const [activeModal, setActiveModal] = useState('')

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
  ]

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
  ]

  const onEscrowAction = (escrowType) => {
    const contractName = CONTRACTS_NAMES.validatorsSlashingVoting
      ? CONTRACTS_NAMES.validatorsSlashingEscrow
      : CONTRACTS_NAMES.rootNodesSlashingEscrow

    dispatch(setEscrowAction(contractName, proposalId, escrowType))
    dispatch(setVoteProposalObj({ contract, id: proposalId }))
  }

  const onShowModal = (activeTab) => {
    setModalShow(true)
    setActiveModal(activeTab)
    dispatch(setStepCounter(1))
    dispatch(setCreatedStepsLimit(2))
    dispatch(setCreateObj({ first: activeTab }))
  }

  const onHide = () => {
    setModalShow(false)
    dispatch(setCreateObj({}))
  }

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

            <div className="action__buttons">
                <div>
                    <Button
                        margin="10px 10px 10px 10px"
                        handleButton={() => onShowModal(slashingTypes.castObjection)}
                        title="Cast Objection"
                    />
                    <Button
                        margin="10px 10px 10px 10px"
                        whiteSpace="normal"
                        handleButton={() => onShowModal(slashingTypes.proposerRemark)}
                        width="120px"
                        title="Confirm appeal"
                    />

                    <Button
                        margin="10px 10px 10px 10px"
                        handleButton={() => onShowModal(slashingTypes.proposeDecision)}
                        width="140px"
                        title="Propose Decision"
                    />
                </div>
                <div>
                    <Button
                        margin="10px 10px 10px 10px"
                        handleButton={() => onEscrowAction(escrowTypes.confirm)}
                        title="Vote to confirm Decision"
                    />
                    <Button
                        margin="10px 10px 10px 10px"
                        handleButton={() => onEscrowAction(escrowTypes.recall)}
                        width="120px"
                        title="Recall Decision"
                    />
                    <Button
                        margin="10px 10px 10px 10px"
                        width="140px"
                        handleButton={() => onEscrowAction(escrowTypes.execute)}
                        title="Execute Decision"
                    />
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
  )
}

export default SlashingObjection
