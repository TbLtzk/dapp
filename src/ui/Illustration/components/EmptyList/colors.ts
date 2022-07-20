import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  bg: '#091E37',
  itemBg: COLORS.blue800,
  itemPrimary: '#123665',
  itemSecondary: '#0F2D54',
};

export const lightColors = {
  bg: '#EAECF0',
  itemBg: COLORS.white,
  itemPrimary: '#C7D0D9',
  itemSecondary: '#EAECF0',
};

export function getEmptyListColor (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
) {
  return getColorFn(theme, { lightColors, darkColors })(key);
}
