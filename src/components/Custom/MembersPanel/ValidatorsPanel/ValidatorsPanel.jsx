import React, { useEffect } from 'react'

import LoadingSpinner from 'components/Base/LoadingSpinner'
import CustomBlock from 'components/Base/CustomBlock'
import Button from 'components/Base/Buttons/Button'

import { useDispatch, useSelector } from 'react-redux'
import { getValidatorMembers } from 'store/actions/action-creaters/validators'
import { useHistory } from 'react-router-dom'
import { LoadingWrap } from '../styles'
import { loadingMembers, validatorMembers } from 'store/selectors/validators'
import MemberTables from 'components/Custom/MemberTables'

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
                {loading
                  ? (
                    <LoadingWrap>
                        <LoadingSpinner />
                    </LoadingWrap>
                    )
                  : validators.length === 0
                    ? (
                    <p>No validators</p>
                      )
                    : (
                    <MemberTables
                        tableType="validators"
                        perPageLength={10}
                        tableArray={validators}
                        title="Validator Ranking"
                        loading={loading}
                        widened={widened}
                    />
                      )}

                {!bottom
                  ? (
                    <div className={'card__actions'}>
                        <Button
                            type={'white'}
                            icon="arrow-right"
                            title={'See more details'}
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
                    <div className={'card__actions'}>
                        <Button
                            type={'white'}
                            icon="arrow-right"
                            title={'Go to Q Vault'}
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
