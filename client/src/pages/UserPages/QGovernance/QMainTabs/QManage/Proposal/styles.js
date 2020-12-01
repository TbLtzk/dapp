import styled from 'styled-components'

import {Accordion, Card, Col} from "react-bootstrap";

import {colors, indents} from "constants/style";

export const CardBlock = styled(Card)`
  border:0;
  background: transparent;
`;

export const CardHeader = styled(Card.Header)`
  background: ${colors.main};
  border-radius: 8px 8px 0 0!important;
`;
export const WrapBtnHeader = styled(Col)`
  text-align: right;
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

export const CardBody = styled(Card.Body)`
    background-color: ${colors.white};
    border: 1px solid ${colors.lightGrey};
    box-sizing: border-box;
    border-radius: 0 0 8px 8px;
    padding: 15px 0 20px;
    margin-bottom: 16px;
`;
export const CollapsedBody = styled(Card.Body)`
   //width: 77%;
   margin-top: 20px;
`;

export const MainText = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
  color: ${colors.lightGrey};
`;

export const WrapToggleBlock = styled(Col)`
  text-align: right;
`;

export const ToggleBtn = styled.button`
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: ${colors.main};
  background: transparent;
  border: 0;
  outline: 0!important;
  span{
    margin-right: 8px;
  }
`;

export const Details = styled(Col)`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 150%;
    color: ${colors.whiteGrey};
    span{
      margin-left: 8px
    }
`;
