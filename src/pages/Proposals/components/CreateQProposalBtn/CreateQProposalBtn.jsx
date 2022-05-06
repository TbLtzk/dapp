import React, { useEffect, useMemo, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { PROPOSALS_TYPES } from 'constants/statuses'
import { setCreatedStepsLimit, setCreateProposalObj, setStepCounter } from 'store/voting/proposals/action-creators'

import ModalCreateProposal from './ModalCreateProposal'
import Button from 'components/Base/Buttons/Button'

import { QExpert, QProposal, QRootNode, QSlashing } from './constants'
import { successMessageSelector } from 'store/transaction-handler/selectors'

function CreateQProposalBtn ({ activeTab }) {
  const dispatch = useDispatch()
  const shouldCloseModal = useSelector(successMessageSelector)

  const [modalShow, setModalShow] = useState(false)

  const activeTabTitle = useMemo(() => {
    switch (activeTab) {
      case PROPOSALS_TYPES.proposals:
        return QProposal
      case PROPOSALS_TYPES.rootNodePanel:
        return QRootNode
      case PROPOSALS_TYPES.expertProposals:
        return QExpert
      case PROPOSALS_TYPES.slashingProposals:
        return QSlashing
      default:
        return QProposal
    }
  }, [activeTab])

  const onCreateProposal = () => {
    setModalShow(true)
    dispatch(setStepCounter(1))
    switch (activeTab) {
      case PROPOSALS_TYPES.proposals:
        dispatch(setCreatedStepsLimit(4))
        break
      case PROPOSALS_TYPES.rootNodePanel:
        dispatch(setCreatedStepsLimit(3))
        break
      case PROPOSALS_TYPES.expertProposals:
        dispatch(setCreatedStepsLimit(3))
        break
      case PROPOSALS_TYPES.slashingProposals:
        dispatch(setCreatedStepsLimit(3))
        break
      default:
        return QProposal
    }
  }

  const onHide = () => {
    setModalShow(false)
    dispatch(setCreateProposalObj({}))
  }

  useEffect(() => {
    if (shouldCloseModal) {
      onHide()
    }
  }, [shouldCloseModal])

  return (
        <>
            <Button icon="plus-circle-outline" handleButton={onCreateProposal} title={`Create ${activeTabTitle}`} />
            <ModalCreateProposal
                activeTab={activeTab}
                activeTabTitle={activeTabTitle}
                modalShow={modalShow}
                onHide={onHide}
            />
        </>
  )
}

export default CreateQProposalBtn
