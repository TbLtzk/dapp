import { ReactNode, useCallback, useState } from 'react';
import BootstrapTable, { ColumnDescription } from 'react-bootstrap-table-next';
import paginationFactory, { PaginationListStandalone, PaginationProvider } from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import Search from 'ui/Search';

import { SkeletonTableLoading } from '../../components/Base/SkeletonLoading/SkeletonLoading';

import { SortCaretIcon, TableContainer } from './styles';

interface Props {
  loading?: boolean;
  table: any;
  error?: string;
  columns: any;
  perPage?: number;
  emptyTableMessage: string;
  tiny?: boolean;
  header?: ReactNode;
  bottomButtons?: ReactNode;
  buttons?: ReactNode;
}

const Table = ({
  loading,
  table,
  error,
  buttons,
  columns,
  perPage = 1000,
  emptyTableMessage,
  header,
  tiny = false,
  bottomButtons,
}: Props) => {
  const [isEmpty, setIsEmpty] = useState(false);

  const afterSearch = useCallback((newTable: BootstrapTable[]) => {
    setIsEmpty(newTable.length === 0);
  }, []);

  const tableContent = () => {
    if (loading) {
      return <SkeletonTableLoading tiny={tiny} />;
    }
    if (!table.length) {
      return (
        <div className="text-center">
          <h4 className="text-xl">{emptyTableMessage}</h4>
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center">
          <h4 className="text-xl ">Error, while loading table</h4>
        </div>
      );
    }
    return (
      <PaginationProvider
        pagination={paginationFactory({
          custom: true,
          sizePerPage: perPage,
          totalSize: table.length,
          nextPageTitle: 'Next page',
          prePageTitle: 'Pre page',
          firstPageTitle: 'First page',
          lastPageTitle: 'Last page',
        })}
      >
        {({ paginationProps, paginationTableProps }) => (
          <>
            <ToolkitProvider
              search={{ afterSearch, searchFormatted: true }}
              keyField="id"
              data={table}
              columns={columns.map((column: Array<ColumnDescription>) => ({
                ...column,
                sortCaret: (order: string) => (
                  <SortCaretIcon $order={order}>
                    <path d="M8.35351 12.1773C8.15825 12.3726 7.84167 12.3726 7.64641 12.1773L5.52018 10.0511C5.2052 9.73608 5.42828 9.19751 5.87373 9.19751H10.1262C10.5716 9.19751 10.7947 9.73608 10.4797 10.0511L8.35351 12.1773Z" />
                    <path d="M5.87373 6.79744C5.42828 6.79744 5.2052 6.25887 5.52018 5.94389L7.64641 3.81766C7.84167 3.6224 8.15825 3.6224 8.35351 3.81766L10.4797 5.94389C10.7947 6.25887 10.5716 6.79744 10.1262 6.79744H5.87373Z" />
                  </SortCaretIcon>
                ),
              }))}
            >
              {(props) => (
                <>
                  {tiny
                    ? null
                    : (
                      <div className="head-elements">
                        <Search value={props.searchProps.searchText} onChange={props.searchProps.onSearch} />
                        {buttons}
                      </div>
                    )}

                  <BootstrapTable {...props.baseProps} {...paginationTableProps} />
                  {isEmpty && (
                    <div className="text-center">
                      <h4 className="text-xl">No such result</h4>
                    </div>
                  )}
                </>
              )}
            </ToolkitProvider>
            {!isEmpty && (
              <div className="table-pagination">
                <PaginationListStandalone {...paginationProps} />
              </div>
            )}
          </>
        )}
      </PaginationProvider>
    );
  };

  return (
    <TableContainer withPagination={perPage < table.length} tiny={tiny}>
      <div className="table">
        <div className="table-header">{header}</div>
        {tableContent()}
      </div>
      {bottomButtons && <div className="bottom-buttons">{bottomButtons}</div>}
    </TableContainer>
  );
};

export default Table;
