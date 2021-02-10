import styled from 'styled-components'

export const SubTitle = styled.p`
  ${props => props.theme.fontStyles.title.subtitle};
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  word-break: break-word;
  hyphens: auto;
`;
