import styled from 'styled-components';

import { Tabs, Tab } from 'react-bootstrap';

import { indents } from 'constants/style';

export const TabsStyle = styled(Tabs)`
  border-bottom: 0;
  .nav-link.active{
    color: ${props => props.theme.colors.activeLinks};
    background-color: transparent;
    border-color: transparent;
  }
  .nav-link.active p:first-child{
    color: ${props => props.theme.colors.activeLinks};
  }
  .nav-link{
    padding-left: 0;
    padding-right: 30px;
    color: ${props => props.theme.colors.links};
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
  }
   .nav-link:hover{
    background-color: transparent;
    border-color: transparent;
  }
`;
export const TabStyle = styled(Tab)`

`;
