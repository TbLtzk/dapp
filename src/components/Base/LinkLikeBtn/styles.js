import styled from 'styled-components'

import {Button} from "react-bootstrap";

import {colors, indents} from "constants/style";

export const LinkCustom = styled(Button)`
  padding-left: ${indents["20"]};
  padding-right: ${indents["20"]};
  
  background-color: ${props => props.type === "white" ? colors.white : colors.main};
  color: ${props => props.type === "white" ? colors.main : colors.white};
`;
