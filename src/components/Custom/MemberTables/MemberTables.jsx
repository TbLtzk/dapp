import React from 'react'
import Table from 'components/Base/Table'
import {
  columnsQFees,
  columnsDelegations,
  columnsRootNode,
  columnsValidatorsWidened,
  columnsDeFiRisk,
  columnnsLockAmount,
  columnsValidatorsMonitoring,
  columnsRootNodeMonitoring
} from 'constants/columns'
import {
  tableRootNode,
  tableLockAmount,
  tableDefiRisks,
  tableDelegations,
  tableQFees,
  tableValidatorsWidened,
  tableValidatorsShort,
  tableValidatorsMonitoring,
  tableRootNodeMonitoring
} from 'constants/tables'
import TABLE_TYPES from 'constants/tableTypes'
import { SkeletonTableLoading } from 'components/Base/SkeletonLoading/SkeletonLoading'

const MemberTables = ({ tableType, perPageLength, emptyTable, tableArray, title, loading = false, sorting = true }) => {
  const getTableOnType = () => {
    switch (tableType) {
      case TABLE_TYPES.validatorsShort:
        return {
          table: tableValidatorsShort(tableArray),
          columns: columnsValidatorsWidened.slice(0, 3)
        }
      case TABLE_TYPES.validatorsMonitoring:
        return {
          table: tableValidatorsMonitoring(tableArray),
          columns: columnsValidatorsMonitoring
        }
      case TABLE_TYPES.validatorsWidened:
        return {
          table: tableValidatorsWidened(tableArray),
          columns: columnsValidatorsWidened
        }
      case TABLE_TYPES.rootNodesShort:
      case TABLE_TYPES.rootNodesWidened:
        return {
          table: tableRootNode(tableArray),
          columns: columnsRootNode
        }
      case TABLE_TYPES.rootNodesMonitoring:
        return {
          table: tableRootNodeMonitoring(tableArray),
          columns: columnsRootNodeMonitoring
        }
      case TABLE_TYPES.qDefi:
        return {
          table: tableDefiRisks(tableArray),
          columns: columnsDeFiRisk
        }
      case TABLE_TYPES.delegations:
        return { table: tableDelegations(tableArray), columns: columnsDelegations }

      case TABLE_TYPES.qFees:
        return {
          table: tableQFees(tableArray),
          columns: columnsQFees
        }
      case TABLE_TYPES.timeLocks:
        return {
          table: tableLockAmount(tableArray),
          columns: columnnsLockAmount
        }
    }
  }

  return (
        <>
            {!title ? null : <h1>{title}</h1>}

            <div>
                {loading
                  ? (
                    <SkeletonTableLoading />
                    )
                  : !tableArray.length
                      ? (
                    <p>{emptyTable}</p>
                        )
                      : (
                    <Table
                        keyField="id"
                        columns={getTableOnType().columns}
                        perPage={perPageLength}
                        tableBody={getTableOnType().table}
                        sorting={sorting}
                    />
                        )}
            </div>
        </>
  )
}

export default MemberTables
