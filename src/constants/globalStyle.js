import { createGlobalStyle } from 'styled-components'
import '../../node_modules/@mdi/font/css/materialdesignicons.min.css'

export const GlobalStyle = createGlobalStyle`
  body {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.oxfordBlue};
    margin: 0 !important;
    font-family: 'OpenSans', 'Montserrat', sans-serif !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale !important;  
  }
  
  .arrow::after {
    border-top-color: #87FF65 !important;
  }

  .modal-backdrop {
    background: ${(props) => props.theme.colors.oxfordBlueTint2};
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
  }
`
