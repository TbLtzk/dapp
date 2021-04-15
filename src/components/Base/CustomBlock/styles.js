import styled from 'styled-components'

import {indents} from "constants/style";

export const Block = styled.div`
  background-color: ${props => props.theme.colors.oxfordBlueTint1};
  border-radius: 3px;
  padding: 15px 10px;

  .go-governance {
    font-weight: 600;
    display: flex;
    height: 100%;
    justify-content: flex-end;
    padding-bottom: 16px;
  }
`;
