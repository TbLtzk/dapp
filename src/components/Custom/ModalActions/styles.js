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

export const SubTitleBold = styled.p`
  ${props => props.theme.fontStyles.title.subtitle};
  color: ${props => props.theme.colors.oxfordBlue};
  font-weight: 700;
`;

export const SubTitleHighlightProposal = styled.span`
  text-transform: capitalize;
  color: ${props => props.theme.colors.oxfordBlue};
`;

export const SummarText = styled.p`
  ${props => props.theme.fontStyles.text.little};
  color: ${props => props.theme.colors.oxfordBlue};
`;

export const SummarTextLink = styled(SummarText)`
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => props.theme.colors.oxfordBlue};
`;

export const SummarTextType = styled.span`
  ${props => props.theme.fontStyles.text.little};
  text-transform: capitalize;
  color: ${props => props.theme.colors.oxfordBlue};
`;

export const Wrap = styled.div`
 //min-height: 240px;
`;

export const Warning = styled(SummarText)`
  ${props => props.theme.fontStyles.text.little};
  color: ${props => props.theme.colors.error};
`;
