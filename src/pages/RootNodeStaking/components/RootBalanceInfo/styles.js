import styled from 'styled-components';

export const BalanceWrapper = styled.div`
  width: 100%;
  display: flex;

  & > *:not(:first-child) {
    margin-left: 38px;
  }

  @media screen and (max-width: 1200px) {
    display: grid;

    & > *:not(:first-child) {
      margin-left: 0;
    }
  }
`;
