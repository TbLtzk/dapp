import { COLORS, getColorFn } from '@q-dev/q-ui-kit';
import { DefaultTheme } from 'styled-components';

export const darkColors = {
  linkBgActive: COLORS.blue600,
  linkBgHover: COLORS.blue700,
  linkText: COLORS.grey300,
  linkTextActive: COLORS.grey100,
  linkIconBg: COLORS.blue400,
  linkIconText: COLORS.white,
  overlay: 'rgba(7, 23, 43, 0.8)',
};

export const lightColors = {
  linkBgActive: COLORS.grey100,
  linkBgHover: COLORS.grey000,
  linkText: COLORS.grey600,
  linkTextActive: COLORS.grey800,
  linkIconBg: COLORS.blue400,
  linkIconText: COLORS.white,
  overlay: 'rgba(63, 86, 112, 0.24)',
};

export function getSidebarColor (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
) {
  return getColorFn(theme, { lightColors, darkColors })(key);
}
