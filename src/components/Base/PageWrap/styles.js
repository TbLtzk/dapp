import styled from 'styled-components';

import { indents } from 'constants/style';
import { Container } from 'react-bootstrap';

export const WrapContainer = styled(Container)`
  background: ${props => props.theme.colors.oxfordBlue};
  padding-top: ${indents['30']};
  padding-left: ${indents['30']};
  padding-right: ${indents['30']};
  padding-bottom: 50px;
`;

export const Page = styled.div`
  display: flex;
`;


