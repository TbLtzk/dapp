import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  infoBg: COLORS.grey700,
  warningBg: COLORS.red100,
  infoIcon: COLORS.blue300,
  warningIcon: COLORS.red500,
  text: COLORS.grey100,
  textWarning: COLORS.grey800
};

export const lightColors = {
  infoBg: COLORS.grey000,
  warningBg: COLORS.red000,
  infoIcon: COLORS.blue300,
  warningIcon: COLORS.red500,
  text: COLORS.grey800,
  textWarning: COLORS.grey800
};

export function getTipColor (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
) {
  return getColorFn(theme, { lightColors, darkColors })(key);
}
