import styled from 'styled-components'

import {colors, indents, h5Text} from "constants/style";

export const Title = styled(h5Text)`
  margin-bottom: 11px;
`;

export const Text = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 150%;
    color: ${colors.lightGrey};
`;

