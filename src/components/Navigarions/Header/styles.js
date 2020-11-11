import styled from 'styled-components'
import {Navbar} from "react-bootstrap";

import {colors, indents} from "constants/style";

export const NavbarContainer = styled(Navbar)`
  background-color: ${colors.white}!important;
  padding: ${indents["20"]};
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
