import { COLORS, getColorFn } from '@q-dev/q-ui-kit';
import { DefaultTheme } from 'styled-components';

export const darkColors = {
  tableHeader: COLORS.grey000,
  tableHeaderBg: COLORS.blue900,

  tableText: COLORS.grey000,
  tableBg: COLORS.blue700,
  tableHover: COLORS.grey100,

  link: COLORS.blue300,
  linkHover: COLORS.blue300,
  linkActive: COLORS.grey000,
  linkFocus: COLORS.blue300,
  linkDisabled: COLORS.grey700,

  linkBg: COLORS.transparent,
  linkBgHover: COLORS.blue700,
  linkBgActive: COLORS.blue500,
  linkBgFocus: COLORS.blue700,
  linkBgDisabled: COLORS.transparent,

  linkBorderFocus: COLORS.blue000,

  caret: COLORS.grey700,
  caretActive: COLORS.grey100,

};

export const lightColors = {
  tableHeader: COLORS.blue800,
  tableHeaderBg: COLORS.grey000,

  tableText: COLORS.blue800,
  tableBg: COLORS.white,
  tableHover: COLORS.blue800,

  link: COLORS.blue500,
  linkHover: COLORS.blue500,
  linkActive: COLORS.white,
  linkFocus: COLORS.blue500,
  linkDisabled: COLORS.grey200,

  linkBg: COLORS.transparent,
  linkBgHover: COLORS.grey100,
  linkBgActive: COLORS.grey600,
  linkBgFocus: COLORS.grey100,
  linkBgDisabled: COLORS.transparent,

  linkBorderFocus: COLORS.blue800,

  caret: COLORS.grey200,
  caretActive: COLORS.grey800,

};

export type TableColorType = keyof typeof darkColors | keyof typeof lightColors;

export function getTableColor (theme: DefaultTheme, key: TableColorType): string {
  return getColorFn(theme, { lightColors, darkColors })(key);
}
