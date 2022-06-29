import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  bg: COLORS.blue800,
  bgDisabled: COLORS.blue900,
  text: COLORS.grey000,
  textDisabled: COLORS.grey800,
  border: COLORS.transparent,
  borderHover: COLORS.grey700,
  borderFocus: COLORS.grey400,
  borderDisabled: COLORS.grey800,
  icon: COLORS.grey300,
  iconHover: COLORS.grey100,
  iconDisabled: COLORS.grey800,
  placeholder: COLORS.grey400,
  placeholderDisabled: COLORS.grey800,
};

export const lightColors = {
  bg: COLORS.white,
  bgDisabled: COLORS.grey000,
  text: COLORS.blue800,
  textDisabled: COLORS.grey200,
  border: COLORS.transparent,
  borderHover: COLORS.grey200,
  borderFocus: COLORS.grey200,
  borderDisabled: COLORS.grey100,
  icon: COLORS.grey600,
  iconHover: COLORS.blue800,
  iconDisabled: COLORS.grey200,
  placeholder: COLORS.grey400,
  placeholderDisabled: COLORS.grey200,
};

export type SearchColorType = keyof typeof darkColors | keyof typeof lightColors;

export function getSearchColor (theme: DefaultTheme, key: SearchColorType): string {
  return getColorFn(theme, { lightColors, darkColors })(key);
}
