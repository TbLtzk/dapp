import styled from 'styled-components'

export const Block = styled.div`
  width: 100%;
  max-width: 100%;
  background-color: ${(props) => props.theme.colors.oxfordBlueTint1};
  border-radius: 3px;
  padding: 20px;
  margin-bottom: 10px;
  height: fit-content;
  position: relative;

  h1 {
    color: ${(props) => props.theme.colors.white};
    font-size: 20px;
    line-height: 35px;
    margin-bottom: 15px;
    font-family: "Lora", sans-serif;
  }

  h2 {
    color: ${(props) => props.theme.colors.white};
    font-size: 40px;
    line-height: 45px;
    font-weight: 300;
    margin-bottom: 15px;
    font-family: "OpenSans", sans-serif;
  }

  h3 {
    color: ${(props) => props.theme.colors.oxfordBlueTint3};
    font-size: 16px;
    line-height: 17px;
    font-family: "OpenSans", sans-serif;
    margin-bottom: 15px;
  }

  h4 {
    color: ${(props) => props.theme.colors.white};
    font-size: 12px;
    line-height: 17px;
    font-family: "OpenSans", sans-serif;
    margin-bottom: 10px;
  }

  h5 {
    color: ${(props) => props.theme.colors.oxfordBlueTint3};
    font-size: 13px;
    line-height: 17px;
    font-weight: 600;
    font-family: "OpenSans", sans-serif;
    margin-bottom: 2px;
  }

  p {
    font-size: 13px;
    margin-bottom: 15px;
  }

  .card__actions {
    display: flex;
    align-items: flex-start;
    margin-top: 30px;

    & > *:not(:first-child) {
      margin-left: 10px;
    }
  }

  .card__spinner {
    display: flex;
    align-items: flex-start;
    margin: 15px 0;
  }

  .card__one-line-form {
    display: flex;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 15px;

    & > *:not(:first-child) {
      margin-left: 14px;
    }
  }

  .card__line {
    width: 100%;
    height: 1px;
    margin-top: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid ${(props) => props.theme.colors.oxfordBlueTint3};
  }

  .button__bottom {
    position: absolute;
    bottom: 15px;
  }
`
