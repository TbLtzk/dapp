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

    a{
      margin-right: 10px;
      text-decoration: none;
    }
  }

  .card-spinner {
    display: flex;
    align-items: flex-start;
    margin: 15px 0;
  }
`;

export const BlockSubheader = styled.h5`
`;
