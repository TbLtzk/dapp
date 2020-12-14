import styled from 'styled-components'

import {indents} from "constants/style";

export const WrapDescr = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  text-transform: lowercase;
  color: ${props => props.theme.colors.lightGrey};
`;
