import styled from 'styled-components'

import {Tabs, Tab} from "react-bootstrap";

import {indents} from "constants/style";


export const TabsStyle = styled(Tabs)`
  border-bottom: 0;
  .nav-link.active{
    color: ${props => props.theme.colors.white};
    border-color: transparent;
    background:  ${props => props.theme.colors.main};
  }
  .nav-link{
    margin-right: 20px;
    background: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.lightGrey};
    box-sizing: border-box;
    border-radius: 8px;
    
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    color: ${props => props.theme.colors.whiteGrey};
  }
`;
export const TabStyle = styled(Tab)`
    
`;
