import { COLORS, getColorFn } from '@q-dev/q-ui-kit';
import { DefaultTheme } from 'styled-components';

export const darkColors = {
  label: COLORS.grey300,
  labelDisabled: COLORS.grey600,
  track: COLORS.blue700,
  trackDisabled: COLORS.grey600,
  trackOutline: COLORS.blue000,
  thumbBg: COLORS.blue700,
  thumbBorder: COLORS.blue000,
  thumbBorderDisabled: COLORS.grey500,
  error: COLORS.red300,
};

export const lightColors = {
  label: COLORS.grey600,
  labelDisabled: COLORS.grey200,
  track: COLORS.blue000,
  trackDisabled: COLORS.grey000,
  trackOutline: COLORS.blue100,
  thumbBg: COLORS.white,
  thumbBorder: COLORS.blue800,
  thumbBorderDisabled: COLORS.grey100,
  error: COLORS.red500,
};

export function getRangeColor (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
) {
  return getColorFn(theme, { lightColors, darkColors })(key);
}
