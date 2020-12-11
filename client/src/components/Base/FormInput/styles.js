import styled from 'styled-components'

import {Form} from "react-bootstrap";

import {colors, indents} from "constants/style";

export const InputWrapper = styled(Form.Group)`
  margin-bottom: 25px;
  input{
      background: ${colors.darkWhite};
      border: 1px solid ${colors.whiteGrey};
      box-sizing: border-box;
      border-radius: 8px;
      height: 42px;
      text-align: ${props => props.align ? props.align : "left"};
  }
`;
