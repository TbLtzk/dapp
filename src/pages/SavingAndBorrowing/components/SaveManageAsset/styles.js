import styled from 'styled-components';

export const SaveManageWrapper = styled.div`
  .saving-forms {
    margin-top: 16px;
    display: grid;
    gap: 8px;
  }

  .saving-form {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px;

    .form-action {
      margin-top: 33px;
    }
  }
`;
