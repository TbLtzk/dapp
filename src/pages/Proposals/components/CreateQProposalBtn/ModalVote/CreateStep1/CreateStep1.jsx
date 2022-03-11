import React, { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { votingLockingEnd } from 'store/q-vault/selectors'
import { formVoteObject } from 'store/voting/proposals/selectors'

import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup'

import { basicVote, constitutionCheck } from './constants'

function CreateStep1 ({ register, errors }) {
  const formData = useSelector(formVoteObject)
  const userLockingEnd = useSelector(votingLockingEnd)
  const dispatch = useDispatch()

  const contentSwitcher = useCallback(() => {
    switch (formData?.first) {
      case 'basic-vote-on-proposal':
        return (
                    <>
                        <h2>{basicVote.subtitle}</h2>
                        <h2>{basicVote.radioBtnDescr}</h2>
                        <RadioBtnGroup
                            formData={formData}
                            radioArr={basicVote.radioBtn}
                            register={register}
                            errors={errors}
                            nameArr={basicVote.radioBtnName}
                            handleChange={(value) => {}}
                        />
                    </>
        )
      case 'constitution-check':
        return (
                    <>
                        <h2>{constitutionCheck.subtitle}</h2>
                        <h2>{constitutionCheck.radioBtnDescr}</h2>
                        <RadioBtnGroup
                            formData={formData}
                            radioArr={constitutionCheck.radioBtn}
                            register={register}
                            errors={errors}
                            nameArr={constitutionCheck.radioBtnName}
                            handleChange={(value) => {}}
                        />
                    </>
        )

      default:
        return null
    }
  }, [register, errors, userLockingEnd, dispatch])

  return <>{contentSwitcher()}</>
}

export default CreateStep1
