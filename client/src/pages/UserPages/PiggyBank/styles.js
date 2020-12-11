import styled from 'styled-components';

import { Col } from 'react-bootstrap';

import { colors } from 'constants/style';
import { Block } from '../../../components/Base/CustomBlock/styles';

export const Headline = styled.p`
  color: ${colors.black};
  font-weight: 600;
  font-size: 18px;
`;

export const TextWrapGrey = styled.p`
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 1rem;
  width: 100%;
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
  
  &.go-governance {
    font-weight: 600;
    display: flex;
    height: 100%;
    justify-content: flex-end;
    color: ${colors.blue};
  }
`;

export const TextPanel = styled.div`
  font-weight: 600;
  color: ${colors.black};
  ${(props) => {
    switch (props.type) {
      case 'parentNode':
        return `
                display: flex;
                justify-content: space-between;
                align-items: center;
              `;
      default:
        return '';
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
