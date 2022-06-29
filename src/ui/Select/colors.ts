import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  icon: COLORS.grey100,
  iconDisabled: COLORS.grey600,
  border: COLORS.blue600,
  optionBgHover: COLORS.blue700,
  optionBgSelected: COLORS.blue600,
  optionFocusBorder: COLORS.blue000,
};

export const lightColors = {
  icon: COLORS.blue800,
  iconDisabled: COLORS.grey200,
  border: COLORS.transparent,
  optionBgHover: COLORS.grey000,
  optionBgSelected: COLORS.grey100,
  optionFocusBorder: COLORS.blue100,
};

export type SelectColorType = keyof typeof darkColors | keyof typeof lightColors;

export function getSelectColor (theme: DefaultTheme, key: SelectColorType): string {
  return getColorFn(theme, { lightColors, darkColors })(key);
}
