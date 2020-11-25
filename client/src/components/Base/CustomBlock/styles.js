import styled from 'styled-components'

import {colors, indents} from "constants/style";

export const Block = styled.div`
  background-color: ${colors.white};
  box-shadow: 0 0 10px rgba(0, 34, 133, 0.25);
  border-radius: 8px;
  padding: ${indents["20"]};
`;
