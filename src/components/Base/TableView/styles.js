import styled from 'styled-components';

import { Table } from 'react-bootstrap';

export const TableStyle = styled(Table)`
  margin-bottom: 10px;

  thead th {
    border-top: 0;
    border-bottom: 0;
    padding: 0 0 10px;
    font-size: 13px;
    line-height: 17px;
    color: ${props => props.theme.colors.th};
    border-bottom: 1px solid ${(props) => props.theme.colors.th};
  }

  td {
    color: ${props => props.theme.colors.td};
    font-size: 13px;
    line-height: 17px;
    padding: 10px 0 0 0;
    border-top: none;
  }
`;
