import styled from 'styled-components';
import {Col} from "react-bootstrap";
import fontStyles from "./fontStyles";
import fonts from "./fonts";
import colors from 'constants/colors.js';

export const indents = {
    10: '10px',
    20: '20px',
    30: '30px',
    40: '40px',
};


export const h5Text = styled.h5`
  font-size: ${indents["20"]};
  color: ${colors.black};
  font-style: normal;
`;

export const UsualText = styled.p`
  color: ${colors.black};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  margin-bottom: 0;
`;

export const LoadingWrap = styled(Col)`
  text-align: center;
`;

export const Circle = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: ${props => props.color ? props.color : "#282c34"};
  border-radius: 50%;
  margin-right: 7px;
`;

const theme = {
    fonts,
    fontSizes: ['12px', '16px', '18px', '20px', '24px', '32px', '36px', '40px', '48px'],
    fontStyles,
    spaces: [
        '4px',
        '8px',
        '12px',
        '16px',
        '20px',
        '24px',
        '32px',
        '40px',
        '48px',
        '56px',
        '64px',
        '72px',
        '80px',
    ],
    borderRadius: ['8px', '12px'],
    colors: {
        ...colors,
    },
};
export default theme;
