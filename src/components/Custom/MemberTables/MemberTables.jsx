import React from 'react';

import { SkeletonTableLoading } from 'components/Base/SkeletonLoading/SkeletonLoading';
import Table from 'components/Base/Table';

const MemberTables = ({
  perPageLength,
  emptyTableMessage,
  table,
  columns,
  title,
  loading,
  sorting,
  error,
  lineForEach
}) => (
  <>
    {title && <h1>{title}</h1>}
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
              <Table
                keyField="id"
                lineForEach={lineForEach}
                columns={columns}
                perPage={perPageLength}
                tableBody={table}
                sorting={sorting}
              />
            )}
    </div>
  </>
);

export default MemberTables;
