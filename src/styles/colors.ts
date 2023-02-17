
export const THEMES = {
  light: 'light',
  dark: 'dark'
};

export const COLORS = {
  white: '#FFFFFF',
  peachFuzz: '#FEECEB',
  frenchWhite: '#FDFDFD',
  whitePastel: '#F7F7F7',
  porcelain: '#ECECE7',
  silver: '#DBDBDB',
  mercury: '#DBDBD7',
  dustyGray: '#D5D6D1',
  silverChalice: '#C6C6C3',
  randMoon: '#B8B8B7',
  doveGray: '#8D8D8D',
  trolleyGrey: '#828282',
  battleshipGray: '#767676',
  gunmetal: '#606060',
  graniteGray: '#565656',
  celluloid: '#545455',
  onyx: '#4C4C4E',
  mineShaft: '#4B4B4E',
  boulder: '#404045',
  thunderbird: '#3D3D42',
  heather: '#373739',
  stiletto: '#333338',
  gray: '#303034',
  midnightBlue: '#2E2E33',
  midnight: '#26262B',
  ebonyClay: '#232327',
  closedShutter: '#222229',
  balticSea: '#1F1F21',
  capeCod: '#1E1E23',
  regentStBlue: '#1D1D21',
  pianoBlack: '#1C1C1F',
  nightRider: '#141416',
  blackPearl: '#070708',
  jalapenoRed: '#FD6354',
  coralRed: '#FB9A90',
  redTomato: '#F73825',
  grayMorn: '#F6F6F3',
  antiqueBrass: '#F6BA82',
  tahitiGold: '#F3A760',
  cherokeeRed: '#E51D08',
  martianColony: '#E37611',
  jungleGreen: '#B3F2D3',
  lime: '#1ADE66',
  cloudyCamouflage: '#15743C',
  appleGreen: '#00AD43',
  lavenderBlue: '#2929CB',
  frenchSkyBlue: '#2567E7'
};

export const darkColors = {
  // Brand colors
  primaryMain: COLORS.appleGreen,
  primaryDark: COLORS.cloudyCamouflage,
  primaryMiddle: COLORS.lime,
  primaryLight: COLORS.jungleGreen,

  secondaryMain: COLORS.porcelain,
  secondaryDark: COLORS.silverChalice,
  secondaryMiddle: COLORS.mercury,
  secondaryLight: COLORS.grayMorn,

  tertiaryMain: COLORS.midnightBlue,
  tertiaryDark: COLORS.blackPearl,
  tertiaryMiddle: COLORS.pianoBlack,
  tertiaryLight: COLORS.ebonyClay,

  naturalMain: COLORS.silverChalice,
  naturalLight: COLORS.capeCod,
  naturalAdditional: COLORS.frenchWhite,

  // Background
  backgroundPrimary: COLORS.nightRider,
  backgroundSecondary: COLORS.blackPearl,

  // Text
  textPrimary: COLORS.grayMorn,
  textSecondary: COLORS.doveGray,
  textTertiary: COLORS.silverChalice,
  textAdditional: COLORS.randMoon,
  textNeutral: COLORS.pianoBlack,
  textActive: COLORS.appleGreen,

  // Button text
  buttonTextPrimary: COLORS.midnightBlue,
  buttonTextSecondary: COLORS.porcelain,

  // Border
  borderMain: COLORS.grayMorn,
  borderPrimary: COLORS.balticSea,
  borderSecondary: COLORS.gray,
  borderTertiary: COLORS.trolleyGrey,
  borderAdditional: COLORS.mineShaft,

  // Icon
  iconPrimary: COLORS.grayMorn,
  iconSecondary: COLORS.doveGray,
  iconTertiary: COLORS.pianoBlack,
  iconNeutral: COLORS.pianoBlack,
  iconAdditional: COLORS.randMoon,
  iconError: COLORS.cherokeeRed,

  // Disable
  disablePrimary: COLORS.closedShutter,
  disableSecondary: COLORS.mineShaft,

  // States
  infoPrimary: COLORS.frenchSkyBlue,
  infoSecondary: COLORS.lavenderBlue,

  errorMain: COLORS.jalapenoRed,
  errorPrimary: COLORS.coralRed,
  errorSecondary: COLORS.cherokeeRed,
  errorTertiary: COLORS.peachFuzz,
  errorAdditional: COLORS.coralRed,

  warningPrimary: COLORS.tahitiGold,
  warningSecondary: COLORS.tahitiGold,

  successMain: COLORS.lime,

  // Bulb
  bulbBackground: COLORS.midnight,
  bulbGradientA: COLORS.celluloid,
  bulbGradientB: COLORS.stiletto,
  bulbInnerDark: COLORS.heather,
  bulbInnerMedium: COLORS.onyx,
  bulbInnerLight: COLORS.gunmetal,

  // EmptyList
  listBackgroundPrimary: COLORS.regentStBlue,
  listBackgroundSecondary: COLORS.thunderbird,
  listPrimary: COLORS.blackPearl,
  listSecondary: COLORS.pianoBlack,

  // Shadow
  shadowMain: 'rgba(30, 30, 35, 0.3)',
  shadowDark: 'rgba(0, 0, 0, 0.3)',
  shadowMiddle: 'rgba(28, 28, 31, 0.3)',
  shadowLight: 'rgba(75, 75, 78, 0.3)',

  blockShadow: 'rgba(23, 77, 145, 0.04)',
  blockShadowLight: 'rgba(0, 0, 0, 0.12)',
  blockShadowDark: 'rgba(0, 0, 0, 0.08)',

  backdropOverlay: 'rgba(46, 46, 51, 0.64)',
};

