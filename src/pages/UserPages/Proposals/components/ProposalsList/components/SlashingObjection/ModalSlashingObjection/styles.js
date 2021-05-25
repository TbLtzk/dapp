import styled from 'styled-components'
import {UsualText} from "constants/style";

export const Text = styled.p`
  ${(props) => props.theme.fontStyles.text.middle};
   color: ${(props) => props.theme.colors.black};
  margin-bottom: 0;
`;

