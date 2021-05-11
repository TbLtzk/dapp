import styled from 'styled-components';

export const Block = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.oxfordBlueTint1};
  border-radius: 3px;
  padding: 20px;
  margin-bottom: 10px;

  h1 {
    color: ${props => props.theme.colors.white};
    font-size: 20px;
    line-height: 35px;
    margin-bottom: 15px;
    font-family: 'Lora', sans-serif;
  }

  h3 {
    color: ${props => props.theme.colors.oxfordBlueTint3};
    font-size: 16px;
    line-height: 17px;
    font-family: 'OpenSans', sans-serif;
    margin-bottom: 15px;
  }

  h4 {
    color: ${props => props.theme.colors.white};
    font-size: 12px;
    line-height: 17px;
    font-family: 'OpenSans', sans-serif;
    margin-bottom: 10px;
  }

  h5 {
    color: ${props => props.theme.colors.oxfordBlueTint3};
    font-size: 13px;
    line-height: 17px;
    font-family: 'OpenSans', sans-serif;
    margin-bottom: 2px;
  }

  p {
    font-size: 13px;
    margin-bottom: 15px;
  }

  .flex-space-between {
    display: flex;
    justify-content: space-between;
  }

  .actions {
    display: flex;
    align-items: flex-start;
    margin-top: 30px;

    & > *:not(:first-child) {
      margin-left: 10px;
    }
  }

  .card-spinner {
    display: flex;
    align-items: flex-start;
    margin: 15px 0;
  }

  .card-form-one-line {
    display: flex;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 15px;

    & > *:not(:first-child) {
      margin-left: 14px;
    }
  }

  .line {
    width: 100%;
    height: 1px;
    margin-top: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid ${props => props.theme.colors.oxfordBlueTint3};
  }
`;

export const BlockSubheader = styled.h5`
`;
