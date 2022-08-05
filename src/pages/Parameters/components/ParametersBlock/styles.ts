import styled from 'styled-components';
import { media } from 'styles/media';

export const ParametersBlockTitle = styled.h1`
  position: sticky;
  top: 0;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr max-content;
  margin-bottom: 0 !important;
  padding: 24px 0 15px;
  background-color: ${({ theme }) => theme.colors.block};

  ${media.lessThan('tablet')} {
    grid-template-columns: 1fr;
  }

  .parameters-block-title__content {
    display: flex;
    gap: 4px;
  }

  .parameters-switch {
    flex: 1;
    min-width: max-width;
    justify-content: end;

    ${media.lessThan('tablet')} {
      justify-content: start;
    }
  }
`;

export const ParametersBlockSubtitle = styled.h5`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
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
