import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { PagesItemWrapper, SortCaretIcon, TableWrapper } from './styles';

import { theme } from 'store/theme/selectors';

const TableButtons = ({ page, active, onPageChange }) => {
  const { t } = useTranslation();
  const handleClick = (e) => {
    e.preventDefault();
    onPageChange(page);
  };
  return (
    <PagesItemWrapper
      key={page + 'idx'}
      isDisplayNone={typeof page === 'string'}
      active={active}
    >
      {page === 1 ? <span className="page-item__title">{t('PAGE')}</span> : null}
      <a
        href="#"
        className="page-item__link"
        onClick={handleClick}
      >
        {page}
      </a>
    </PagesItemWrapper>
  );
};

const Table = ({ tableBody, columns, perPage, keyField, sorting, lineForEach }) => {
  const currentTheme = useSelector(theme);

  const options = {
    sizePerPageList: [
      {
        text: '5',
        value: perPage,
      },
    ],
    pageButtonRenderer: TableButtons,
  };

  return (
    <>
      <TableWrapper
        lineForEach={lineForEach}
        sorting={sorting}
        bottomLine={perPage < tableBody.length}
        palette={currentTheme}
      >
        <BootstrapTable
          keyField={keyField}
          data={tableBody}
          pagination={tableBody.length > perPage ? paginationFactory(options) : null}
          columns={columns.map((column) => ({
            ...column,
            sortCaret: (order) => (
              <SortCaretIcon $order={order}>
                <path d="M8.35351 12.1773C8.15825 12.3726 7.84167 12.3726 7.64641 12.1773L5.52018 10.0511C5.2052 9.73608 5.42828 9.19751 5.87373 9.19751H10.1262C10.5716 9.19751 10.7947 9.73608 10.4797 10.0511L8.35351 12.1773Z" />
                <path d="M5.87373 6.79744C5.42828 6.79744 5.2052 6.25887 5.52018 5.94389L7.64641 3.81766C7.84167 3.6224 8.15825 3.6224 8.35351 3.81766L10.4797 5.94389C10.7947 6.25887 10.5716 6.79744 10.1262 6.79744H5.87373Z" />
              </SortCaretIcon>
            )
          }))}
          bordered={false}
        />
      </TableWrapper>
    </>
  );
};

export default Table;
