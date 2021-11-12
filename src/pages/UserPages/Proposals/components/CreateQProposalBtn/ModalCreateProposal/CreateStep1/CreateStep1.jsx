import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  setCreatedStepsLimit,
  setCreateProposalObj,
  setDisabledCreatedProposalBtn
} from 'store/voting/proposals/action-creators'
import { formObject } from 'store/voting/proposals/selectors'
import { CONTRACT_TYPES } from 'constants/contracts'

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
          case CONTRACT_TYPES.constitutionUpdate:
            dispatch(setCreatedStepsLimit(4))
            break
          case CONTRACT_TYPES.generalQUpdate:
          case CONTRACT_TYPES.emergencyUpdate:
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
