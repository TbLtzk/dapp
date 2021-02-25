import styled from 'styled-components';
import { Block } from '../../../components/Base/CustomBlock/styles';

export const Headline = styled.p`
  color: ${(props) => props.theme.colors.black};
  font-weight: 600;
  font-size: 18px;
`;

export const TextWrapGrey = styled.p`
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 1rem;
  width: 100%;
  color: ${(props) => props.theme.colors.lightGrey};
  display: flex;
  justify-content: space-between;
  span {
    height: 42px;
    display: flex;
    align-items: center;
  }
  span:last-child {
    color: ${(props) => props.theme.colors.black};
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    font-style: normal;
  }
`;

export const TextPanel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.black};
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

export const PanelAlign = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
`;

export const TextPanelSmallGrey = styled(TextPanelSmall)`
  color: ${(props) => props.theme.colors.grey};
`;

export const TextPanelSmallBlack = styled(TextPanelSmall)`
  color: ${(props) => props.theme.colors.black};
`;

export const CustomBlockPanel = styled(Block)`
  display: flex;
  justify-content: space-between;
  align-item: center;
  margin-bottom: 30px;
`;
