import React from 'react';
import ReactPaginate from 'react-paginate';
import { WrapPagination } from './styles';

export const setElementsForOnePage = (data, offset, perPage) => {
  return data.slice(offset, offset + perPage);
};

export const countPages = (data, perPage) => {
  return Math.ceil(data.length / perPage);
};

export function Pagination({ pageCount, handleClick, currentPage }) {
  return (
    <WrapPagination>
      <ReactPaginate
        previousLabel={'‹'}
        nextLabel={'›'}
        breakLabel={<span className="gap">...</span>}
        pageCount={pageCount}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        onPageChange={handleClick}
        forcePage={currentPage}
        containerClassName={'pagination'}
        previousLinkClassName={'page-link'}
        nextLinkClassName={'page-link'}
        disabledClassName={'disabled'}
        activeClassName={'active'}
      />
    </WrapPagination>
  );
}


