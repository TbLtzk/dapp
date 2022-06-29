import styled from 'styled-components';

export const UiKitContainer = styled.div`
  display: grid;
  gap: 24px;
  padding: 32px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  height: calc(100vh - 72px);
  overflow-y: auto;

  .block {
    padding: 24px 32px;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.block};
  }

  .block-content {
    margin-top: 24px;
  }

  .color-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .color-item {
    width: 48px;
    height: 48px;
    border: 1px solid ${({ theme }) => theme.colors.blockBorder};
    border-radius: 4px;
  }

  .icon-list {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }

  .icon {
    font-size: 24px;
    transition: 100ms ease-out;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.textSecondary};

    &:hover {
      color: ${({ theme }) => theme.colors.textPrimary};
      transform: scale(1.3);
    }
  }

  .button-list {
    display: grid;
    gap: 24px;
  }

  .button-row {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .input-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .dropdown-item-content {
    font-size: 12px;
    padding: 16px;
    min-width: 240px;
    background-color: ${({ theme }) => theme.colors.block};
    color: ${({ theme }) => theme.colors.textPrimary};
    border: 1px solid ${({ theme }) => theme.colors.blockBorder};
    border-radius: 8px;
  }

  .switch-list {
    display: flex;
    gap: 32px;
  }

  .row-list {
    display: flex;
    gap: 24px;
    justify-content: space-between;
  }

  .radio-group-list {
    margin-top: 24px;
    display: flex;
    gap: 64px;
  }

  .typography-list {
    display: flex;
    justify-content: space-between;
  }

  .typography-item {
    display: grid;
    gap: 16px;
  }

  .typography-example {
    margin-top: 24px;
    display: grid;
    gap: 8px;
    max-width: 760px;
  }
`;
