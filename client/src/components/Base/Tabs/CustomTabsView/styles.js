import styled from 'styled-components'

import {Tabs, Tab} from "react-bootstrap";

import {colors, indents} from "constants/style";


export const TabsStyle = styled(Tabs)`
  //border-bottom: 0;
  .tab-content{
    padding-top:20px;
  }
  .nav-link.active{
    border: 1px solid ${colors.main};
    box-sizing: border-box;
    border-radius: 8px 8px 0 0;
    border-bottom-color: transparent;
    color: ${colors.main};
  }
  .nav-link{
    background-color: transparent;
    border-color: transparent;
    padding: 12px 23px 13px;
    border-bottom: 1px solid ${colors.main};
    margin-bottom: 50px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    color: ${colors.black};
  }
   .nav-link:hover{
    border-radius: 8px 8px 0 0;
    border-color: ${colors.main};
  }
`;
export const TabStyle = styled(Tab)`
    
`;
