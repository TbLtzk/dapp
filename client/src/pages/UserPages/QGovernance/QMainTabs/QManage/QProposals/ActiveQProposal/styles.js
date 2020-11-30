import styled from 'styled-components'

import {Button, Container} from "react-bootstrap";

import {colors, indents} from "constants/style";

export const WrapBtnBlock = styled.div`
    text-align: right;
`;

export const ButtonCustom = styled(Button)`
  display: inline-block;
  align-items: center;
  justify-content: center;
  width: 37px;
  height: 37px;
  padding: 0;
  border-color: ${colors.main};
  border-radius: 50%;
  background-color: ${colors.main};
  color: ${colors.white};
  box-shadow: 0 0 10px rgba(0, 34, 133, 0.25);
`;

export const BtnLabel = styled.p`
  display: inline-block;
  padding-left: 16px;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: ${colors.main};
`;
