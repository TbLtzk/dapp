import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  bg: COLORS.blue700,
  circle: COLORS.blue700,
  gradientA: '#98ADC5',
  gradientB: '#7B96B5',
  innerDark: COLORS.grey600,
  innerMedium: COLORS.grey500,
  innerLight: COLORS.grey700,
};

export const lightColors = {
  bg: '#EAECF0',
  circle: '#F2F4F7',
  gradientA: COLORS.white,
  gradientB: '#EAECF0',
  innerDark: '#C7D0D9',
  innerMedium: '#D8DFE6',
  innerLight: COLORS.white,
};

export function getBulbColor (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
) {
  return getColorFn(theme, { lightColors, darkColors })(key);
}
