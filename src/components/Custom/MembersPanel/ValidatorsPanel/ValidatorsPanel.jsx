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
import { columnsValidatorsWidened, columnsValidatorsMonitoring } from 'constants/columns'

import { tableValidatorsWidened, tableValidatorsShort, tableValidatorsMonitoring } from 'constants/tables'

const buttonsType = { qVault: 'q-vault', details: 'details', none: 'none' }

function ValidatorsPanel ({ buttons, tableType }) {
  const { tableSelector, tableLoadingSelector, columns, tableWrapper } = getValidatorsTableData()
  const dispatch = useDispatch()
  const table = tableWrapper(useSelector(tableSelector))
  const tableLoading = useSelector(tableLoadingSelector)

  const history = useHistory()

  function getValidatorsTableData () {
    switch (tableType) {
      case TABLE_TYPES.validatorsWidened:
        return {
          tableSelector: validatorsWidenedSelector,
          tableLoadingSelector: loadingValidatorsWidenedSelector,
          columns: columnsValidatorsWidened,
          tableWrapper: tableValidatorsWidened
        }
      case TABLE_TYPES.validatorsShort:
        return {
          tableSelector: validatorsShortSelector,
          tableLoadingSelector: loadingValidatorsShortSelector,
          columns: columnsValidatorsWidened.slice(0, 3),
          tableWrapper: tableValidatorsShort
        }
      case TABLE_TYPES.validatorsMonitoring:
        return {
          tableSelector: validatorsMonitoringSelector,
          tableLoadingSelector: loadingValidatorsMonitoringSelector,
          columns: columnsValidatorsMonitoring,
          tableWrapper: tableValidatorsMonitoring
        }
    }
  }

  useEffect(() => {
    if (tableType === TABLE_TYPES.validatorsMonitoring) {
      setInterval(() => {
        dispatch(getValidatorMembers(tableType))
      }, 60000)
    } else {
      dispatch(getValidatorMembers(tableType))
    }
  }, [dispatch, tableType])

  const renderButtons = () => {
    switch (buttons) {
      case buttonsType.details:
        return (
                    <div className="card__actions__between">
                        <Button
                            alwaysEnabled
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
                            alwaysEnabled
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
                            alwaysEnabled
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
      default:
        return null
    }
  }

  return (
        <>
            <CustomBlock>
                <MemberTables
                    title="Validator Ranking"
                    emptyTableMessage="No validators"
                    table={table}
                    sorting
                    columns={columns}
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
