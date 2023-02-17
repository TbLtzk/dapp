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
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
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
    background-color: ${({ theme }) => theme.colors.backgroundPrimary};
    border: 1px solid ${({ theme }) => theme.colors.borderPrimary};
    border-radius: 16px;
    padding: 24px 32px;
    box-shadow: 0 4px 16px ${({ theme }) => theme.colors.blockShadow};
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    align-content: start;

    ${media.lessThan('medium')} {
      padding: 24px;
    }

    .block__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;

      ${media.lessThan('medium')} {
        gap: 8px;
      }

      &--tight {
        margin-right: -16px;
        margin-top: -8px;
      }
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
      background-color: ${({ theme }) => theme.colors.borderSecondary};
    }
  }

  .link {
    color: ${({ theme }) => theme.colors.textPrimary};
    display: inline-flex;
    align-items: baseline;
    gap: 8px;
    max-width: max-content;
    transition: all 200ms ease-out;

    & > i {
      font-size: 12px;
      line-height: inherit !important;
    }

    & > *:not(i) {
      text-decoration: underline;
    }

    &:focus-visible {
      outline: none;
      border: 2px solid ${({ theme }) => theme.colors.primaryLight};
    }

    &:hover {
      color: ${({ theme }) => theme.colors.textActive};
    }

    &:active {
      color: ${({ theme }) => theme.colors.primaryDark};
    }

    &:disabled {
      color: ${({ theme }) => theme.colors.disableSecondary};
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
