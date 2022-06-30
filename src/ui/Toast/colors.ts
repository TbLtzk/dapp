import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  success: COLORS.green100,
  error: COLORS.red300,
  info: COLORS.blue300,
  closeBtn: COLORS.grey500,
  closeBtnHover: COLORS.grey100,
  closeBtnFocus: COLORS.blue000,
  shadowLight: 'rgba(0, 0, 0, 0.08)',
  shadowDark: 'rgba(0, 0, 0, 0.12)',
};

export const lightColors = {
  success: COLORS.green200,
  error: COLORS.red400,
  info: COLORS.blue400,
  closeBtn: COLORS.grey300,
  closeBtnHover: COLORS.blue800,
  closeBtnFocus: COLORS.blue100,
  shadowLight: 'rgba(0, 0, 0, 0.08)',
  shadowDark: 'rgba(0, 0, 0, 0.12)',
};

export function getToastColor (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
) {
  return getColorFn(theme, { lightColors, darkColors })(key);
}
