import {createGlobalStyle} from 'styled-components';

import MontserratMedium from './Montserrat-Medium.ttf';

import MulishBlack from './Mulish-Black.ttf';
import MulishBlackItalic from './Mulish-BlackItalic.ttf';
import MulishBold from './Mulish-Bold.ttf';
import MulishBoldItalic from './Mulish-BoldItalic.ttf';
import MulishExtraBold from './Mulish-ExtraBold.ttf';
import MulishExtraBoldItalic from './Mulish-ExtraBoldItalic.ttf';
import MulishExtraLight from './Mulish-ExtraLight.ttf';
import MulishExtraLightItalic from './Mulish-ExtraLightItalic.ttf';
import MulishItalic from './Mulish-Italic.ttf';
import MulishLight from './Mulish-Light.ttf';
import MulishLightItalic from './Mulish-LightItalic.ttf';
import MulishMedium from './Mulish-Medium.ttf';
import MulishMediumItalic from './Mulish-MediumItalic.ttf';
import MulishRegular from './Mulish-Regular.ttf';
import MulishSemiBold from './Mulish-SemiBold.ttf';
import MulishSemiBoldItalic from './Mulish-SemiBoldItalic.ttf';

export default createGlobalStyle`
    @font-face {
        font-family: 'Montserrat';
        src: url(${MontserratMedium}) format('ttf');
        font-weight: 500;
        font-style: normal;
    },
    @font-face {
        font-family: 'Mulish';
        src: url(${MulishExtraLight}) format('ttf');
        font-weight: 200;
        font-style: normal;
    },
    @font-face {
        font-family: 'Mulish';
        src: url(${MulishLight}) format('ttf');
        font-weight: 300;
        font-style: normal;
    },
     @font-face {
        font-family: 'Mulish';
        src: url(${MulishRegular}) format('ttf');
        font-weight: normal;
        font-style: normal;
    },
     @font-face {
        font-family: 'Mulish';
        src: url(${MulishMedium}) format('ttf');
        font-weight: 500;
        font-style: normal;
    },
    @font-face {
        font-family: 'Mulish';
        src: url(${MulishSemiBold}) format('ttf');
        font-weight: 600;
        font-style: normal;
    },
     @font-face {
        font-family: 'Mulish';
        src: url(${MulishBold}) format('ttf');
        font-weight: 700;
        font-style: normal;
    },
    @font-face {
        font-family: 'Mulish';
        src: url(${MulishExtraBold}) format('ttf');
        font-weight: 800;
        font-style: normal;
    },
     @font-face {
        font-family: 'Mulish';
        src: url(${MulishBlack}) format('ttf');
        font-weight: 900;
        font-style: normal;
    },
     @font-face {
        font-family: 'Mulish';
        src: url(${MulishExtraLightItalic}) format('ttf');
        font-weight: 200;
        font-style: italic;
    },
    @font-face {
        font-family: 'Mulish';
        src: url(${MulishLightItalic}) format('ttf');
        font-weight: 300;
        font-style: italic;
    },
    @font-face {
        font-family: 'Mulish';
        src: url(${MulishItalic}) format('ttf');
        font-weight: normal;
        font-style: italic;
    },
    @font-face {
        font-family: 'Mulish';
        src: url(${MulishMediumItalic}) format('ttf');
        font-weight: 500;
        font-style: italic;
    },
     @font-face {
        font-family: 'Mulish';
        src: url(${MulishSemiBoldItalic}) format('ttf');
        font-weight: 600;
        font-style: italic;
    },
     @font-face {
        font-family: 'Mulish';
        src: url(${MulishBoldItalic}) format('ttf');
        font-weight: 700;
        font-style: italic;
    },
    @font-face {
        font-family: 'Mulish';
        src: url(${MulishExtraBoldItalic}) format('ttf');
        font-weight: 800;
        font-style: italic;
    },
     @font-face {
        font-family: 'Mulish';
        src: url(${MulishBlackItalic}) format('ttf');
        font-weight: 900;
        font-style: italic;
    }
`;
