import styled from 'styled-components'

import { Tabs, Tab } from 'react-bootstrap'

export const TabsStyle = styled(Tabs)`
  border-bottom: 0;
  margin-bottom: 18px;

  .nav-link.active{
    color: ${props => props.theme.colors.activeLinks};
    background-color: transparent;
    border-color: transparent;
  }
  .nav-link.active p:first-child{
    color: ${props => props.theme.colors.activeLinks};
  }
  .nav-link{
    padding: 6px 12px;
    color: ${props => props.theme.colors.links};
    font-style: normal;
    font-size: 15px;
    line-height: 20px;
  }
   .nav-link:hover{
    background-color: transparent;
    border-color: transparent;
  }
`
export const TabStyle = styled(Tab)`

`
