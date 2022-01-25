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
import {
  columnsValidatorsWidened,
  columnsValidatorsMonitoring
} from 'constants/columns'

import {

  tableValidatorsWidened,
  tableValidatorsShort,
  tableValidatorsMonitoring
} from 'constants/tables'

const buttonsType = { qVault: 'q-vault', details: 'details', none: 'none' }

function ValidatorsPanel ({ buttons, tableType }) {
  const { table, tableLoading, columns } = getValidatorsTableData()
  const dispatch = useDispatch()
  const history = useHistory()

  function getValidatorsTableData () {
    switch (tableType) {
      case TABLE_TYPES.validatorsWidened:
        return {
          table: tableValidatorsWidened(useSelector(validatorsWidenedSelector)),
          tableLoading: useSelector(loadingValidatorsWidenedSelector),
          columns: columnsValidatorsWidened
        }
      case TABLE_TYPES.validatorsShort:
        return {
          table: tableValidatorsShort(useSelector(validatorsShortSelector)),
          tableLoading: useSelector(loadingValidatorsShortSelector),
          columns: columnsValidatorsWidened.slice(0, 3)
        }
      case TABLE_TYPES.validatorsMonitoring:
        return {
          table: tableValidatorsMonitoring(useSelector(validatorsMonitoringSelector)),
          tableLoading: useSelector(loadingValidatorsMonitoringSelector),
          columns: columnsValidatorsMonitoring
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
