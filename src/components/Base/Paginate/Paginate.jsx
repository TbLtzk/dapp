import React from 'react'
import ReactPaginate from 'react-paginate'
import { useSelector } from 'react-redux'
import { theme } from 'store/theme/selectors'
import { PaginateWrapper } from './styles'

function Paginate ({ handlePageClick, pageCount }) {
  const palette = useSelector(theme)
  return (
        <PaginateWrapper palette={palette}>
            <div className='page-item__title'>
                Page
             </div>
            <ReactPaginate
                breakLabel="..."
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
                breakLinkClassName='break-link'
                containerClassName='pagination'
                pageClassName='page-item__link'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                activeClassName='active'
            />
        </PaginateWrapper>
  )
}

export default Paginate
