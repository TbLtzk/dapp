import styled from 'styled-components';

import { scrollbarStyle } from 'constants/globalStyle';

export const TableWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  ${scrollbarStyle}

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
    color: ${({ theme }) => theme.colors.white}; //fix colors
    cursor: pointer;
  }

  tbody {
    tr {
      td {
        &:first-child {
          padding-left: 32px;
        }

        white-space: nowrap;
      }

      font-weight: 600;
      font-size: 14px;
      line-height: 20px;

      color: white;
      margin-bottom: 10px;
      gap: 20px;
      height: 72px;
      background: #0b2545;
      box-shadow: 0px 4px 16px rgba(23, 77, 145, 0.04);
    }
  }

  td {
    border: solid 1px #000;
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
`;

export const PagesItemWrapper = styled.li`
  background-color: transparent;
  font-size: 16px;

  .page-item__link {
    display: ${(props) => (props.isDisplayNone ? 'none' : '')};
    margin-right: 10px;
    font-size: 14px;
    color: ${(props) => {
      if (props.palette === 'dark') {
        return props.active ? props.theme.colors.white : props.theme.colors.oxfordBlueTint3;
      } else {
        return props.active ? props.theme.colors.white : props.theme.colors.oxfordBlueTint4;
      }
    }};
  }

  .page-item__title {
    font-size: 14px;
    color: ${(props) => props.theme.colors.white};
    margin-right: 10px;
  }
`;

export const SortCaretIcon = styled.svg`
  width: 16px;
  height: 16px;
  display: inline-flex;

  path {
    &:first-child {
      fill: ${({ theme, $order }) => ($order === 'desc' ? theme.colors.white : theme.colors.oxfordBlueTint3)};
    }

    &:last-child {
      fill: ${({ theme, $order }) => ($order === 'asc' ? theme.colors.white : theme.colors.oxfordBlueTint3)};
    }
  }
`;
