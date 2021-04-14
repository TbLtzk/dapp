import styled from 'styled-components';

import { Card, Col, Row } from 'react-bootstrap';
import { indents } from '../../../constants/style';

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
export const WrapRefreshBtn = styled.div`
  button{
    box-shadow: none;
    padding-left: 0;
    padding-right: 0;
    margin-right: 8px;
  }
`;

export const WrapTabs = styled(Row)`
  padding-top: ${indents[40]};
`;
export const WrapBtn = styled(Row)`
  padding-top: ${indents[40]};
`;

export const Title = styled.p`
 ${props => props.theme.fontStyles.title.big};
 text-transform: capitalize;
`;
export const TitleSmall = styled.h5`
  margin-bottom: 11px;
  ${props => props.theme.fontStyles.h5}

`;

export const Text = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 150%;
    color: ${props => props.theme.colors.lightGrey};
`;

export const Link = styled.a`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 150%;
    color: ${props => props.theme.colors.lightGrey};
`;
