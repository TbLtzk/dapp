import { Container } from 'react-bootstrap';

import styled from 'styled-components';

export const WrapContainer = styled(Container)`
  background: ${(props) => props.theme.colors.oxfordBlue};
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 50px;
`;

export const WrapSpinner = styled.div`
  display: flex;
  height: 260px;
  align-items: center;
  justify-content: center;
`;
