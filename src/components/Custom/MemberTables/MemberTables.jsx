import React from 'react'
import Table from 'components/Base/Table'
import {
  columnsQFees,
  columnsDelegations,
  columnsRootNode,
  columnsValidatorsWidened,
  columnsDeFiRisk,
  columnnsLockAmount
} from 'constants/columns'
import {
  tableRootNode,
  tableLockAmount,
  tableDefiRisks,
  tableDelegations,
  tableQFees,
  tableValidatorsWidened,
  tableValidatorsShort
} from 'constants/tables'
import TABLE_TYPES from 'constants/tableTypes'
import { SceletonTableLoading } from 'components/Base/SkeletonLoading/SkeletonLoading'

const MemberTables = ({
  tableType,
  perPageLength,
  emptyTable,
  tableArray,
  title,
  widened,
  loading = false,
  sorting = true
}) => {
  const getTableOnType = () => {
    switch (tableType) {
      case TABLE_TYPES.validators:
        return {
          table: widened ? tableValidatorsWidened(tableArray) : tableValidatorsShort(tableArray),
          columns: widened ? columnsValidatorsWidened : columnsValidatorsWidened.slice(0, 3)
        }
      case TABLE_TYPES.rootNode:
        return {
          table: tableRootNode(tableArray),
          columns: columnsRootNode
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
                    <SceletonTableLoading />
                    )
                  : tableArray.length === 0
                    ? (
                        emptyTable
                          ? (
                        <p>{emptyTable}</p>
                            )
                          : (
                        <>
                            <Table
                                keyField="id"
                                columns={getTableOnType().columns}
                                perPage={perPageLength}
                                tableBody={getTableOnType().table}
                                sorting={sorting}
                            />
                        </>
                            )
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
