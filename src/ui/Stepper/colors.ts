import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  regular: COLORS.grey600,
  passed: COLORS.grey100,
  icon: COLORS.blue800,
};

export const lightColors = {
  regular: COLORS.grey200,
  passed: COLORS.blue600,
  icon: COLORS.white,
};

export function getStepperColor (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
) {
  return getColorFn(theme, { lightColors, darkColors })(key);
}
