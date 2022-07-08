import styled from 'styled-components';

export const ExplorerLink = styled.a`
  &,
  &:hover {
    color: inherit;
  }

  &:hover {
    text-decoration: underline;
  }

  & > p {
    margin-bottom: 0;
  }
`;
