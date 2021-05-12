import styled from 'styled-components';

import { indents } from 'constants/style';
import { Container } from 'react-bootstrap';

export const WrapContainer = styled(Container)`
  height: 100vh;
  overflow: hidden;
  background: ${props => props.theme.colors.oxfordBlue};
  padding: 0 ${indents['45']} 0 ${indents['40']};
`;

export const Page = styled.div`
  display: flex;
  height: 100vh;
`;

export const WrapContent = styled.div`
  height: calc(100vh - 107px);
  overflow: scroll;
  display: grid;

  &.tow-colm {
    grid-template-columns: 1fr 1fr;
    grid-column-gap:15px
  }

  &.column-2-1 {
    grid-template-columns: 1fr 0.5fr;
    grid-column-gap:15px
  }

  .row {
    margin-right: 0;
    margin-left: 0;
  }
`;


