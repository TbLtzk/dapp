import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { useSelector } from 'react-redux'
import { theme } from 'store/theme/selectors'
import { TableWrapper, PagesItemWrapper } from './styles'

const pageButtonRenderer = ({ page, active, disable, title, onPageChange }) => {
  const handleClick = (e) => {
    e.preventDefault()
    onPageChange(page)
  }
  return (
        <PagesItemWrapper isDisplayNone={typeof page === 'string'} active={active} key={page + 'idx'}>
            {page === 1 ? <span className="page-item__title">Page</span> : null}
            <a href="#" className="page-item__link" onClick={handleClick}>
                {page}
            </a>
        </PagesItemWrapper>
  )
}

const Table = ({ tableBody, columns, perPage, keyField, sorting }) => {
  const currentTheme = useSelector(theme)

  const options = {
    sizePerPageList: [
      {
        text: '5',
        value: perPage
      }
    ],
    pageButtonRenderer
  }

  return (
        <>
            <TableWrapper sorting={sorting} bottomLine={perPage < tableBody.length} palette={currentTheme}>
                <BootstrapTable
                    keyField={keyField}
                    data={tableBody}
                    pagination={tableBody.length > perPage ? paginationFactory(options) : null}
                    columns={columns}
                    bordered={false}
                />
            </TableWrapper>
        </>
  )
}

export default Table
