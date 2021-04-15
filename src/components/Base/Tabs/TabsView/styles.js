import styled from 'styled-components'

import {Tabs, Tab} from "react-bootstrap";

import {indents} from "constants/style";


export const TabsStyle = styled(Tabs)`
  border-bottom: 0;
  .nav-link.active{
    color: ${props => props.theme.colors.activeLinks};
    background-color: transparent;
    border-color: transparent;
  }
  .nav-link{
    padding-left: 0;
    padding-right: 30px;
    color: ${props => props.theme.colors.links};
  }
   .nav-link:hover{
    background-color: transparent;
    border-color: transparent;
  }
`;
export const TabStyle = styled(Tab)`

`;
