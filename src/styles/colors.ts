import { DefaultTheme } from 'styled-components';

export const THEMES = {
  light: 'light',
  dark: 'dark'
};

export type ThemeType = keyof typeof THEMES;

export const COLORS = {
  white: '#FFFFFF',
  transparent: 'transparent',

  blue000: '#CEE0F7',
  blue100: '#9FC3F0',
  blue200: '#74A8E9',
  blue300: '#4B8EE2',
  blue400: '#2374DB',
  blue500: '#1D60B5',
  blue600: '#133E75',
  blue700: '#0F2D54',
  blue800: '#0B2545',
  blue900: '#07172B',

  green000: '#DEFFD5',
  green100: '#87FF65',
  green200: '#32E500',
  green300: '#2BC500',
  green400: '#25A900',

  grey000: '#F1F3F7',
  grey100: '#E0E6EE',
  grey200: '#BAC8D8',
  grey300: '#98ADC5',
  grey400: '#7B96B5',
  grey500: '#5F80A5',
  grey600: '#4E6A8B',
  grey700: '#3F5670',
  grey800: '#304256',
  grey900: '#212D3B',

  red000: '#FEDEDB',
  red100: '#FCB4AD',
  red200: '#FB9A90',
  red300: '#F97062',
  red400: '#F73825',
  red700: '#A51407',
  red800: '#8E1106',
  red900: '#680C04',
  red500: '#E51D08',
  red600: '#BC1707',

  yellow000: '#F8D889',
  yellow100: '#F5C95C',
};

export const darkColors = {
  // TODO: remove old colors
  oxfordBlue: '#0B2545',
  oxfordBlueTint1: '#07172B',
  oxfordBlueTint2: '#3C516A',
  oxfordBlueTint3: '#6D7C8F',
  oxfordBlueTint4: '#8592A2',
  oxfordBlueTint5: '#B6BEC7',
  oxfordBlueTint6: '#E4EAF2',
  white: '#FFFFFF',
  neonGreen: '#87FF65',
  validationError: '#FF8550',
  red: '#FC4136',
  lightBlue: '#2374DB',
  yellow: '#F8D889',

  // new colors
  background: COLORS.blue900,
  textPrimary: COLORS.grey000,
  textSecondary: COLORS.grey300,
  block: COLORS.blue800,
  blockBorder: COLORS.blue700,
  blockDivider: COLORS.grey700,
  blockHover: COLORS.blue600,
  blockBorderHover: COLORS.grey100,
  blockShadow: 'rgba(23, 77, 145, 0.04)',
  blockShadowLight: 'rgba(7, 23, 43, 0.24)',
  blockShadowDark: 'rgba(7, 23, 43, 0.32)',
};

export const lightColors = {
  oxfordBlueTint1: '#E4EAF2',
  oxfordBlue: '#FFFFFF',
  oxfordBlueTint2: '#B6BEC7',
  oxfordBlueTint3: '#8592A2',
  oxfordBlueTint4: '#6D7C8F',
  oxfordBlueTint5: '#3C516A',
  oxfordBlueTint6: '#0B2545',
  white: '#07172B',
  neonGreen: '#67c54d',
  validationError: '#FF8550',
  red: '#FC4136',
  lightBlue: '#74A8E9',
  yellow: '#D7A118',

  // new colors
  background: COLORS.grey000,
  textPrimary: COLORS.blue800,
  textSecondary: COLORS.grey500,
  block: COLORS.white,
  blockBorder: COLORS.grey100,
  blockDivider: COLORS.grey100,
  blockHover: COLORS.grey100,
  blockBorderHover: COLORS.grey800,
  blockShadow: 'rgba(23, 77, 145, 0.04)',
  blockShadowLight: 'rgba(11, 37, 69, 0.1)',
  blockShadowDark: 'rgba(11, 37, 69, 0.12)',
};

export function getColorFn<T extends string> (
  theme: DefaultTheme,
  { lightColors, darkColors }: { lightColors: Record<T, string>,
    darkColors: Record<T, string> }
) {
  return (key: T) => {
    return theme.palette === 'light'
      ? lightColors[key]
      : darkColors[key];
  };
}
