import styled from 'styled-components'

import {Button, Card, Col, Container} from "react-bootstrap";

import {indents} from "constants/style";

export const Title = styled.p`
 ${props => props.theme.fontStyles.title.big};
`;

export const Descr = styled.p`
 ${props => props.theme.fontStyles.description.small};
`;

export const SubTitle = styled.p`
  ${props => props.theme.fontStyles.title.subtitle};
`;

export const SubTitleBold = styled.p`
  ${props => props.theme.fontStyles.title.subtitle};
  font-weight: 700;
`;

export const SubTitleHighlightProposal = styled.span`
  text-transform: capitalize
`;

export const SummarText = styled.p`
  ${props => props.theme.fontStyles.text.little};
`;

export const SummarTextType = styled.span`
  ${props => props.theme.fontStyles.text.little};
  text-transform: capitalize
`;

export const Warning = styled(SummarText)`
  ${props => props.theme.fontStyles.text.little};
  color: ${props => props.theme.colors.error};
`;
