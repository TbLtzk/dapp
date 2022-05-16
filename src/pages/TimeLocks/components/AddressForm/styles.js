import styled from 'styled-components';

export const WrapContainer = styled.div`
  display: flex;
  margin-top: 5px;
  max-width: 70%;

  & input {
    margin-right: 30px;
  }

  @media screen and (max-width: 1600px) {
    max-width: 100%;
  }
`;
