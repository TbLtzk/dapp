import fonts from './fonts.js';
import colors from './colors.js';

export default {
    h5: {
        fontFamily: fonts.primary,
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '20px',
        lineHeight: '25px',
        color: colors.black,
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
            color: colors.black,
        },
        subtitle:{
            fontFamily: fonts.primary,
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '18px',
            lineHeight: '150%',
            color: colors.black,
        }
    },
    text: {
      big:{
          fontFamily: fonts.primary,
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '16px',
          lineHeight: '150%',
          color: colors.lightGrey,
      }
    }
};
