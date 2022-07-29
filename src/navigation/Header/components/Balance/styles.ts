import styled, { css } from 'styled-components';
import Dropdown from 'ui/Dropdown';

export const BalanceDropdown = styled(Dropdown)`
  .balance-content {
    min-width: 227px;
    padding-bottom: 12px;
    background-color: ${({ theme }) => theme.colors.block};
    box-shadow: 0 4px 4px ${({ theme }) => theme.colors.blockShadowDark},
      0 -1px 2px ${({ theme }) => theme.colors.blockShadowLight};
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.blockBorder};
  }

  .balance {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .balance-q {
    cursor: default;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.blockBorder};

    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .balance-action {
    padding: 10px;
    background-color: transparent;
    border: none;
    width: 100%;
    display: flex;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.colors.blockHover};
    }
  }
`;

export const QLogo = styled.div<{ width?: number, margin?: string }>`
  width: ${({ width }) => width || 20}px;
  margin: ${({ margin }) => margin || '0px'};
  img {
    max-width: 100%;
    height: auto;
    ${({ theme }) =>
      theme.palette === 'dark'
        ? css`
            filter: brightness(100);
          `
        : null}
  }
`;
