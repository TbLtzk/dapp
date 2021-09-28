import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { useSelector } from 'react-redux'
import { theme } from 'store/selectors/theme'
import { TableWrapper, TableStyle } from './styles'

const pageButtonRenderer = ({ page, active, disable, title, onPageChange }) => {
  const handleClick = (e) => {
    e.preventDefault()
    onPageChange(page)
  }
  const activeStyle = { fontSize: '16px' }
  if (active) {
    activeStyle.backgroundColor = 'transparent'
  } else {
    activeStyle.backgroundColor = 'transparent'
  }
  if (typeof page === 'string') {
    activeStyle.display = 'none'
  }
  return (
        <li className="page-item" key={page + 'idx'}>
            {page === 1 ? <span className="page-title">Page</span> : null}
            <a href="#" className='page' onClick={handleClick} style={activeStyle}>
                {page}
            </a>
        </li>
  )
}

const Table = ({ tableBody, columns, perPage, keyField }) => {
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
            <TableWrapper palette={currentTheme}>
                <TableStyle bottomLine={perPage < tableBody.length}>
                    <BootstrapTable
                        keyField={keyField}
                        data={tableBody}
                        pagination={tableBody.length > perPage ? paginationFactory(options) : null}
                        columns={columns}
                        bordered={false}
                    />
                </TableStyle>
            </TableWrapper>
        </>
  )
}

export default Table
