import styled from 'styled-components'

import {Button, Card, Col, Container} from "react-bootstrap";

export const Title = styled.p`
 ${props => props.theme.fontStyles.title.big};
 text-transform: capitalize;
`;

export const SubTitle = styled.p`
  ${props => props.theme.fontStyles.title.subtitle};
`;
