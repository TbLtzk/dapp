import styled from 'styled-components';
import { Block } from '../../../components/Base/CustomBlock/styles';

import {Col} from "react-bootstrap";

import {colors} from "constants/style";

export const Headline = styled.p`
  color: ${colors.black};
  font-weight: 600;
  font-size: 18px;
`;

export const TextWrap = styled(Col)`
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 1rem;
`;

export const TextWrapGrey = styled(TextWrap)`
  color: ${colors.lightGrey};
  display: flex;
  justify-content: space-between;
  span {
    height: 42px;
    display: flex;
    align-items: center;
  }
  span:last-child {
    color: ${colors.black};
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-style: normal;
  }
`;

export const TextPanel = styled.div`
  font-weight: 600;
  color: ${colors.black};
  ${props => {
      switch(props.type) {
          case 'parentNode':
              return `
                display: flex;
                justify-content: space-between;
                align-items: center;
              `
          default:
              return ``
      }
}}
`;

export const TextPanelSmall = styled(TextPanel)`
  font-weight: 400;
  font-size: 12px;
`;

export const TextPanelSmallGrey = styled(TextPanelSmall)`
  color: ${colors.grey};
`;

export const TextPanelSmallBlack = styled(TextPanelSmall)`
  color: ${colors.black};
`;

export const CustomBlockPanel = styled(Block)`
  display: flex;
  justify-content: space-between;
  align-item: center;
  margin-bottom: 30px;
`;


