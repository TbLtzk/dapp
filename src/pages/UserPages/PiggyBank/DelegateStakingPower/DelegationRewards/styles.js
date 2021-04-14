import styled from 'styled-components';

import { Row, Col } from 'react-bootstrap';

export const Headline = styled.p`
  ${(props) => props.theme.fontStyles.title.subtitle};
`;

export const DelegationBlock = styled(Row)`
`;
