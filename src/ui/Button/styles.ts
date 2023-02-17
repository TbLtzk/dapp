import styled, { css } from 'styled-components';

import { ButtonLook } from './Button';

export const StyledButton = styled.button<{
  $look: ButtonLook;
  $icon: boolean;
  loading: string;
  'data-active': string;
  $compact: boolean;
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
  background-color: ${({ theme, $look }) => {
    switch ($look) {
      case 'primary':
        return theme.colors.primaryMain;
      case 'secondary':
      case 'ghost':
        return 'transparent';
      case 'danger':
        return theme.colors.errorMain;
    }
  }};
  color: ${({ theme, $look }) => {
    switch ($look) {
      case 'primary':
        return theme.colors.textNeutral;
      case 'secondary':
      case 'ghost':
        return theme.colors.textPrimary;
      case 'danger':
        return theme.colors.buttonTextPrimary;
    }
  }};
  border: 1px solid ${({ theme, $look }) => {
    switch ($look) {
      case 'primary':
      case 'ghost':
      case 'danger':
        return 'transparent';
      case 'secondary':
        return theme.colors.borderMain;
    }
  }};
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
    background-color: ${({ theme, $look }) => {
      switch ($look) {
        case 'primary':
          return theme.colors.primaryMiddle;
        case 'secondary':
        case 'ghost':
          return theme.colors.tertiaryLight;
        case 'danger':
          return theme.colors.errorPrimary;
      }
    }};
  }

  &:hover {
    ${({ $look }) => $look !== 'ghost' && css`
      box-shadow:
        0 1px 2px ${({ theme }) => theme.colors.shadowMain},
        0 1px 4px 1px ${({ theme }) => theme.colors.shadowMain};
        `}
      color: ${({ theme, $look }) => {
        switch ($look) {
          case 'primary':
            return theme.colors.textNeutral;
          case 'secondary':
            return theme.colors.textPrimary;
          case 'ghost':
            return theme.colors.textActive;
          case 'danger':
            return theme.colors.buttonTextPrimary;
          }
    }};
  } 

  &:active {
    color: ${({ theme, $look }) => {
      switch ($look) {
        case 'primary':
          return theme.colors.primaryLight;
        case 'secondary':
        case 'ghost':
          return theme.colors.textSecondary;
        case 'danger':
          return theme.colors.tertiaryDark;
      }
    }};
  }

  &[loading='true'] {
    pointer-events: none;
  }

  &:focus-visible {
    outline: none;
    border: 2px solid ${({ theme, $look }) => {
      switch ($look) {
        case 'primary':
          return theme.colors.primaryLight;
        case 'secondary':
          return theme.colors.tertiaryMain;
        case 'ghost':
          return theme.colors.borderMain;
        case 'danger':
          return theme.colors.errorTertiary;
      }
    }};
  }

  &:disabled,
  &:disabled:hover {
    cursor: not-allowed;
    box-shadow: none;
    background-color: ${({ theme, $look }) => {
      switch ($look) {
        case 'primary':
        case 'danger':
          return theme.colors.disablePrimary;
        case 'secondary':
        case 'ghost':
          return 'transparent';
      }
    }};
    color: ${({ theme }) => theme.colors.disableSecondary};
    border-color: ${({ theme, $look }) => {
      switch ($look) {
        case 'primary':
        case 'ghost':
        case 'danger':
          return 'transparent';
        case 'secondary':
          return theme.colors.disableSecondary;
      }
    }};
  }

  & > i:first-child:not(:only-child),
  & > svg:first-child:not(:only-child) {
    margin-left: -4px;
  }

  & > i:last-child:not(:only-child) {
    margin-right: -4px;
  }
`;
