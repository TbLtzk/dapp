import styled from 'styled-components'

import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

import {indents} from "constants/style";

export const NavbarContainer = styled(Navbar)`
  background-color: ${props => props.theme.colors.oxfordBlue}!important;
  padding: ${indents["20"]};
  border-bottom: 1px solid ${props => props.theme.colors.oxfordBlueTint2};
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
  color: ${props => props.highlight === '1' ? props => props.theme.colors.black : props => props.theme.colors.links}!important;
`;
