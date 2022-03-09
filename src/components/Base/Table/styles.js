import { scrollbarStyle } from 'constants/globalStyle'
import styled, { css } from 'styled-components'

export const TableWrapper = styled.span`
  display: block;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  margin-bottom: 10px;
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
    color: ${(props) => props.theme.colors.th};
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
    border-top: 1px solid ${(props) => props.theme.colors.th};
    ${(props) => (props.bottomLine ? css`border-bottom: 1px solid ${(props) => props.theme.colors.th}};` : null)}
  }

  .table td {
    ${(props) =>
      props.lineForEach
        ? css`
            vertical-align: middle;
            padding-bottom: 10px;
            border-bottom: 1px solid ${(props) => props.theme.colors.th};
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
        return 'baseline'
      } else {
        return 'top'
      }
    }};
    color: ${(props) => props.theme.colors.td};
    font-size: 13px;
    line-height: 17px;
    padding: ${(props) => {
      if (props.type === 'with-action') {
        return '15px 5px'
      } else {
        return '5px'
      }
    }};

    border-bottom: ${(props) => {
      if (props.type === 'with-action') {
        return '1px solid ' + props.theme.colors.th
      } else {
        return null
      }
    }};
  }
  .row {
    margin-right: 0px;
  }
`

export const PagesItemWrapper = styled.li`
  background-color: transparent;
  font-size: 16px;

  .page-item__link {
    display: ${(props) => (props.isDisplayNone ? 'none' : '')};
    margin-right: 10px;
    color: ${(props) => {
      if (props.palette === 'dark') {
        return props.active ? props.theme.colors.white : props.theme.colors.oxfordBlueTint3
      } else {
        return props.active ? props.theme.colors.white : props.theme.colors.oxfordBlueTint4
      }
    }};
  }

  .page-item__title {
    color: ${(props) => props.theme.colors.white};
    margin-right: 10px;
  }
`
