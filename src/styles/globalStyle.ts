import { createGlobalStyle, css } from 'styled-components';

import '../../node_modules/@mdi/font/css/materialdesignicons.min.css';

export const scrollbarStyle = css`
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
`;

export const GlobalStyle = createGlobalStyle`
  body {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.oxfordBlue};
    margin: 0 !important;
    overflow: hidden;
    font-family: 'OpenSans', sans-serif !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale !important;  
  }

  ${scrollbarStyle}
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
    text-decoration: none;
    color: inherit;
  }

  .block {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.block};
    border: 1px solid ${({ theme }) => theme.colors.blockBorder};
    border-radius: 16px;
    padding: 24px 32px;
    box-shadow: 0 4px 16px ${({ theme }) => theme.colors.blockShadow};
  }
`;
