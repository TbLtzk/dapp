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
    vertical-align: ${(props) => {
      if (props.type === 'with-action') {
        return 'baseline';
      } else {
        return 'top';
      }
    }
    };
    color: ${props => props.theme.colors.td};
    font-size: 13px;
    line-height: 17px;
    padding: ${(props) => {
      if (props.type === 'with-action') {
        return '15px 5px';
      } else {
        return '5px';
      }
    }
    };;
    border-top: none;
    border-bottom: ${(props) => {
      if (props.type === 'with-action') {
        return '1px solid ' + props.theme.colors.th;
      } else {
        return null;
      }
    }
    }
  }
`;
