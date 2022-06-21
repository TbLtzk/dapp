import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { PagesItemWrapper, TableWrapper } from './styles';

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
          columns={columns}
          bordered={false}
        />
      </TableWrapper>
    </>
  );
};

export default Table;
