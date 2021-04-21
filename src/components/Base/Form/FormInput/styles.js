import styled from 'styled-components';

import { Form } from 'react-bootstrap';

export const InputWrapper = styled(Form.Group)`
  margin-bottom: 0;

  input {
    background: transparent;
    border: 1px solid ${(props) => {
      if (props.palette === 'dark') {
        console.log(props.type === 'error' ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint2)
        return props.type === 'error' ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint2;
      } else {
        return props.type === 'error' ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint4;
      }
    }};
    box-sizing: border-box;
    border-radius: 3px;
    min-height: 42px;
    text-align: ${(props) => (props.align ? props.align : 'left')};
    color: ${(props) => {
      if (props.palette === 'dark') {
        return props.type === 'error' ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint2;
      } else {
        return props.type === 'error' ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint4;
      }
    }};

    &:focus {
      background: transparent;
      border: 1px solid ${(props) => {
        if (props.palette === 'dark') {
          return props.theme.colors.oxfordBlueTint1;
        } else {
          return props.theme.colors.white;
        }
      }};
      color: ${(props) => {
        if (props.palette === 'dark') {
          return props.theme.colors.oxfordBlueTint1;
        } else {
          return props.theme.colors.white;
        }
      }};
    }
    &:disabled {
      background: transparent;
      border: 1px solid ${(props) => {
        if (props.palette === 'dark') {
          return props.theme.colors.oxfordBlueTint5;
        } else {
          return props.theme.colors.oxfordBlueTint2;
        }
      }};
      color: ${(props) => {
        if (props.palette === 'dark') {
          return props.theme.colors.oxfordBlueTint5;
        } else {
          return props.theme.colors.oxfordBlueTint2;
        }
      }};
    }
  }
`;
