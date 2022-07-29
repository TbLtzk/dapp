import { createGlobalStyle } from 'styled-components';

import { media } from './media';

import '@mdi/font/css/materialdesignicons.min.css';

export const GlobalStyle = createGlobalStyle`
  scrollbar-color: ${({ theme }) => theme.colors.textPrimary};
  scrollbar-width: thin;

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.textPrimary};
  }

  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    overflow-x: auto;
    overflow-y: hidden;
    font-family: 'OpenSans', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a,
  a:hover,
  a:focus {
    color: inherit;
    text-decoration: none;
  }

  .block {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.block};
    border: 1px solid ${({ theme }) => theme.colors.blockBorder};
    border-radius: 16px;
    padding: 24px 32px;
    box-shadow: 0 4px 16px ${({ theme }) => theme.colors.blockShadow};
    display: grid;
    grid-template-columns: minmax(0, 1fr);

    ${media.lessThan('medium')} {
      padding: 24px;
    }

    .block__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .block__content {
      margin-top: 24px;
    }

    .block__tight-content {
      margin-top: 16px;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 8px;
    }

    .block__actions {
      margin-top: 16px;
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .block__line {
      margin: 8px 0;
      width: 100%;
      height: 1px;
      background-color: ${({ theme }) => theme.colors.blockDivider};
    }
  }

  .link {
    color: ${({ theme }) => theme.colors.link};
    display: inline-flex;
    align-items: baseline;
    gap: 8px;
    max-width: max-content;
    transition: all 200ms ease-out;

    & > i {
      font-size: 12px;
      line-height: inherit !important;
    }

    &:hover,
    &:active {
      & > *:not(i) {
        text-decoration: underline;
      }
    }

    &:hover {
      color: ${({ theme }) => theme.colors.linkHover};
    }

    &:active {
      color: ${({ theme }) => theme.colors.linkActive};
    }

    &:disabled {
      color: ${({ theme }) => theme.colors.linkDisabled};
    }
  }

  .grid-2-1 {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 16px;

    ${media.lessThan('medium')} {
      grid-template-columns: 1fr;
    }
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    ${media.lessThan('medium')} {
      grid-template-columns: 1fr;
    }
  }
`;
