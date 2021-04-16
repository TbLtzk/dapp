import styled from 'styled-components';

import { Form } from 'react-bootstrap';

export const InputWrapper = styled(Form.Group)`
  margin-bottom: 0;

  input {
    background: transparent;
    border: 1px solid ${(props) => {
      return props.type === 'error' ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint4
    }};
    box-sizing: border-box;
    border-radius: 3px;
    min-height: 42px;
    text-align: ${(props) => (props.align ? props.align : 'left')};
    color: ${(props) => {
      return props.type === 'error' ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint4
    }};

    &:focus {
      background: transparent;
      border: 1px solid ${(props) => props.theme.colors.white};
      color: ${(props) => props.theme.colors.white};
    }
    &:disabled {
      background: transparent;
      border: 1px solid ${(props) => props.theme.colors.oxfordBlueTint2};
      color: ${(props) => props.theme.colors.oxfordBlueTint2};
    }
  }
`;
