import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import CustomBlock from 'components/Base/CustomBlock'
import Button from 'components/Base/Buttons/Button'

import { useDispatch, useSelector } from 'react-redux'
import { getValidatorMembers } from 'store/validators/action-creators'
import {
  loadingValidatorsMonitoringSelector,
  loadingValidatorsShortSelector,
  loadingValidatorsWidenedSelector,
  validatorsMonitoringSelector,
  validatorsShortSelector,
  validatorsWidenedSelector
} from 'store/validators/selectors'
import MemberTables from 'components/Custom/MemberTables'
import TABLE_TYPES from 'constants/tableTypes'

const buttonsType = { qVault: 'q-vault', details: 'details', none: 'none' }

function ValidatorsPanel ({ buttons, tableType }) {
  const { table, tableLoading } = getValidatorsTableData()
  const dispatch = useDispatch()
  const history = useHistory()

  function getValidatorsTableData () {
    switch (tableType) {
      case TABLE_TYPES.validatorsWidened:
        return {
          table: useSelector(validatorsWidenedSelector),
          tableLoading: useSelector(loadingValidatorsWidenedSelector)
        }
      case TABLE_TYPES.validatorsShort:
        return {
          table: useSelector(validatorsShortSelector),
          tableLoading: useSelector(loadingValidatorsShortSelector)
        }
      case TABLE_TYPES.validatorsMonitoring:
        return {
          table: useSelector(validatorsMonitoringSelector),
          tableLoading: useSelector(loadingValidatorsMonitoringSelector)
        }
    }
  }

  useEffect(() => {
    dispatch(getValidatorMembers(tableType))
  }, [])

  const renderButtons = () => {
    switch (buttons) {
      case buttonsType.details:
        return (
                    <div className="card__actions__between">
                        <Button
                            type="white"
                            icon="arrow-right"
                            title="See more details"
                            handleButton={() =>
                              history.push({
                                pathname: '/validator-staking'
                              })
                            }
                        />
                        <Button
                            type="white"
                            icon="arrow-right"
                            title="Monitoring"
                            handleButton={() =>
                              history.push({
                                pathname: '/monitoring'
                              })
                            }
                        />
                    </div>
        )
      case buttonsType.qVault:
        return (
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
        )
      case buttonsType.none:
        return null
    }
  }

  return (
        <>
            <CustomBlock>
                <MemberTables
                    title="Validator Ranking"
                    emptyTable="No validators"
                    tableArray={table}
                    tableType={tableType}
                    loading={tableLoading}
                    perPageLength={10}
                />
                {renderButtons()}
            </CustomBlock>
        </>
  )
}

export default ValidatorsPanel
