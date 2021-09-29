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
} from '../../../constants/columns'
import {
  tableRootNode,
  tableLockAmount,
  tableDefiRisks,
  tableDelegations,
  tableQFees,
  tableValidatorsWidened,
  tableValidatorsShort
} from '../../../constants/tables'

const MemberTables = ({ tableType, perPageLength, tableArray, title, widened, loading = false }) => {
  const tables = {
    validators: {
      table: widened ? tableValidatorsWidened(tableArray) : tableValidatorsShort(tableArray),
      columns: widened ? columnsValidatorsWidened : columnsValidatorsWidened.slice(0, 3)
    },
    rootNode: {
      table: tableRootNode(tableArray),
      columns: columnsRootNode
    },
    defi: {
      table: tableDefiRisks(tableArray),
      columns: columnsDeFiRisk
    },
    delegations: {
      table: tableDelegations(tableArray),
      columns: columnsDelegations
    },
    qfees: {
      table: tableQFees(tableArray),
      columns: columnsQFees
    },
    lockAmount: {
      table: tableLockAmount(tableArray),
      columns: columnnsLockAmount
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
                  : tableArray?.length === 0
                    ? (
                    <p>No data</p>
                      )
                    : (

                        <Table
                            keyField="id"
                            columns={tables[tableType].columns}
                            perPage={perPageLength}
                            tableBody={tables[tableType].table}
                        />

                      )}
            </Suspense>
        </>
  )
}

export default MemberTables
