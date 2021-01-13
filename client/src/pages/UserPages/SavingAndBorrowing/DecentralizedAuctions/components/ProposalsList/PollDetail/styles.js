import styled from 'styled-components'

import {indents, h5Text} from "constants/style";

export const Title = styled.h5`
  margin-bottom: 11px;
  ${props => props.theme.fontStyles.h5}
  
`;
// export const Title = styled(h5Text)`
//   margin-bottom: 11px;
//
// `;

export const Text = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 150%;
    color: ${props => props.theme.colors.lightGrey};
`;

export const Link = styled.a`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 150%;
    color: ${props => props.theme.colors.lightGrey};
`;
