import styled from 'styled-components';

export const StyledIcon = styled.i<{ $content: string }>`
  font-family: 'Q-Icons' !important;
  font-size: 20px;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1 !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &::before {
    content: '${({ $content }) => $content}';
  }
`;
