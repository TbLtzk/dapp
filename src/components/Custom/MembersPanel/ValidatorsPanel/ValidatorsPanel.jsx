import React, { useEffect } from 'react'

import CustomBlock from 'components/Base/CustomBlock'
import Button from 'components/Base/Buttons/Button'

import { useDispatch, useSelector } from 'react-redux'
import { getValidatorMembers } from 'store/actions/action-creaters/validators'
import { useHistory } from 'react-router-dom'
import { loadingMembers, validatorMembers } from 'store/selectors/validators'
import MemberTables from 'components/Custom/MemberTables'
import TABLE_TYPES from 'constants/tableTypes'

function ValidatorsPanel (props) {
  const { bottom, widened } = props

  const loading = useSelector(loadingMembers)
  const validators = useSelector(validatorMembers)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getValidatorMembers())
  }, [])

  return (
        <>
            <CustomBlock>
                <MemberTables
                    tableType={TABLE_TYPES.validators}
                    perPageLength={10}
                    tableArray={validators}
                    title="Validator ranking"
                    loading={loading}
                    widened={widened}
                    emptyTable="No validators"
                />
                {!bottom
                  ? (
                    <div className='card__actions'>
                        <Button
                            type='white'
                            icon="arrow-right"
                            title='See more details'
                            handleButton={() =>
                              history.push({
                                pathname: '/staking',
                                state: {
                                  activeTab: 'validator-staking'
                                }
                              })
                            }
                        />
                    </div>
                    )
                  : (
                    <div className='card__actions'>
                        <Button
                            type='white'
                            icon="arrow-right"
                            title='Go to Q Vault'
                            handleButton={() =>
                              history.push({
                                pathname: '/q-vault'
                              })
                            }
                        />
                    </div>
                    )}
            </CustomBlock>
        </>
  )
}

export default ValidatorsPanel
