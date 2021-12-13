import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import CustomBlock from 'components/Base/CustomBlock'
import Button from 'components/Base/Buttons/Button'

import { useDispatch, useSelector } from 'react-redux'
import { getValidatorMembers } from 'store/validators/action-creators'
import { loadingMembers, validatorMembers } from 'store/validators/selectors'
import MemberTables from 'components/Custom/MemberTables'
import TABLE_TYPES from 'constants/tableTypes'

function ValidatorsPanel ({ bottom, widened }) {
  const dispatch = useDispatch()

  const loading = useSelector(loadingMembers)
  const validators = useSelector(validatorMembers)

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
                    title="Validator Ranking"
                    loading={loading}
                    widened={widened}
                    emptyTable="No validators"
                />
                {!bottom
                  ? (
                    <div className="card__actions">
                        <Button
                            type="white"
                            icon="arrow-right"
                            title="See more details"
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
                    <div className="card__actions">
                        <Button
                            type="white"
                            icon="arrow-right"
                            title="Go to Q Vault"
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
