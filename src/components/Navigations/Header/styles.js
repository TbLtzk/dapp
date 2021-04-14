import styled from 'styled-components'

import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

import {indents} from "constants/style";

export const NavbarContainer = styled(Navbar)`
  background-color: ${props => props.theme.colors.white}!important;
  padding: ${indents["20"]};
  -webkit-box-shadow: 0px -1px 13px -4px rgba(0,0,0,0.6);
  box-shadow: 0px -1px 13px -4px rgba(0,0,0,0.6);
`;

export const ListContainer = styled(Navbar.Collapse)`
  justify-content: flex-end;
`;

export const WrapBtn = styled.div`
  margin-left: ${indents["30"]};
  @media (max-width: 991px) {
    margin-left: 0;
  }
`;

export const LinkStyle = styled(Link)`
  color: ${props => props.highlight === '1' ? props => props.theme.colors.black : props => props.theme.colors.main}!important;
`;
