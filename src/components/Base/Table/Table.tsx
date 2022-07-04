import { ReactNode } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationListStandalone, PaginationProvider } from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import Search from 'ui/Search';

import { SkeletonTableLoading } from '../SkeletonLoading/SkeletonLoading';

import { SortCaretIcon, TableContainer } from './styles';

interface Props {
  loading: boolean;
  table: any;
  error?: string;
  columns: any;
  perPage?: number;
  emptyTableMessage: string;
  search?: boolean;
  header: ReactNode;
  tiny?: boolean;
  bottomButtons?: ReactNode | undefined;
}

const Table = ({
  loading,
  table,
  error,
  columns,
  perPage,
  emptyTableMessage,
  search = false,
  header,
  tiny = false,
  bottomButtons,
}: Props) => {
  if (loading) {
    return <SkeletonTableLoading />;
  }
  if (!table.length) {
    return <p>{emptyTableMessage}</p>;
  }
  if (error) {
    return <p>Error, while loading table data</p>;
  }

  return (
    <TableContainer
      withPaganation={perPage < table.length}
      search={search}
      tiny={tiny}
    >
      <div className="q-table">
        <div className="table-header">{header}</div>
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
                search={{ searchFormatted: true }}
                keyField="id"
                data={table}
                columns={columns.map((column) => ({
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
                    {search && <Search value={props.searchProps.searchText} onChange={props.searchProps.onSearch} />}
                    <BootstrapTable {...props.baseProps} {...paginationTableProps} />
                  </>
                )}
              </ToolkitProvider>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <PaginationListStandalone {...paginationProps} />
              </div>
            </>
          )}
        </PaginationProvider>
      </div>

      {bottomButtons}
    </TableContainer>
  );
};

export default Table;
