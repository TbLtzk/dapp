import { Form } from 'react-bootstrap';

import styled from 'styled-components';

export const GroupWrapper = styled(Form.Group)`
  &:last-of-type {
    margin-bottom: 10px;
  }
`;

export const RadioInput = styled(Form.Check)`
  input,
  label {
    cursor: pointer;
  }

  label {
    font-size: 15px;
    line-height: 20px;
    font-weight: 400;
    white-space: pre-wrap;
    color: ${props => props.$checked ? props.theme.colors.oxfordBlue : props.theme.colors.oxfordBlueTint3};
  }
`;
