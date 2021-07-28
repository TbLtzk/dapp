import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  setCreatedStepsLimit,
  setCreateProposalObj,
  setDisabledCreatedProposalBtn
} from 'store/actions/action-creaters/voting/proposals'
import { formObject } from 'store/selectors/voting/proposals'

import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup'

function CreateStep1 (props) {
  const {
    activeTab,
    activeTabTitle,
    register,
    errors,
    radioArr
  } = props
  const dispatch = useDispatch()

  const formData = useSelector(formObject)

  const onChooseProposal = useCallback((value) => {
    const radioVal = value.target.value
    dispatch(setCreateProposalObj({ first: radioVal }))
    dispatch(setDisabledCreatedProposalBtn(false))

    switch (activeTab) {
      case 'q-proposals':
        switch (radioVal) {
          case 'constitution-update':
            dispatch(setCreatedStepsLimit(4))
            break
          case 'general-q-update':
            dispatch(setCreatedStepsLimit(3))
            break
          case 'emergency-update':
            dispatch(setCreatedStepsLimit(3))
            break
        }
        break
      default:
        return []
    }
  }, [])

  return (
    <div>
      <h2>
        Please select type of {activeTabTitle}
      </h2>

      <RadioBtnGroup
        formData={formData}
        register={register}
        errors={errors}
        nameArr="first"
        radioArr={radioArr}
        handleChange={onChooseProposal}
      />
    </div>
  )
}

export default CreateStep1
