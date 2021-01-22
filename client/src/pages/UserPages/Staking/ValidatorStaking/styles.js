import styled from 'styled-components';

import { Row } from 'react-bootstrap';

import { indents } from 'constants/style';

export const WrapContainer = styled(Row)`
  padding-top: ${indents['30']};

  .block-name {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    &>span:first-child {
      font-size: 20px;
      font-weight: 600;
    }

    button {
      padding-right: 0;
    }
  }
`;
