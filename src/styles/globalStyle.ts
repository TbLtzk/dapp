import { createGlobalStyle } from 'styled-components';

import '@mdi/font/css/materialdesignicons.min.css';

export const GlobalStyle = createGlobalStyle`
  scrollbar-color: ${({ theme }) => theme.colors.oxfordBlueTint5};
  scrollbar-width: thin;

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.oxfordBlueTint5};
  }

  body {
    background-color: ${(props) => props.theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    margin: 0 !important;
    overflow-x: auto;
    overflow-y: hidden;
    font-family: 'OpenSans', sans-serif !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale !important;  
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0; 
  }

  .popover-body {
    font-size: 12px;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.neonGreen};
    border-radius: 4px;
  }
  
  .bs-popover-left .arrow::after {
    border-left-color: ${({ theme }) => theme.colors.neonGreen} !important;
  }

  .bs-popover-right .arrow::after {
    border-right-color: ${({ theme }) => theme.colors.neonGreen} !important;
  }

  .bs-popover-top .arrow::after {
    border-top-color: ${({ theme }) => theme.colors.neonGreen} !important;
  }

  .bs-popover-bottom .arrow::after {
    border-bottom-color: ${({ theme }) => theme.colors.neonGreen} !important;
  }

  input[type=number] {
    -moz-appearance: textfield; 
  }

  .card__line {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    border-top: 1px solid ${({ theme }) => theme.colors.oxfordBlueTint3};
  }

  .modal-backdrop {
    background: ${({ theme }) => theme.colors.oxfordBlueTint2};
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
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

    .block__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }

    .block__content {
      margin-top: 24px;
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
`;
