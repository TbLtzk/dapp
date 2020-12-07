import styled from 'styled-components'

import {Button, Card, Col, Container} from "react-bootstrap";

import {colors, indents} from "constants/style";

export const Header = styled(Card.Header)`
  background: ${colors.main};
  border-radius: 8px 8px 0 0!important;
`;

export const CardTitle = styled(Col)`
    p{
        display: flex;
        align-items: center;
        height: 100%;
        font-weight: 600;
        font-size: 18px;
        line-height: 150%;
        color: ${colors.white};
        margin-bottom: 0;
    }
`;

export const WrapBtnHeader = styled(Col)`
  text-align: right;
`;
export const LabelStatus = styled.div`
  display: inline-block;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: ${colors.opacityWhite};
  opacity: 0.5;
  border: 1px solid ${colors.white};
  box-sizing: border-box;
  border-radius: 8px;
  padding: 11px 20px;
  margin-right: 15px;
`;
