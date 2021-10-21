import React, { useCallback, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  setVoteProposalObj,
  setDisabledCreatedProposalBtn
} from 'store/actions/action-creaters/voting/proposals'
import { CONTRACTS_NAMES } from 'constants/contracts'

import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup'

import { formVoteObject } from 'store/selectors/voting/proposals'

function CreateStep1 (props) {
  const { register, errors, proposalContract } = props
  const dispatch = useDispatch()
  const formData = useSelector(formVoteObject)
  const [voteTypes, setVoteTypes] = useState([
    'Basic Vote on Proposal',
    'Constitution Check',
    'Q Community Veto'
  ])
  const onChooseProposal = useCallback((value) => {
    const radioVal = value.target.value
    dispatch(setVoteProposalObj({ first: radioVal }))
    dispatch(setDisabledCreatedProposalBtn(false))
  }, [])

  useEffect(() => {
    switch (proposalContract) {
      case CONTRACTS_NAMES.validatorsSlashingVoting:
      case CONTRACTS_NAMES.emergencyUpdateVoting:
        setVoteTypes([
          'Basic Vote on Proposal',
          'Q Community Veto'
        ])
    }
  }, [proposalContract])

  return (
    <div>
      <h2>Please select type of Vote</h2>

      <RadioBtnGroup
        formData={formData}
        register={register}
        errors={errors}
        nameArr="first"
        radioArr={voteTypes}
        handleChange={onChooseProposal}
      />
    </div>
  )
}

export default CreateStep1
