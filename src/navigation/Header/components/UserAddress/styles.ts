import styled from 'styled-components';
import Dropdown from 'ui/Dropdown';

export const AddressDropdown = styled(Dropdown)`
  .address-content {
    min-width: 227px;
    padding-bottom: 12px;
    background-color: ${({ theme }) => theme.colors.block};
    box-shadow:
      0 4px 4px ${({ theme }) => theme.colors.blockShadowDark},
      0 -1px 2px ${({ theme }) => theme.colors.blockShadowLight};
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.blockBorder};
  }

  .address-title {
    padding: 24px 32px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.blockBorder};
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: 0;
  }

  .address-action {
    padding: 12px 32px;
    background-color: transparent;
    border: none;
    width: 100%;
    display: flex;
    gap: 12px;
    white-space: nowrap;

    &:hover {
      background-color: ${({ theme }) => theme.colors.blockHover};
    }
  }
`;
