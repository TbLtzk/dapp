import styled from 'styled-components';

export const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error} !important;
  font-size: 10px;
  padding-top: 3px;
  margin-bottom: 0 !important;
  word-break: break-all;
`;
