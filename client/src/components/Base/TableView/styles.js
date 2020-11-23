import styled from 'styled-components'

import {Table} from "react-bootstrap";

import {colors, indents} from "constants/style";

export const TableStyle = styled(Table)`
  thead th, td {
    border-top: 0;
    border-bottom: 0;
    padding: 0 0 15px;
    font-size: 14px;
  }
  thead th{
    color: ${colors.lightGrey};
    font-weight: 600;
    //text-align: center;
  }
  td{
    color: ${colors.darkGrey};
    font-weight: 500;
  }
`;
