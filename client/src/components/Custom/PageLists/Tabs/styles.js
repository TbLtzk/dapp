import styled from 'styled-components'

import {indents} from "constants/style";

export const Title = styled.p`
 ${props => props.theme.fontStyles.title.big};
`;

export const WrapDescr = styled.p`
  ${props => props.theme.fontStyles.description.small};
  text-transform: lowercase;
`;
