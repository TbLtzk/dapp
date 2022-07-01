import { DefaultTheme } from 'styled-components';
import { getColorFn } from 'styles/colors';

export const darkColors = {
  overlay: 'rgba(7, 23, 43, 0.8)',
};

export const lightColors = {
  overlay: 'rgba(63, 86, 112, 0.24)',
};

export function getModalColor (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
) {
  return getColorFn(theme, { lightColors, darkColors })(key);
}