export const lightColors = {
  // Brand colors
  primaryMain: COLORS.appleGreen,
  primaryDark: COLORS.cloudyCamouflage,
  primaryMiddle: COLORS.lime,
  primaryLight: COLORS.jungleGreen,

  secondaryMain: COLORS.midnightBlue,
  secondaryDark: COLORS.pianoBlack,
  secondaryMiddle: COLORS.mineShaft,
  secondaryLight: COLORS.doveGray,

  tertiaryMain: COLORS.porcelain,
  tertiaryDark: COLORS.silverChalice,
  tertiaryMiddle: COLORS.mercury,
  tertiaryLight: COLORS.grayMorn,

  naturalMain: COLORS.boulder,
  naturalLight: COLORS.white,
  naturalAdditional: COLORS.frenchWhite,

  // Background
  backgroundPrimary: COLORS.frenchWhite,
  backgroundSecondary: COLORS.whitePastel,

  // Text
  textPrimary: COLORS.pianoBlack,
  textSecondary: COLORS.graniteGray,
  textTertiary: COLORS.battleshipGray,
  textAdditional: COLORS.doveGray,
  textNeutral: COLORS.pianoBlack,
  textActive: COLORS.appleGreen,

  // Button text
  buttonTextPrimary: COLORS.grayMorn,
  buttonTextSecondary: COLORS.midnightBlue,

  // Border
  borderMain: COLORS.pianoBlack,
  borderPrimary: COLORS.porcelain,
  borderSecondary: COLORS.silver,
  borderTertiary: COLORS.battleshipGray,
  borderAdditional: COLORS.silverChalice,

  // Icon
  iconPrimary: COLORS.pianoBlack,
  iconSecondary: COLORS.doveGray,
  iconTertiary: COLORS.grayMorn,
  iconNeutral: COLORS.pianoBlack,
  iconAdditional: COLORS.graniteGray,
  iconError: COLORS.cherokeeRed,

  // Disable
  disablePrimary: COLORS.grayMorn,
  disableSecondary: COLORS.silverChalice,

  // States
  infoPrimary: COLORS.frenchSkyBlue,
  infoSecondary: COLORS.lavenderBlue,

  errorMain: COLORS.cherokeeRed,
  errorPrimary: COLORS.redTomato,
  errorSecondary: COLORS.coralRed,
  errorTertiary: COLORS.peachFuzz,
  errorAdditional: COLORS.coralRed,

  warningPrimary: COLORS.martianColony,
  warningSecondary: COLORS.antiqueBrass,

  successMain: COLORS.lime,

  // Bulb
  bulbBackground: COLORS.porcelain,
  bulbGradientA: COLORS.frenchWhite,
  bulbGradientB: COLORS.dustyGray,
  bulbInnerDark: COLORS.silverChalice,
  bulbInnerMedium: COLORS.mercury,
  bulbInnerLight: COLORS.white,

  // EmptyList
  listBackgroundPrimary: COLORS.porcelain,
  listBackgroundSecondary: COLORS.white,
  listPrimary: COLORS.silverChalice,
  listSecondary: COLORS.mercury,

  // Shadow
  shadowMain: 'rgba(30, 30, 35, 0.15)',
  shadowDark: 'rgba(0, 0, 0, 0.1)',
  shadowMiddle: 'rgba(28, 28, 31, 0.1)',
  shadowLight: 'rgba(75, 75, 78, 0.1)',

  blockShadow: 'rgba(23, 77, 145, 0.04)',
  blockShadowLight: 'rgba(0, 0, 0, 0.12)',
  blockShadowDark: 'rgba(0, 0, 0, 0.08)',

  backdropOverlay: 'rgba(28, 28, 31, 0.24)',
};
