import styled, { css } from "styled-components";

import { Form } from "react-bootstrap";

const inputMinHeight = "10px";

export const InputWrapper = styled(Form.Group)`
  margin-bottom: 0;
  width: 100%;
  position: relative;

  div {
    display: flex;
  }

  input {
    font-size: 14px;
    line-height: 20px;
    padding: 6px 11px;
    background: ${(p) => {
      if (p.palette === "dark") {
        return p.color ? p.theme.colors.oxfordBlueTint1 : "transparent";
      } else {
        return p.theme.colors.blue;
      }
    }};
    border: 1px solid
      ${(p) => {
        if (p.palette === "dark") {
          return p.type === "error" ? p.theme.colors.validationError : p.theme.colors.oxfordBlueTint2;
        } else {
          return p.type === "error" ? p.theme.colors.validationError : p.theme.colors.oxfordBlueTint4;
        }
      }};
    box-sizing: border-box;

    border-radius: ${(p) => {
      if (p.lbl) {
        return "0 3px 3px 0";
      } else {
        return "3px";
      }
    }};
    min-height: ${inputMinHeight};
    text-align: ${(p) => (p.align ? p.align : "left")};
    color: ${(p) => {
      if (p.palette === "dark") {
        return p.type === "error" ? p.theme.colors.validationError : p.theme.colors.oxfordBlueTint2;
      } else {
        return p.type === "error" ? p.theme.colors.validationError : p.theme.colors.oxfordBlueTint4;
      }
    }};

    &:focus,
    .form-control:focus {
      box-shadow: none !important;
      outline: none;
      background: ${(p) => {
        if (p.palette === "dark") {
          return p.color ? p.theme.colors.oxfordBlueTint1 : "transparent";
        } else {
          return p.theme.colors.blue;
        }
      }};
      border-color: ${(p) => {
        if (p.palette === "dark") {
          return p.color ? p.theme.colors.oxfordBlueTint2 : "transparent";
        } else {
          return p.theme.colors.oxfordBlueTint4;
        }
      }};
      color: ${(p) => {
        if (p.palette === "dark") {
          return p.color ? p.theme.colors.white : p.theme.colors.oxfordBlueTint1;
        } else {
          return p.theme.colors.white;
        }
      }};
    }

    &:disabled {
      background: ${(p) => {
        if (p.palette === "dark") {
          return "transparent";
        } else {
          return p.theme.colors.blue;
        }
      }};
      border: 1px solid
        ${(p) => {
          if (p.palette === "dark") {
            return p.theme.colors.oxfordBlueTint2;
          } else {
            return p.theme.colors.oxfordBlueTint2;
          }
        }};
      color: ${(p) => {
        if (p.palette === "dark") {
          return p.theme.colors.oxfordBlueTint5;
        } else {
          return p.theme.colors.oxfordBlueTint2;
        }
      }};
    }
  }

  .input_maxbtn {
    right: 8px;
    top: 4px;
    position: absolute;
    font-size: 14px;
    line-height: 24px;
    cursor: pointer;
    ${(p) => {
      if (p.isdisabled) {
        return css`
          cursor: default;
        `;
      } else {
        if (p.palette === "dark") {
          console.log("jere");
          return css`
            color: ${(p) => p.theme.colors.oxfordBlueTint4};
            &:hover {
              color: ${(p) => (p.modal ? p.theme.colors.oxfordBlueTint1 : p.theme.colors.neonGreen)};
            }
          `;
        } else {
          console.log("jere");

          return css`
            color: ${(p) => p.theme.colors.oxfordBlueTint2};
            &:hover {
              color: ${(p) => p.theme.colors.oxfordBlueTint6};
            }
          `;
        }
      }
    }}
  }

  .input_lbl {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 20px;
    min-height: ${inputMinHeight};
    border-radius: 3px 0 0 3px;
    padding: 6px 10px;
    white-space: nowrap;
    color: ${(p) => {
      if (p.palette === "dark") {
        if (!p.isDisabled) {
          return p.theme.colors.oxfordBlueTint1;
        }
        return p.theme.colors.white;
      }
      return p.theme.colors.oxfordBlueTint1;
    }};
    background: ${(p) => {
      if (p.isfocus) {
        if (p.palette === "dark") {
          return p.theme.colors.neonGreen;
        } else {
          return p.theme.colors.white;
        }
      } else if (p.isdisabled) {
        if (p.palette === "dark") {
          return p.theme.colors.oxfordBlueTint5;
        } else {
          return p.theme.colors.oxfordBlueTint2;
        }
      } else {
        if (p.palette === "dark") {
          return p.type === "error" ? p.theme.colors.validationError : p.theme.colors.oxfordBlueTint2;
        } else {
          return p.type === "error" ? p.theme.colors.validationError : p.theme.colors.oxfordBlueTint4;
        }
      }
    }};
  }
`;
