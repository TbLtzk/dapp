import styled from 'styled-components'
import {UsualText} from "constants/style";

export const Text = styled.p`
  ${(props) => props.theme.fontStyles.text.middle};
   color: ${(props) => props.theme.colors.black};
  margin-bottom: 0;
`;
export const Link = styled.a`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 150%;
    color: ${props => props.theme.colors.black};
`;

