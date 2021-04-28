import styled from 'styled-components';

import { Table } from 'react-bootstrap';

export const TableStyle = styled(Table)`
  thead th, td {
    border-top: 0;
    border-bottom: 0;
    padding: 0 0 15px;
    //font-size: 14px;
    ${(props) => props.theme.fontStyles.text.middle};
  }

  thead th {
    color: ${props => props.theme.colors.th};
  }

  td {
    color: ${props => props.theme.colors.td};
    font-weight: 500;
    line-height: 17px;
  }
`;
