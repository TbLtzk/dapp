import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import colors from 'constants/colors.js';
import fontStyles from './fontStyles';
import fonts from './fonts';

export const indents = {
  10: '10px',
  15: '15px',
  20: '20px',
  30: '30px',
  40: '40px',
  45: '45px',
  50: '50px',
};

export const UsualText = styled.p`
  color: ${colors.white};
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
  background-color: ${(props) => (props.color ? props.color : '#282c34')};
  border-radius: 50%;
  margin-right: 7px;
`;

export const BlockBase = styled.div`
  background-color: ${colors.oxfordBlueTint1};
  box-shadow: 0 0 10px rgba(0, 34, 133, 0.25);
  border-radius: 3px;
  padding: 24px;
`;

export const Block = styled(BlockBase)`
  span {
    font-size: 14px;

    &:first-child, &.grey.single {
      color: ${colors.grey}
    }

    &:last-child {
      color: ${colors.white}
    }
  }

  div {
    display: flex;
    justify-content: space-between;
    padding-bottom: 12px;

    &:last-child {
      padding-bottom: 0;
    }
  }

  .form-container {
    display: block;

    span {
      display: block;
      color: ${colors.grey};
      margin-bottom: 12px;
    }

    .form-group {
      margin-right: 15px;
      width: 100%;
      display: block;
    }
  }

  .title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  button {
    height: 42px;
  }
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
  borderRadius: ['3px', '12px'],
  colors: {
    ...colors,
  },
};
export default theme;
