import styled from "styled-components";

export const AlertWrapper = styled.div`
  background: ${(props) => props.theme.colors.oxfordBlueTint6};
  max-width: 500px;
  max-height: 220px;
  padding: 20px;
  pointer-events: auto;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;

  .alert-template__header {
    color: ${(props) => props.theme.colors.validationError};
    display: flex;
    justify-content: space-between;
    align-items: center;
    & h1 {
      margin-bottom: 0;
      margin-right: 20px;
      font-size: 20px;
      line-height: 35px;
      font-family: "Lora", sans-serif;
    }
  }

  .alert-template__text {
    color: ${(props) => props.theme.colors.oxfordBlue};
    font-size: 13px;
    line-height: 18px;
    font-family: "OpenSans", sans-serif;
    margin-bottom: 10px;
  }

  & .close {
    color: ${(props) => props.theme.colors.oxfordBlueTint2} !important;
  }
`;
