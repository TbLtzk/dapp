import React from 'react'
import Table from 'components/Base/Table'
import { SkeletonTableLoading } from 'components/Base/SkeletonLoading/SkeletonLoading'

const MemberTables = ({ perPageLength, emptyTableMessage, table, columns, title, loading, sorting, error }) => (
    <>
        {!title ? null : <h1>{title}</h1>}
        <div>
            {loading
              ? (
                <SkeletonTableLoading />
                )
              : !table.length
                  ? (
                <p>{emptyTableMessage}</p>
                    )
                  : error
                    ? (
                <p>{error}</p>
                      )
                    : (
                <Table keyField="id" columns={columns} perPage={perPageLength} tableBody={table} sorting={sorting} />
                      )}
        </div>
    </>
)

export default MemberTables
