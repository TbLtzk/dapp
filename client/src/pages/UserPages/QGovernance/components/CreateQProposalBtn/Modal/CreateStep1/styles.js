import styled from 'styled-components'

import {Button, Card, Col, Container} from "react-bootstrap";

import {indents} from "constants/style";

export const SubTitle = styled.p`
  ${props => props.theme.fontStyles.title.subtitle};
`;

export const SubTitleHighlightProposal = styled.span`
  text-transform: capitalize
`;
