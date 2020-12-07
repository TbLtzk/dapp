import styled from 'styled-components'

import {Button} from "react-bootstrap";

import {colors, indents} from "constants/style";

export const ButtonCustom = styled(Button)`
  width: ${props => props.type === "full-width" ? "100%" : "auto"};
  padding-left: ${indents["20"]};
  padding-right: ${indents["20"]};
  border-color: ${props => props.type === "white" ? colors.white : colors.main};
  background-color: ${props => props.type === "white" ? colors.white : colors.main};
  color: ${props => props.type === "white" ? colors.main : colors.white};
  box-shadow: 0 4px 4px rgba(81, 126, 255, 0.25);
  border-radius: 8px;
  &:disabled {
    color: ${props => props.type === "white" ? colors.main : colors.white};
    background-color: ${props => props.type === "white" ? colors.white : colors.main};
    border-color: ${props => props.type === "white" ? colors.white : colors.main};
    opacity: 1
  }
`;
