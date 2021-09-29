import React, { Suspense } from 'react'
import LoadingSpinner from 'components/Base/LoadingSpinner'
import Table from 'components/Base/Table'
import { LoadingWrap } from 'constants/style'
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

const MemberTables = ({ tableType, perPageLength, emptyTable, tableArray, title, widened, loading = false }) => {
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
            <Suspense
                fallback={
                    <LoadingWrap>
                        <LoadingSpinner />
                    </LoadingWrap>
                }
            >
                {loading
                  ? (
                    <LoadingWrap>
                        <LoadingSpinner />
                    </LoadingWrap>
                    )
                  : tableArray.length === 0
                    ? (
                    <p>{emptyTable}</p>
                      )
                    : (
                    <Table
                        keyField="id"
                        columns={getTableOnType().columns}
                        perPage={perPageLength}
                        tableBody={getTableOnType().table}
                    />
                      )}
            </Suspense>
        </>
  )
}

export default MemberTables
