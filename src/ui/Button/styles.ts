import styled, { css } from 'styled-components';

import { ButtonLook } from './Button';
import { getButtonColor, getLookColor } from './colors';

export const StyledButton = styled.button<{
  $look: ButtonLook,
  $icon: boolean,
  loading: string,
  'data-active': string,
  $compact: boolean,
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: ${({ $compact }) => $compact ? '4px' : '8px'};
  width: max-content;
  height: ${({ $compact }) => $compact ? '32px' : '40px'};
  border-radius: 16px;
  cursor: pointer;
  transition: all 100ms ease-out;
  box-sizing: border-box;
  background-color: ${({ $look, theme }) => getLookColor($look, 'bg', theme)};
  color: ${({ $look, theme }) => getLookColor($look, 'text', theme)};
  border: none;
  box-shadow: inset 0 0 0 1px ${({ $look, theme }) => getLookColor($look, 'border', theme)};
  padding: ${({ $icon, $compact }) => {
    if ($compact) {
      return $icon ? '6px' : '6px 12px';
    }

    return $icon ? '10px' : '10px 16px';
  }};
  
  &:hover,
  &:focus-visible,
  &[loading='true'],
  &[data-active='true'] {
    background-color: ${({ $look, theme }) => getLookColor($look, 'hoverBg', theme)};
  }

  &:hover {
    ${({ $look, theme }) => $look !== 'ghost' && css`
      box-shadow:
        inset 0 0 0 1px ${getLookColor($look, 'border', theme)},
        0 1px 2px ${({ theme }) => getButtonColor(theme, 'shadowDark')},
        0 1px 4px 1px ${({ theme }) => getButtonColor(theme, 'shadowLight')};
    `}
  }

  &:active,
  &[loading='true'] {
    box-shadow: inset 0 0 0 1px ${({ $look, theme }) => getLookColor($look, 'border', theme)};
    color: ${({ $look, theme }) => getLookColor($look, 'activeText', theme)};
  }

  &[loading='true'] {
    pointer-events: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 2px ${({ $look, theme }) => getLookColor($look, 'focusOutline', theme)};
  }

  &:disabled,
  &:disabled:hover {
    cursor: not-allowed;
    box-shadow: none;
    background-color: ${({ $look, theme }) => getLookColor($look, 'disabledBg', theme)};
    color: ${({ $look, theme }) => getLookColor($look, 'disabledText', theme)};
    box-shadow: inset 0 0 0 1px ${({ $look, theme }) => getLookColor($look, 'disabledBorder', theme)};
  }

  & > i:first-child:not(:only-child),
  & > svg:first-child {
    margin-left: -4px;
  }

  & > i:last-child:not(:only-child) {
    margin-right: -4px;
  }
`;
