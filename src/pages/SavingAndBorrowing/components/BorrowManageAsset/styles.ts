import styled from 'styled-components';

export const BorrowManageWrapper = styled.div`
  .borrow-forms {
    margin-top: 16px;
    display: grid;
    gap: 8px;
  }

  .borrow-manage-form {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px;

    .form-action {
      margin-top: 33px;
    }
  }
`;
