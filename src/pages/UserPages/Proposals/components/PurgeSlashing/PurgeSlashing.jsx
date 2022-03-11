import Button from 'components/Base/Buttons/Button'
import CustomBlock from 'components/Base/CustomBlock'
import FormInput from 'components/Base/Form/FormInput'
import Tooltip from 'components/Base/Tooltip'
import { CONTRACT_TYPES } from 'constants/contracts'
import { isAddress } from 'func/useful'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { isUserRootNode } from 'store/root-node/selectors'
import { setPurgeSlashing } from 'store/voting/slashing-proposals/action-creators'
import { PurgeSlashingContainer } from './styles'

const USER_NOT_ROOT_NODE = 'User is not root node'

function PurgeSlashing () {
  const dispatch = useDispatch()
  const isRootNode = useSelector(isUserRootNode)

  const { register, handleSubmit, errors, setValue, clearErrors } = useForm({ mode: 'onChange' })

  function handlePurge (formData, contractType) {
    dispatch(setPurgeSlashing(formData.slashingAddress, contractType))
    setValue('slashingAddress', null)
  }

  return (
        <CustomBlock onClick={() => clearErrors()}>
            <h1>Purge Slashing</h1>
            <FormInput
                color={true}
                name="slashingAddress"
                type="text"
                placeholder="Candidate address"
                valid={errors.slashingAddress?.message}
                ref={register({
                  required: 'Field is required!',
                  validate: (address) => (isAddress(address) ? true : 'Incorrect address')
                })}
            />
            <PurgeSlashingContainer>
                <Tooltip disabled={isRootNode} additionalInfo={USER_NOT_ROOT_NODE}>
                    <Button
                        disabled={!isRootNode}
                        title="Purge Root Node"
                        width="150px"
                        handleButton={handleSubmit((data) => handlePurge(data, CONTRACT_TYPES.rootNodes))}
                    />
                </Tooltip>
                <Tooltip disabled={isRootNode} additionalInfo={USER_NOT_ROOT_NODE}>
                    <Button
                        disabled={!isRootNode}
                        width="150px"
                        title="Purge Validator"
                        handleButton={handleSubmit((data) => handlePurge(data, CONTRACT_TYPES.validators))}
                    />
                </Tooltip>
            </PurgeSlashingContainer>
        </CustomBlock>
  )
}

export default PurgeSlashing
