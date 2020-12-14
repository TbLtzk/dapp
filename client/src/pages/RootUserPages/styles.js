import styled from 'styled-components'

import {Container} from "react-bootstrap";

import {indents} from "constants/style";

export const WrapContainer = styled(Container)`
  background: ${props => props.theme.colors.background};
  height: 100vh;
  padding-top: ${indents["30"]};
 
`;
