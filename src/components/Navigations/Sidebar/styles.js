import styled from 'styled-components';

import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { indents } from 'constants/style';

export const NavbarContainer = styled(Navbar)`
  width: 348px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: ${indents['40']};
  border-right: 1px solid ${props => props.theme.colors.oxfordBlueTint2};

  .header__logo {
    margin-bottom: 54px;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ListContainer = styled.div`
  display: block;
  width: 100%;
`;

export const ListTitle = styled.div`
  display: block;
  color: ${props => props.theme.colors.oxfordBlueTint3};
  font-size: 12px;
  margin-top: 34px;
`;

export const LinkGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 14px 0 0;

  :hover {
    background: ${props => props.theme.colors.oxfordBlueTint1};
  }

  button {
    margin: 0;
    padding: 0;
    background: transparent;
    color: ${props => props.theme.colors.white};
    border: none;
  }
`;

export const LinkStyle = styled(Link)`
  padding: 6px 12px;
  font-size: 15px;
  color: ${props => props.highlight === 1 ? props => props.theme.colors.activeLinks : props => props.theme.colors.white} !important;

  :hover {
    background: ${props => props.theme.colors.oxfordBlueTint1};
  }
`;

export const ALinkStyle = styled.a`
  padding-left: 0;
  font-size: 15px;
  color: ${props => props.theme.colors.white};

  :hover {
    color: ${props => props.theme.colors.white};
    text-decoration: underline;
  }
`;

export const WrapLogo = styled.div`
  margin-bottom: 54px
`;

export const AccordionIcon = styled.div`
  font-size: 20px;
  transform: rotate(${props => props.state ? '180deg' : '0'});
  transition-duration: 0.1s;
  transition-property: transform;
`;

export const AccordionLbl = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 18px;
  padding: 0 12px;
  color: ${(props) => props.highlight === 1 ? props.theme.colors.activeLinks : props.theme.colors.white};
  border: 1px solid ${(props) => props.highlight === 1 ? props.theme.colors.activeLinks : props.theme.colors.white};
  border-radius: 13px;
`;
