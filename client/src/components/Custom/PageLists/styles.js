import styled from 'styled-components'

import {Card, Col} from "react-bootstrap";

export const LabelStatus = styled.div`
  display: inline-block;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  color: ${props => props.theme.colors.opacityWhite};
  opacity: 0.5;
  border: 1px solid ${props => props.theme.colors.white};
  box-sizing: border-box;
  border-radius: 8px;
  padding: 11px 20px;
`;

export const WrapVoteBtn = styled.div`
  margin-left: 15px;
  display: inline-block;
`;
