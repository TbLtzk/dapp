import styled from 'styled-components'

export const AccountStatusForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .account-status__form-input {
    width: 50%;
  }

  .account-status__form-actions {
    width: 50%;
    display: flex;
    align-items: flex-start;

    & > *:first-child {
      margin-left: 15px;
    }

    & > *:not(:first-child) {
      margin-left: 10px;
    }
  }
`

export const AccountStatusInfo = styled.div`
  width: 100%;
  display: flex;

  & > *:not(:first-child) {
    margin-left: 38px;
  }
`
