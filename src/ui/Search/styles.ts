import styled, { css } from 'styled-components';

export const SearchContainer = styled.div<{
  $disabled: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px 4px 12px;
  height: 44px;
  border-radius: 8px;
  transition: all 100ms ease-out;
  cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'initial'};
  background-color: ${({ theme, $disabled }) => $disabled
    ? theme.colors.backgroundSecondary
    : theme.colors.naturalLight
  };
  border: 1px solid ${({ theme, $disabled }) => $disabled
    ? theme.colors.disableSecondary
    : 'transparent'
  };
  color: ${({ theme, $disabled }) => $disabled
    ? theme.colors.disableSecondary
    : theme.colors.textPrimary
  };

  .search-icon {
    transition: all 100ms ease-out;
    color: ${({ theme, $disabled }) => $disabled
      ? theme.colors.disableSecondary
      : theme.colors.iconAdditional
    };
  }

  input {
    padding: 0;
    border: none;
    text-align: left;
    width: 100%;
    background-color: inherit;
    color: inherit;
    outline: none;
    -webkit-appearance: none;

    &::placeholder {
      color: ${({ theme, $disabled }) => $disabled
        ? theme.colors.disableSecondary
        : theme.colors.textTertiary
      };
    }

    &:disabled {
      cursor: not-allowed;
    }

    &::-webkit-search-cancel-button {
      display: none;
    }
  }

  .search-reset {
    border-radius: 8px;
    padding: 4px;
    height: max-content;
  }

  ${({ $disabled }) => !$disabled && css`
    &:hover {
      border-color: ${({ theme }) => theme.colors.borderAdditional};
    }

    &:focus-within {
      border-color: ${({ theme }) => theme.colors.primaryMain};
    }

    &:focus-within,
    &:hover {
      .search-icon {
        color: ${({ theme }) => theme.colors.iconPrimary};
      }
    }
  `}
`;
