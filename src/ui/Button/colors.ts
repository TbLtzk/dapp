import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

import { ButtonLook } from './Button';

import { capitalize } from 'utils/strings';

export const darkColors = {
  shadowLight: 'rgba(7, 23, 43, 0.64)',
  shadowDark: 'rgba(7, 23, 43, 0.8)',

  primaryBg: COLORS.grey100,
  primaryText: COLORS.blue800,
  primaryBorder: COLORS.transparent,
  primaryHoverBg: COLORS.grey300,
  primaryActiveText: COLORS.blue700,
  primaryDisabledBg: COLORS.blue700,
  primaryDisabledText: COLORS.grey600,
  primaryDisabledBorder: COLORS.transparent,
  primaryFocusOutline: COLORS.blue000,

  secondaryBg: COLORS.transparent,
  secondaryText: COLORS.grey000,
  secondaryBorder: COLORS.grey000,
  secondaryHoverBg: COLORS.blue600,
  secondaryActiveText: COLORS.grey000,
  secondaryDisabledBg: COLORS.transparent,
  secondaryDisabledText: COLORS.grey700,
  secondaryDisabledBorder: COLORS.grey700,
  secondaryFocusOutline: COLORS.blue000,

  ghostBg: COLORS.transparent,
  ghostText: COLORS.grey400,
  ghostBorder: COLORS.transparent,
  ghostHoverBg: COLORS.blue600,
  ghostActiveText: COLORS.grey500,
  ghostDisabledBg: COLORS.transparent,
  ghostDisabledText: COLORS.grey700,
  ghostDisabledBorder: COLORS.transparent,
  ghostFocusOutline: COLORS.blue000,

  dangerBg: COLORS.red200,
  dangerText: COLORS.blue800,
  dangerBorder: COLORS.transparent,
  dangerHoverBg: COLORS.red300,
  dangerActiveText: COLORS.blue700,
  dangerDisabledBg: COLORS.blue700,
  dangerDisabledText: COLORS.grey600,
  dangerDisabledBorder: COLORS.transparent,
  dangerFocusOutline: COLORS.red100,
};

export const lightColors = {
  shadowLight: 'rgba(7, 23, 43, 0.08)',
  shadowDark: 'rgba(7, 23, 43, 0.4)',

  primaryBg: COLORS.blue800,
  primaryText: COLORS.white,
  primaryBorder: COLORS.transparent,
  primaryHoverBg: COLORS.blue600,
  primaryActiveText: COLORS.grey100,
  primaryDisabledBg: COLORS.grey100,
  primaryDisabledText: COLORS.grey200,
  primaryDisabledBorder: COLORS.transparent,
  primaryFocusOutline: COLORS.blue100,

  secondaryBg: COLORS.transparent,
  secondaryText: COLORS.blue800,
  secondaryBorder: COLORS.blue800,
  secondaryHoverBg: COLORS.grey100,
  secondaryActiveText: COLORS.blue700,
  secondaryDisabledBg: COLORS.transparent,
  secondaryDisabledText: COLORS.grey200,
  secondaryDisabledBorder: COLORS.grey200,
  secondaryFocusOutline: COLORS.blue800,

  ghostBg: COLORS.transparent,
  ghostText: COLORS.grey600,
  ghostBorder: COLORS.transparent,
  ghostHoverBg: COLORS.grey100,
  ghostActiveText: COLORS.grey500,
  ghostDisabledBg: COLORS.transparent,
  ghostDisabledText: COLORS.grey200,
  ghostDisabledBorder: COLORS.transparent,
  ghostFocusOutline: COLORS.blue800,

  dangerBg: COLORS.red600,
  dangerText: COLORS.white,
  dangerBorder: COLORS.transparent,
  dangerHoverBg: COLORS.red500,
  dangerActiveText: COLORS.grey100,
  dangerDisabledBg: COLORS.grey100,
  dangerDisabledText: COLORS.grey200,
  dangerDisabledBorder: COLORS.transparent,
  dangerFocusOutline: COLORS.red900,
};

export function getButtonColor (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
): string {
  return getColorFn(theme, { lightColors, darkColors })(key);
}

type ButtonStyle = 'bg' | 'text' | 'border' | 'hoverBg' | 'activeText' | 'disabledBg' | 'disabledText' | 'disabledBorder' | 'focusOutline';

export function getLookColor (look: ButtonLook, style: ButtonStyle, theme: DefaultTheme) {
  return getButtonColor(theme, `${look}${capitalize(style)}`);
}
