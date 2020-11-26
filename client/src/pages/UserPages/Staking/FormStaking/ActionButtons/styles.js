import styled from 'styled-components'

import {Tabs, Tab} from "react-bootstrap";

import {colors, indents} from "constants/style";


export const TabsStyle = styled(Tabs)`
  border-bottom: 0;
  .nav-link.active{
    color: ${colors.blue};
    background-color: transparent;
    border-color: transparent;
  }
  .nav-link{
    padding-left: 0;
    padding-right: 30px;
    color: ${colors.grey};
  }
   .nav-link:hover{
    background-color: transparent;
    border-color: transparent;
  }
`;
export const TabStyle = styled(Tab)`
    
`;
