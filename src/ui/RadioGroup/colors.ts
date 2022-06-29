import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  label: COLORS.grey300,
  labelDisabled: COLORS.grey600,
  error: COLORS.red300,
};

export const lightColors = {
  label: COLORS.grey600,
  labelDisabled: COLORS.grey200,
  error: COLORS.red500,
};

export type RadioGroupColorType = keyof typeof darkColors | keyof typeof lightColors;

export function getRadioGroupColor (theme: DefaultTheme, key: RadioGroupColorType): string {
  return getColorFn(theme, { lightColors, darkColors })(key);
}
