import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  voteForFrame: COLORS.green100,
  voteForBorder: COLORS.green600,
  voteForBorderActive: COLORS.green100,
  voteAgainstFrame: COLORS.red500,
  voteAgainstBorder: COLORS.red800,
  voteAgainstBorderActive: COLORS.red400,
};

export const lightColors = {
  voteForFrame: COLORS.green400,
  voteForBorder: COLORS.green100,
  voteForBorderActive: COLORS.green300,
  voteAgainstFrame: COLORS.red400,
  voteAgainstBorder: COLORS.red100,
  voteAgainstBorderActive: COLORS.red400,
};

export function getVoteFormColor (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
) {
  return getColorFn(theme, { lightColors, darkColors })(key);
}
