import styled from 'styled-components';
import Dropdown from 'ui/Dropdown';

export const SettingsDropdown = styled(Dropdown)`
  .settings-content {
    min-width: 277px;
    background-color: ${({ theme }) => theme.colors.block};
    box-shadow:
      0 4px 4px ${({ theme }) => theme.colors.blockShadowDark},
      0 -1px 2px ${({ theme }) => theme.colors.blockShadowLight};
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.blockBorder};
  }

  .settings-title {
    padding: 24px 32px 16px;
    display: flex;
    align-items: center;
    gap: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.blockBorder};
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: 0;
  }
`;
