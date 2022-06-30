import styled from 'styled-components';
import { scrollbarStyle } from 'styles/globalStyle';

import { getTableColor } from './colors';

export const TableContainer = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  ${scrollbarStyle}
  .text-h2 {
    margin-bottom: 24px;
  }
  .table-bordered, .table-bordered td, .table-bordered th {
    border: none;
  }

  .react-bootstrap-table-pagination {
    > div:first-of-type {
      display: none;
    }
  }
  table {
    border-collapse: separate;
    border-spacing: 0 4px;
  }

  thead th {
    &:first-child {
      padding-left: 32px;
    }
    padding-top: 16px;
    padding-bottom: 16px;
    padding-left: 26px;

    font-size: 14px;
    line-height: 20px;
    border-style: none;
    line-height: 17px;
    color: ${({ theme }) => getTableColor(theme, 'tableHeader')};
    background: transparent;
    cursor: pointer;
  }

  tbody {
    tr {
      transition: all 0.2s ease-in-out;
      box-sizing: border-box;

      border-radius: 16px;

      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: ${({ theme }) => getTableColor(theme, 'tableText')};
      background: ${({ theme }) => getTableColor(theme, 'tableBg')};
      margin-bottom: 10px;
      gap: 20px;
      height: 72px;

      &:hover {
        box-shadow: inset 0px 0px 0px 1px ${({ theme }) => getTableColor(theme, 'tableHover')};
      }
      td {
        &:first-child {
          padding-left: 32px;
        }
        white-space: nowrap;
      }
    }
  }

  td {
    padding: 26px;
  }

  td:first-child {
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
  }
  td:last-child {
    border-bottom-right-radius: 16px;
    border-top-right-radius: 16px;
  }

  .react-bootstrap-table-page-btns-ul {
    display: ${({ withPaganation }) => (withPaganation ? 'flex' : 'none')};
    justify-content: center;

    .page-item {
      margin-left: 4px;
      .page-link {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 44px;
        height: 40px;
        padding: 0;
        border: none;
        border-radius: 4px;
        color: ${({ theme }) => getTableColor(theme, 'link')};
        background: transparent;

        &:hover {
          color: ${({ theme }) => getTableColor(theme, 'linkHover')};
          background: ${({ theme }) => getTableColor(theme, 'linkBgHover')};
        }
      }
    }

    .active {
      border-radius: 4px;
      .page-link {
        color: ${({ theme }) => getTableColor(theme, 'linkActive')};
        background: ${({ theme }) => getTableColor(theme, 'linkBgActive')};
        &:focus {
          box-shadow: none;
          color: ${({ theme }) => getTableColor(theme, 'linkFocus')};
          background: ${({ theme }) => getTableColor(theme, 'linkBgFocus')};
          border: 2px solid ${({ theme }) => getTableColor(theme, 'linkBorderFocus')};
          border-radius: 4px;
        }
      }
    }
  }
`;

export const SortCaretIcon = styled.svg`
  width: 16px;
  height: 16px;
  display: inline-flex;

  path {
    &:first-child {
      fill: ${({ theme, $order }) =>
        $order === 'desc' ? getTableColor(theme, 'caretActive') : getTableColor(theme, 'caret')};
    }

    &:last-child {
      fill: ${({ theme, $order }) =>
        $order === 'asc' ? getTableColor(theme, 'caretActive') : getTableColor(theme, 'caret')};
    }
  }
`;
