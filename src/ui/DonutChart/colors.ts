import { COLORS, getColorFn } from '@q-dev/q-ui-kit';
import { DefaultTheme } from 'styled-components';

export const darkColors = {
  border: COLORS.blue800,
  section1: COLORS.blue600,
  section2: COLORS.blue400,
  section3: COLORS.blue200,
  section4: COLORS.blue000,
  section5: COLORS.grey500,
  section6: COLORS.grey200,
  tooltipBg: COLORS.grey100,
  tooltipText: COLORS.blue800,
};

export const lightColors = {
  border: COLORS.white,
  section1: COLORS.blue600,
  section2: COLORS.blue400,
  section3: COLORS.blue200,
  section4: COLORS.blue000,
  section5: COLORS.grey500,
  section6: COLORS.grey200,
  tooltipBg: COLORS.blue800,
  tooltipText: COLORS.white,
};

export function getDonutChartColor (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
) {
  return getColorFn(theme, { lightColors, darkColors })(key);
}
