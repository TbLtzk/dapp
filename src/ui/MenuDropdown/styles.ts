import styled from 'styled-components';
import Dropdown from 'ui/Dropdown';

export const MenuContainer = styled(Dropdown)`
  .menu-content {
    min-width: 277px;

    padding-top: 5px;
    padding-bottom: 5px;

    background-color: ${({ theme }) => theme.colors.block};
    box-shadow: 0 4px 4px ${({ theme }) => theme.colors.blockShadowDark},
      0 -1px 2px ${({ theme }) => theme.colors.blockShadowLight};
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.blockBorder};

    .menu-option {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
      padding: 8px 36px;
      cursor: pointer;

      &:hover {
        transition: all 0.15s ease-in-out;
        background-color: ${({ theme }) => theme.colors.blockBorder};
      }
    }
  }
`;
