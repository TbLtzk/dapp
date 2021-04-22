import styled from 'styled-components'

import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

import {indents} from "constants/style";

export const NavbarContainer = styled(Navbar)`
  width: 350px;
  display: block;
  padding: ${indents["40"]};
  border-right: 1px solid ${props => props.theme.colors.oxfordBlueTint2};
  .header__logo {
    margin-bottom: 54px;
  }
`;

export const ListContainer = styled.div`
  display: block;

  button {
    margin-top: 56px;
  }
`;

export const ListTitle = styled.div`
  display: block;
  color: ${props => props.theme.colors.oxfordBlueTint3};
  font-size: 12px;
  margin-top: 34px;
`;

export const LinkStyle = styled(Link)`
  padding-left: 0;
  font-size: 15px;
  color: ${props => props.highlight === 1 ? props => props.theme.colors.activeLinks : props => props.theme.colors.white}!important;
`;

export const WrapLogo = styled.div`
  margin-bottom: 54px
`;
