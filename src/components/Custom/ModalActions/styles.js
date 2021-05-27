import styled from 'styled-components'


export const Title = styled.p`
 ${props => props.theme.fontStyles.title.big};
  color: ${props => props.theme.colors.oxfordBlue};
`;

export const Descr = styled.p`
 ${props => props.theme.fontStyles.description.small};
  color: ${props => props.theme.colors.oxfordBlue};
`;

export const SubTitle = styled.p`
  ${props => props.theme.fontStyles.title.subtitle};
  color: ${props => props.theme.colors.oxfordBlue};
`;

export const SubTitleHighlightProposal = styled.span`
  text-transform: capitalize;
  color: ${props => props.theme.colors.oxfordBlue};
`;

export const SummarText = styled.p`
  ${props => props.theme.fontStyles.text.little};
  color: ${props => props.theme.colors.oxfordBlue};
`;

export const SummarTextType = styled.span`
  ${props => props.theme.fontStyles.text.little};
  text-transform: capitalize;
  color: ${props => props.theme.colors.oxfordBlue};
`;

export const Warning = styled(SummarText)`
  ${props => props.theme.fontStyles.text.little};
  color: ${props => props.theme.colors.error};
`;
