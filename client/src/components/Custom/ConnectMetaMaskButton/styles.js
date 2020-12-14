import styled from 'styled-components'

import {Button} from "react-bootstrap";

import { indents} from "constants/style";

export const ButtonCustom = styled(Button)`
  padding-left: ${indents["20"]};
  padding-right: ${indents["20"]};
  border-color: ${props => props.type === "white" ? props => props.theme.colors.white : props => props.theme.colors.main};
  background-color: ${props => props.type === "white" ? props => props.theme.colors.white : props => props.theme.colors.main};
  color: ${props => props.type === "white" ? props => props.theme.colors.main : props => props.theme.colors.white};
`;
