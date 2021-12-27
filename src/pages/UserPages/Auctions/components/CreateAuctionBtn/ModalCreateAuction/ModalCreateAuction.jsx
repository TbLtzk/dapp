import React, { useCallback, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setCreateObj, setStepCounter } from 'store//modal-handler/action-creators'
import { createAuction } from 'store/auctions/action-creators'
import { ProgressBar } from 'react-bootstrap'

import { formObject, createdStepsLimit, stepCounterModal } from 'store/modal-handler/selectors'

import { useForm } from 'react-hook-form'

import ModalWindow from 'components/Base/ModalWindow'
import CreateStep1 from './CreateStep1'
import CreateStep2 from './CreateStep2'

function ModalCreateAuction ({ modalShow, onHide, activeTab }) {
  const { register, errors, handleSubmit } = useForm()
  const dispatch = useDispatch()

  const formData = useSelector(formObject)
  const stepLimit = useSelector(createdStepsLimit)
  const stepCounter = useSelector(stepCounterModal)
  const [bid, setBid] = useState('')

  const switchContentDependsOnType = useCallback(() => {
    switch (stepCounter) {
      case 1:
        return (
                    <CreateStep1
                        formData={formData}
                        activeTab={activeTab}
                        register={register}
                        errors={errors}
                        onChangeInput={(value) => setBid(value)}
                    />
        )
      case 2:
        return <CreateStep2 formData={formData} activeTab={activeTab} register={register} errors={errors} />

      default:
        return null
    }
  }, [activeTab, stepCounter, register, errors, stepLimit])

  const onNext = (data) => {
    dispatch(setCreateObj({ ...formData, ...data, bid }))
    if (stepCounter < stepLimit) {
      dispatch(setStepCounter(stepCounter + 1))
    } else {
      dispatch(createAuction({ ...formData, ...data }))
      onHide()
    }
  }

  return (
        <ModalWindow
            show={modalShow}
            onHide={onHide}
            modalTitle={'Create ' + activeTab?.replace(/-/g, ' ') + ' auction'}
            backBtnTitle={stepCounter !== 1 ? 'Back' : null}
            backBtnHandler={() => {
              dispatch(setStepCounter(stepCounter - 1))
            }}
            continueBtnTitle={stepLimit !== stepCounter ? 'Next' : 'Confirm'}
            continueBtnHandler={handleSubmit(onNext)}
            content={
                <>
                    <ProgressBar now={((stepCounter / stepLimit) * 100).toFixed(3)} />
                    <div className="modal__steps">
                        Step {stepCounter} of {stepLimit}
                    </div>
                    <form>{switchContentDependsOnType()}</form>
                </>
            }
        />
  )
}

export default ModalCreateAuction
