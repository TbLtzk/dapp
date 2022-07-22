import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  border: COLORS.blue600,
  optionBgHover: COLORS.blue700,
  optionBgSelected: COLORS.blue600,
  optionFocusBorder: COLORS.blue000,
  error: COLORS.red300,
  enabled: COLORS.grey100,
  disabled: COLORS.grey600
};

export const lightColors = {

  border: COLORS.transparent,
  optionBgHover: COLORS.grey000,
  optionBgSelected: COLORS.grey100,
  optionFocusBorder: COLORS.blue100,
  error: COLORS.red500,
  enabled: COLORS.blue800,
  disabled: COLORS.grey200
};

export function getSelectColor (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
) {
  return getColorFn(theme, { lightColors, darkColors })(key);
}
