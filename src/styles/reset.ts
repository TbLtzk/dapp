import { createGlobalStyle } from 'styled-components';

export const ResetStyle = createGlobalStyle`
  /*! minireset.css v0.0.5 | MIT License | github.com/jgthms/minireset.css */
  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  button {
    margin: 0;
    padding: 0;
    font-weight: 400;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: 500;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  button,
  input,
  select,
  textarea {
    margin: 0;
    outline: none;

    &::-moz-focus-inner {
      border: 0;
    }
  }

  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  img,
  video {
    height: auto;
    max-width: 100%;
  }

  svg {
    overflow: hidden;
    vertical-align: middle;
  }

  iframe {
    border: 0;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  td,
  th {
    padding: 0;
    text-align: left;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0; 
  }

  input[type=number] {
    -moz-appearance: textfield; 
  }

  label,
  span {
    display: inline-block;
  }
`;
