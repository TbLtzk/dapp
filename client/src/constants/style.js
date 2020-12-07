import styled from 'styled-components';
import {Col} from "react-bootstrap";

export const colors = {
    main: '#2C2B9C',
    circleWhite: '#F1F2FD',
    blue: '#2B295C',
    darkBlue: '#151552',
    background: '#F3F7FC',
    grey: '#9595A5',
    lightGrey: '#A7AAB9',
    whiteGrey: '#AFB2CD',
    darkGrey: '#9A9A9A',
    black: '#2C2727',
    white: '#FFF',
    opacityWhite: 'rgba(255, 255, 255, 0.5)',
    darkWhite: '#F9F9F9',
    error: '#d6606b',
    green: '#34a853',
};

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
