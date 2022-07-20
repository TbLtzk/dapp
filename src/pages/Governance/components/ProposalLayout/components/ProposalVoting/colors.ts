import { DefaultTheme } from 'styled-components';
import { COLORS, getColorFn } from 'styles/colors';

export const darkColors = {
  voteFor: COLORS.green300,
  voteAgainst: COLORS.red400,
};

export const lightColors = {
  voteFor: COLORS.green300,
  voteAgainst: COLORS.red400,
};

export function getVotingColor (
  theme: DefaultTheme,
  key: keyof typeof darkColors | keyof typeof lightColors
) {
  return getColorFn(theme, { lightColors, darkColors })(key);
}
