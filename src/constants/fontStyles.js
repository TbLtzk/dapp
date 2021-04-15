import fonts from './fonts.js';
import colors from './colors.js';

export default {
  h5: {
    fontFamily: fonts.primary,
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '20px',
    lineHeight: '25px',
    color: colors.white,
  },
  description: {
    small: {
      fontFamily: fonts.primary,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '18px',
      color: colors.lightGrey,
    },
  },
  title: {
    big: {
      fontFamily: fonts.primary,
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '24px',
      lineHeight: '30px',
      color: colors.white,
    },
    subtitle: {
      fontFamily: fonts.primary,
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: '150%',
      color: colors.white,
    }
  },
  text: {
    big: {
      fontFamily: fonts.primary,
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '150%',
      color: colors.white,
    },
    middle: {
      fontFamily: fonts.primary,
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '150%',
      color: colors.white,
    },
    little: {
      fontFamily: fonts.primary,
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '12px',
      lineHeight: '150%',
      color: colors.white,
    }
  }
};
