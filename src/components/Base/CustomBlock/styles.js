import styled from 'styled-components'

import {indents} from "constants/style";

export const Block = styled.div`
  background-color: ${props => props.theme.colors.white};
  box-shadow: 0 0 10px rgba(0, 34, 133, 0.25);
  border-radius: 8px;
  padding: 30px 24px;

  .go-governance {
    font-weight: 600;
    display: flex;
    height: 100%;
    justify-content: flex-end;
    padding-bottom: 16px;
  }
`;
