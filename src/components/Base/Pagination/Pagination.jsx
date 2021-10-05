import React from 'react'
import { WrapPagination } from './styles'

export const setElementsForOnePage = (data, offset, perPage) => {
  return data.slice(offset, offset + perPage)
}

export const countPages = (data, perPage) => {
  return Math.ceil(data.length / perPage)
}

export function Pagination ({ pageCount, handleClick, currentPage }) {
  return <WrapPagination>data</WrapPagination>
}
