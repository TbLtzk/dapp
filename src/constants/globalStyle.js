import React from 'react'
import LoadingSpinner from 'components/Base/LoadingSpinner'
import { LoadingWrap } from 'components/Custom/MemberTables/styles'
import { createGlobalStyle, css } from 'styled-components'
import '../../node_modules/@mdi/font/css/materialdesignicons.min.css'

export const fallback = (
  <LoadingWrap>
    <LoadingSpinner />
  </LoadingWrap>
)

export const scrollbarStyle = css`
  scrollbar-color: ${(props) => props.theme.colors.oxfordBlueTint5};
  scrollbar-width: thin;

  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.oxfordBlueTint2};
    border-radius: 10px;
  }

  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.oxfordBlueTint5};
  }
`

export const GlobalStyle = createGlobalStyle`
  body {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.oxfordBlue};
    margin: 0 !important;
    font-family: 'OpenSans', 'Montserrat', sans-serif !important;
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
    font-size: "12px";
    text-align: "center";
    background-color: ${(props) => props.theme.colors.neonGreen};
    border-radius: 4px;
  }
  
  .bs-popover-left .arrow::after {
    border-left-color: ${(props) => props.theme.colors.neonGreen} !important;
  }

  .bs-popover-right .arrow::after {
    border-right-color: ${(props) => props.theme.colors.neonGreen} !important;
  }

  .bs-popover-top .arrow::after {
    border-top-color: ${(props) => props.theme.colors.neonGreen} !important;
  }

  .bs-popover-bottom .arrow::after {
    border-bottom-color: ${(props) => props.theme.colors.neonGreen} !important;
  }

  input[type=number] {
    -moz-appearance:textfield; 
  }

  .modal-backdrop {
    background: ${(props) => props.theme.colors.oxfordBlueTint2};
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
  }
`
