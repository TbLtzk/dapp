import styled from 'styled-components';

import { Table } from 'react-bootstrap';

export const TableStyle = styled(Table)`
  margin-bottom: 10px;
  max-width: 100%;
  width: 100%;

  thead th {
    border-top: 0;
    border-bottom: 0;
    padding: 5px 5px 10px 5px;
    font-size: 13px;
    line-height: 17px;
    color: ${props => props.theme.colors.th};
    border-bottom: 1px solid ${(props) => props.theme.colors.th};
  }

  tr:first-child {
    td {
      padding-top: 10px;
    }
  }

  td {
    color: ${props => props.theme.colors.td};
    font-size: 13px;
    line-height: 17px;
    padding: 5px;
    border-top: none;
  }
`;
