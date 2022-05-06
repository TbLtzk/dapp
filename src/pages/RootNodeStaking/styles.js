import styled from 'styled-components';

export const AccountStatusForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .account-status__form-input {
    width: 60%;
  }

  .account-status__form-actions {
    width: 55%;
    display: flex;
    align-items: flex-start;

    & > *:first-child {
      margin-left: 15px;
    }

    & > *:not(:first-child) {
      margin-left: 10px;
    }
  }

  @media screen and (max-width: 1250px) {
    flex-direction: column;
    .account-status__form-input {
      width: 100%;
    }
    .account-status__form-actions {
      width: 100%;
      & > *:first-child {
        margin-left: 0;
      }
    }
  }
`;

export const AccountStatusInfo = styled.div`
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
