const generalColors = {
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
}

const colors = {
  ...generalColors,
  links: generalColors.white,
  activeLinks: generalColors.neonGreen,
  main: generalColors.oxfordBlue,
  circleDark: generalColors.oxfordBlueTint2,
  circleWhite: generalColors.white,
  blue: generalColors.oxfordBlue,
  darkBlue: '#151552',
  grey: generalColors.oxfordBlueTint3,
  lightGrey: '#A7AAB9',
  whiteGrey: '#AFB2CD',
  darkGrey: '#9A9A9A',
  black: '#2C2727',
  totalBlack: '#000000',
  opacityWhite: 'rgba(255, 255, 255, 0.5)',
  darkWhite: '#F9F9F9',
  error: generalColors.validationError,
  green: generalColors.neonGreen,
  // table
  th: generalColors.oxfordBlueTint3,
  td: generalColors.white,
  // text
  darkText: generalColors.oxfordBlue,
  lightText: generalColors.white,
};
export default colors;
