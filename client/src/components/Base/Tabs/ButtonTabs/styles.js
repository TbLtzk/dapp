import styled from 'styled-components'

import {Tabs, Tab} from "react-bootstrap";

import {colors, indents} from "constants/style";


export const TabsStyle = styled(Tabs)`
  border-bottom: 0;
  .nav-link.active{
    color: ${colors.white};
    border-color: transparent;
    background:  ${colors.main};
  }
  .nav-link{
    margin-right: 20px;
    background: ${colors.white};
    border: 1px solid ${colors.lightGrey};
    box-sizing: border-box;
    border-radius: 8px;
    
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    color: ${colors.whiteGrey};
  }
`;
export const TabStyle = styled(Tab)`
    
`;
