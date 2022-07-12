import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  label: COLORS.grey300,
  labelDisabled: COLORS.grey600,
  containerBg: COLORS.transparent,
  containerBgDisabled: COLORS.blue700,
  containerText: COLORS.grey100,
  containerTextDisabled: COLORS.grey600,
  containerBorder: COLORS.grey400,
  containerBorderHover: COLORS.grey100,
  containerBorderDisabled: COLORS.grey600,
  containerBorderError: COLORS.red300,
  placeholder: COLORS.grey400,
  placeholderDisabled: COLORS.grey600,
  error: COLORS.red300,
  selectedBg: COLORS.blue400,
  selectedText: COLORS.white,
  rangeBg: COLORS.blue600,
};

export const lightColors = {
  label: COLORS.grey600,
  labelDisabled: COLORS.grey200,
  containerBg: COLORS.transparent,
  containerBgDisabled: COLORS.grey000,
  containerText: COLORS.blue800,
  containerTextDisabled: COLORS.grey200,
  containerBorder: COLORS.grey200,
  containerBorderHover: COLORS.grey600,
  containerBorderDisabled: COLORS.grey200,
  containerBorderError: COLORS.red500,
  placeholder: COLORS.grey400,
  placeholderDisabled: COLORS.grey200,
  error: COLORS.red500,
  selectedBg: COLORS.blue400,
  selectedText: COLORS.white,
  rangeBg: COLORS.blue000,
};

export function getCalendarColor (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
) {
  return getColorFn(theme, { lightColors, darkColors })(key);
}
