import styled from 'styled-components';
import colors from 'constants/colors';

import { Row, Col } from 'react-bootstrap';

export const UpdateDelegationContainer = styled.div`
  .input_container_item {
    display: flex;

    .input_address {
      width: calc(60%);
      margin-right: 10px;
    }

    .input_share {
      width: 30%;
    }

    .btn_additional {
      width: 20%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;

      & > *:not(:first-child) {
        margin-left: 10px;
      }
    }
  }
`;
