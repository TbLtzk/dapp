import styled, { css } from 'styled-components'

export const TableWrapper = styled.span`
  display: block;
  width: 100%;
  overflow-x: auto;

  .validator-member {
    max-width: 300px;
  }

  .page {
    margin-right: 10px;
    color: ${(props) => {
      if (props.palette === 'dark') {
        return props.theme.colors.white
      } else {
        return props.theme.colors.white
      }
    }};
  }

  .members {
    max-width: 100%;
  }

  .validators-widened {
    max-width: 247px;
  }

  .delegated-validators {
    max-width: 176px;
  }

  .page-title {
    color: ${(props) => props.theme.colors.white};
    margin-right: 10px;
  }

  .react-bootstrap-table-pagination {
    > div:first-of-type {
      display: none;
    }
  }
`

export const TableStyle = styled.span`
  margin-bottom: 10px;
  max-width: 100%;
  width: 100%;

  thead th {
    cursor: pointer;
    padding: 5px 5px 10px 5px;
    font-size: 13px;
    border-style: none;
    line-height: 17px;
    color: ${(props) => props.theme.colors.th};
  }

  tbody {
    border: transparent;
    border-top: 1px solid ${(props) => props.theme.colors.th};
    ${(props) => (props.bottomLine ? css`border-bottom: 1px solid ${(props) => props.theme.colors.th}};` : null)}
  }

  .table td {
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
`
