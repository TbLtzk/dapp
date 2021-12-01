import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { STATUSES } from 'constants/statuses'
import { setCreatedStepsLimit, setCreateObj, setStepCounter } from 'store/modal-handler/action-creators'
import {
  onEscrowRecallProposeDecision,
  onEscrowConfirmDecision
} from 'store/voting/slashing-proposals/action-creators'

import { userAddressMetamask } from 'store/user-inf/selectors'

import ListDetails from './ListDetails'
import ModalSlashingObjection from './ModalSlashingObjection'
import LoadingSpinner from 'components/Base/LoadingSpinner'

import SlashingEscrow from 'contracts/helpers/voting-helpers/slashing-escrow-helper'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { CONTRACTS_NAMES } from 'constants/contracts'

function SlashingObjection ({ contract, proposalId, objData }) {
  const [modalShow, setModalShow] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [activeModal, setActiveModal] = useState('')
  const dispatch = useDispatch()
  const userAddress = useSelector(userAddressMetamask)

  const objectionData = useMemo(() => {
    return [
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
  }, [objData?.objection])

  const decisionData = useMemo(() => {
    return [
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
  }, [objData?.decision])

  const onRecallCurrentDecision = useCallback(() => {
    dispatch(onEscrowRecallProposeDecision(contract, proposalId))
  }, [dispatch])

  const onConfirmCurrentDecision = useCallback(() => {
    dispatch(onEscrowConfirmDecision(contract, proposalId))
  }, [dispatch])

  const onShowModal = (activeTab) => {
    dispatch(setStepCounter(1))
    dispatch(setCreatedStepsLimit(2))
    setActiveModal(activeTab)
    setModalShow(true)
    dispatch(setCreateObj({ first: activeTab }))
  }

  const onCastObjection = () => {
    onShowModal('cast-objection')
  }

  const onProposeDecision = () => {
    onShowModal('propose-decision')
  }

  const onConfirmAppeal = () => {
    onShowModal('proposer-remark')
  }

  const executeDecision = async () => {
    setIsPending(true)
    const slashingEscrowContract = new SlashingEscrow(
      contract === CONTRACTS_NAMES.validatorsSlashingVoting
        ? CONTRACTS_NAMES.validatorsSlashingEscrow
        : CONTRACTS_NAMES.rootNodesSlashingEscrow
    )
    try {
      await slashingEscrowContract.execute(proposalId, userAddress)
    } catch (e) {
      console.error(e)
    }
    setIsPending(false)
  }

  const executeDecisionBTN = (
        <Dropdown.Item onClick={executeDecision}>
            {isPending
              ? (
                <LoadingSpinner />
                )
              : (
                <>
                    <i className={'mdi mdi-play btn-icon'} />
                    Execute Decision
                </>
                )}
        </Dropdown.Item>
  )
  return (
        <div>
            <div className="list-card__tow-colm" style={{ marginBottom: '20px' }}>
                <h3>Slashing Objection</h3>
                <div style={{ textAlign: 'right' }}>
                    <DropdownButton menuAlign="right" title="Actions" id="dropdown-menu-align-right">
                        <Dropdown.Item onClick={onCastObjection}>
                            <i className={'mdi mdi-cast btn-icon'} />
                            Cast Objection
                        </Dropdown.Item>
                        <Dropdown.Item onClick={onConfirmAppeal}>
                            <i className={'mdi mdi-cast btn-icon'} />
                            Confirm Appeal initiated by Slashing Candidate
                        </Dropdown.Item>
                        <Dropdown.Item onClick={onProposeDecision}>
                            <i className={'mdi mdi-arrow-decision btn-icon'} />
                            Propose Decision
                        </Dropdown.Item>
                        <Dropdown.Item onClick={onConfirmCurrentDecision}>
                            <i className={'mdi mdi-vote btn-icon'} />
                            Vote to confirm Decision
                        </Dropdown.Item>
                        <Dropdown.Item onClick={onRecallCurrentDecision}>
                            <i className={'mdi mdi-repeat btn-icon'} />
                            Recall Decision
                        </Dropdown.Item>
                        {objData.objection.statusObjection === STATUSES.decided && executeDecisionBTN}
                    </DropdownButton>
                </div>
            </div>
            <div className="list-card__tow-colm">
                <div>
                    <h4>Objection</h4>
                    <ListDetails list={objectionData} />
                </div>
                <div>
                    <h4>Decision</h4>
                    <ListDetails list={decisionData} />
                </div>
            </div>
            <ModalSlashingObjection
                contract={contract}
                proposalId={proposalId}
                activeTab={activeModal}
                modalShow={modalShow}
                onHide={() => {
                  setModalShow(false)
                  dispatch(setCreateObj({}))
                }}
            />
        </div>
  )
}

export default SlashingObjection
