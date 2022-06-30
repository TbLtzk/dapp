import styled, { css } from 'styled-components';
import { scrollbarStyle } from 'styles/globalStyle';

export const TableWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  ${scrollbarStyle}

  .react-bootstrap-table-pagination {
    > div:first-of-type {
      display: none;
    }
  }

  thead th {
    padding: 5px 5px 10px 5px;
    font-size: 13px;
    border-style: none;
    line-height: 17px;
    color: ${(props) => props.theme.colors.oxfordBlueTint3};
    ${(props) =>
    props.sorting
      ? css`
            cursor: pointer;
            :hover {
              color: ${props.theme.colors.neonGreen};
            }
          `
      : null}
  }

  tbody {
    border: transparent;
    border-top: 1px solid ${(props) => props.theme.colors.oxfordBlueTint3};
    ${(props) => (props.bottomLine ? css`border-bottom: 1px solid ${(props) => props.theme.colors.oxfordBlueTint3}};` : null)}
  }

  .table td {
    ${(props) =>
    props.lineForEach
      ? css`
            vertical-align: middle;
            padding-top: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid ${(props) => props.theme.colors.oxfordBlueTint3};
          `
      : null}
    border-top: transparent;
  }

  tr:first-child {
    td {
      padding-top: 10px;
    }
  }

  td {
    vertical-align: ${(props) => {
    if (props.type === 'with-action') {
      return 'baseline';
    } else {
      return 'top';
    }
  }};
    color: ${(props) => props.theme.colors.white};
    font-size: 13px;
    line-height: 17px;
    padding: ${(props) => {
    if (props.type === 'with-action') {
      return '15px 5px';
    } else {
      return '5px';
    }
  }};

    border-bottom: ${(props) => {
    if (props.type === 'with-action') {
      return '1px solid ' + props.theme.colors.oxfordBlueTint3;
    } else {
      return null;
    }
  }};
  }
  .row {
    margin-right: 0px;
  }

  .pagination {
    margin-bottom: 0;
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
      fill: ${({ theme, $order }) => $order === 'desc'
        ? theme.colors.white
        : theme.colors.oxfordBlueTint3
      };
    }

    &:last-child {
      fill: ${({ theme, $order }) => $order === 'asc'
        ? theme.colors.white
        : theme.colors.oxfordBlueTint3
      };
    }
  }
`;
