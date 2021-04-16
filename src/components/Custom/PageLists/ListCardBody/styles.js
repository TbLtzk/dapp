import styled from 'styled-components';

import { Button, Card, Col, Container } from 'react-bootstrap';

import { indents } from 'constants/style';

export const BlockBody = styled(Card.Body)`
    background-color: ${props => props.theme.colors.oxfordBlueTint1};
    box-sizing: border-box;
    border-radius: 0 0 3px 3px;
    padding: 15px 0 20px;
    margin-bottom: 16px;
`;
export const CollapsedBody = styled(Card.Body)`
   //width: 77%;
   margin-top: 20px;
`;

export const Details = styled(Col)`
  ${props => props.theme.fontStyles.text.middle};
  font-weight: 500;
  color: ${props => props.theme.colors.oxfordBlueTint3};
    span{
      margin-left: 8px;
      ${props => props.theme.fontStyles.text.middle};
      font-weight: 500;
    }
    p{
      ${props => props.theme.fontStyles.text.middle};
      font-weight: 500;
      color: ${props => props.theme.colors.oxfordBlueTint3};
      display: inline-block;
      margin-bottom: 0;
    }
`;

export const MainText = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  color: ${props => props.theme.colors.oxfordBlueTint3};
`;

export const WrapToggleBlock = styled(Col)`
  text-align: right;
`;

export const ToggleBtn = styled.button`
  ${props => props.theme.fontStyles.text.little};
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: ${props => props.theme.colors.white};
  background: transparent;
  border: 0;
  outline: 0!important;
  span{
    margin-right: 8px;
  }
`;

export const BtnShare = styled(ToggleBtn)`
  font-size: 15px;
  span{
  }
`;
