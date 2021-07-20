import styled from 'styled-components'

import {indents} from "constants/style";

export const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error} !important;
  font-size: 10px;
  padding-top: 3px;
  text-transform: uppercase;
`;
