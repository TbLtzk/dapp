const generalColors = {
  oxfordBlue: '#0B2545',
  oxfordBlueTint1: '#07172B',
  oxfordBlueTint2: '#3C516A',
  oxfordBlueTint3: '#6D7C8F',
  oxfordBlueTint5: '#B6BEC7',
  white: '#FFFFFF',
  neonGreen: '#87FF65',
}

const colors = {
  ...generalColors,
  links: generalColors.white,
  activeLinks: generalColors.neonGreen,
  main: '#2C2B9C',
  circleWhite: '#F1F2FD',
  blue: '#2C2B9C',
  darkBlue: '#151552',
  grey: generalColors.oxfordBlueTint3,
  lightGrey: '#A7AAB9',
  whiteGrey: '#AFB2CD',
  darkGrey: '#9A9A9A',
  black: '#2C2727',
  totalBlack: '#000000',
  opacityWhite: 'rgba(255, 255, 255, 0.5)',
  darkWhite: '#F9F9F9',
  error: '#d6606b',
  green: '#34a853',
  // table
  th: generalColors.oxfordBlueTint3,
  td: generalColors.white
};
export default colors;
