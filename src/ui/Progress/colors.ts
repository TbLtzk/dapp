import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  bgTrack: COLORS.blue700,
  bgProgress: COLORS.blue000,
};

export const lightColors = {
  bgTrack: COLORS.blue000,
  bgProgress: COLORS.blue800,
};

export function getProgressColor (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
) {
  return getColorFn(theme, { lightColors, darkColors })(key);
}
