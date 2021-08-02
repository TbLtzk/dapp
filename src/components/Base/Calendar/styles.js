import styled from "styled-components";

export const WrapperCalendar = styled.div`
  & input {
    font-size: 14px;
    line-height: 20px;
    padding: 6px 11px;
    background: ${(props) => {
      if (props.palette === "dark") {
        return "transparent";
      } else {
        return props.theme.colors.blue;
      }
    }};
    border: 1px solid
      ${(props) => {
        if (props.palette === "dark") {
          return props.type === "error" ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint2;
        } else {
          return props.type === "error" ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint4;
        }
      }};
    box-sizing: border-box;

    border-radius: ${(props) => {
      if (props.lbl) {
        return "0 3px 3px 0";
      } else {
        return "3px";
      }
    }};
    color: ${(props) => {
      if (props.palette === "dark") {
        return props.type === "error" ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint2;
      } else {
        return props.type === "error" ? props.theme.colors.validationError : props.theme.colors.oxfordBlueTint4;
      }
    }};

    &:focus {
      outline: none;
      background: ${(props) => {
        if (props.palette === "dark") {
          return "transparent";
        } else {
          return props.theme.colors.blue;
        }
      }};
      border: 1px solid
        ${(props) => {
          if (props.palette === "dark") {
            return props.theme.colors.oxfordBlueTint1;
          } else {
            return props.theme.colors.white;
          }
        }};
      color: ${(props) => {
        if (props.palette === "dark") {
          return props.theme.colors.oxfordBlueTint1;
        } else {
          return props.theme.colors.white;
        }
      }};
    }

    &:disabled {
      background: ${(props) => {
        if (props.palette === "dark") {
          return "transparent";
        } else {
          return props.theme.colors.oxfordBlueTint2;
        }
      }};
      border: 1px solid
        ${(props) => {
          if (props.palette === "dark") {
            return props.theme.colors.oxfordBlueTint5;
          } else {
            return props.theme.colors.oxfordBlueTint2;
          }
        }};
      color: ${(props) => {
        if (props.palette === "dark") {
          return props.theme.colors.oxfordBlueTint5;
        } else {
          return props.theme.colors.oxfordBlueTint2;
        }
      }};
    }
  }
`;

export const Wrapper = styled.div`
  & .react-datepicker__header {
    background-color: ${(props) => {
      if (props.palette === "dark") {
        return props.theme.colors.oxfordBlueTint6;
      } else {
        return "white";
      }
    }};
  }
  & .react-datepicker__month-container {
    background-color: ${(props) => (props.palette === "dark" ? props.theme.colors.oxfordBlueTint6 : "white")};
    & .react-datepicker__day--selected {
      background-color: ${(props) => (props.palette === "dark" ? props.theme.colors.oxfordBlue : "white")};
    }
  }
`;
