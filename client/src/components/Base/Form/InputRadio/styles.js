import styled from 'styled-components'

import {Form} from "react-bootstrap";

import {indents} from "constants/style";

export const RadioBtn = styled(Form.Check)`
  label{
    ${props => props.theme.fontStyles.text.big};
    color: ${props => props.active ? props.theme.colors.main : props.theme.colors.lightGrey };
  }
  
  
`;
