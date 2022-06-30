
import styled from 'styled-components';

import { getToastColor } from './colors';
import { ToastType } from './Toast';

export const ToastContainer = styled.div<{
  $type: ToastType
}>`
  background-color: ${({ theme }) => theme.colors.block};
  box-shadow:
    0 8px 12px 6px ${({ theme }) => getToastColor(theme, 'shadowDark')},
    0 4px 4px ${({ theme }) => getToastColor(theme, 'shadowLight')};
  border-radius: 16px;
  display: grid;
  grid-template-columns: auto 1fr;
  max-width: 342px;
  width: 100%;
  overflow: hidden;

  &::before {
    content: '';
    display: flex;
    width: 14px;
    height: 100%;
    background-color: ${({ theme, $type }) => getToastColor(theme, $type)};
  }

  .toast-icon-wrp {
    color: ${({ theme, $type }) => getToastColor(theme, $type)};
    
    i {
      font-size: 32px;
    }
  }

  .toast-content {
    margin-top: 4px;
  }

  .toast-main {
    border: 1px solid ${({ theme }) => theme.colors.blockBorder};
    border-left: none;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 16px;
    padding: 12px 16px;
    border-radius: 0 16px 16px 0;
  }

  .toast-text {
    color: ${({ theme }) => theme.colors.textSecondary};
    word-break: break-all;
  }

  .toast-close {
    cursor: pointer;
    padding: 0;
    border: none;
    border-radius: 4px;
    display: flex;
    height: max-content;
    margin-top: 4px;
    background-color: transparent;
    color: ${({ theme }) => getToastColor(theme, 'closeBtn')};
    transition: all 100ms ease-out;

    &:hover,
    &:focus-visible {
      color: ${({ theme }) => getToastColor(theme, 'closeBtnHover')};
      transform: scale(1.1);
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => getToastColor(theme, 'closeBtnFocus')};
    }
  }
`;
