import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  label: COLORS.grey100,
  bg: COLORS.blue700,
  bgHover: COLORS.blue600,
  bgChecked: COLORS.grey100,
  bgCheckedHover: COLORS.grey300,
  bgDisabled: COLORS.transparent,
  bgDisabledChecked: COLORS.grey700,
  border: COLORS.grey300,
  borderDisabled: COLORS.grey700,
  focusOutline: COLORS.blue000,
  focusOutlineChecked: COLORS.blue000,
  circle: COLORS.grey300,
  circleChecked: COLORS.blue800,
  circleDisabled: COLORS.grey700,
};

export const lightColors = {
  label: COLORS.blue800,
  bg: COLORS.grey000,
  bgHover: COLORS.grey100,
  bgChecked: COLORS.blue800,
  bgCheckedHover: COLORS.blue600,
  bgDisabled: COLORS.grey000,
  bgDisabledChecked: COLORS.grey100,
  border: COLORS.grey400,
  borderDisabled: COLORS.grey100,
  focusOutline: COLORS.blue800,
  focusOutlineChecked: COLORS.blue100,
  circle: COLORS.grey400,
  circleChecked: COLORS.white,
  circleDisabled: COLORS.grey100,
};

export type SwitchColorType = keyof typeof darkColors | keyof typeof lightColors;

export function getSwitchColor (theme: DefaultTheme, key: SwitchColorType): string {
  return getColorFn(theme, { lightColors, darkColors })(key);
}
