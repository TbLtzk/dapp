import styled from 'styled-components';

export const ParametersBlockTitle = styled.h1`
  display: flex;
  gap: 4px;
`;

export const BlockParagraph = styled.p`
  margin-top: 20px;
`;

export const DocsLink = styled.a`
  cursor: pointer;
  font-size: 14px;
  line-height: 1;

  &,
  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;
