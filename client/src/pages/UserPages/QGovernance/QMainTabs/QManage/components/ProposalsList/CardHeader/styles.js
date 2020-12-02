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
