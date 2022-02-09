import { indents } from 'constants/style'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

const handleSidebarOpen = (p) =>
  p.openSidebar
    ? null
    : css`
        visibility: hidden;
        width: 30px;
        padding: 0;
        .toggle-sidebar {
          color: ${(props) => props.theme.colors.oxfordBlueTint3};
          visibility: visible;
        }
      `

export const NavbarContainer = styled.div`
  width: 300px;
  display: grid;
  height: 100%;
  position: relative;
  align-content: space-between;
  padding: ${indents['30']};
  transition: all 0.5s ease-in-out;

  ${(p) => handleSidebarOpen(p)}

  &:hover .toggle-sidebar {
    color: ${(props) => props.theme.colors.oxfordBlueTint3};
  }

  @media screen and (max-width: 1450px) {
    padding: ${indents['15']};
    width: 270px;

    ${(p) => handleSidebarOpen(p)}

    &:hover .toggle-sidebar {
      color: ${(props) => props.theme.colors.oxfordBlueTint3};

    }
  }
`

export const FooterContainer = styled.div`
  margin-top: 20px;
`

export const Header = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.oxfordBlueTint2};
  height: calc(100vh - 70px);
`

export const ListContainer = styled.div`
  display: inline;

  overflow-x: hidden;
  overflow-y: auto;
`

export const ListTitle = styled.div`
  display: block;
  color: ${(props) => props.theme.colors.oxfordBlueTint3};
  font-size: 12px;
`

export const CopyAddressContainer = styled.span`
  display: flex;
  justify-content: space-between;

  .copied {
    position: relative;
    left: 40%;
  }
`

export const LinkGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 220px;

  :hover {
    background: ${(props) => props.theme.colors.oxfordBlueTint1};
  }

  button {
    margin: 0;
    padding-right: 4px;
    background: transparent;
    color: ${(props) => props.theme.colors.white};
    border: none;
  }
`

export const LinkStyle = styled(Link)`
  padding: 6px 12px;
  font-size: 15px;
  color: ${(props) =>
    props.highlight === 1 ? (props) => props.theme.colors.activeLinks : (props) => props.theme.colors.white} !important;

  :hover {
    background: ${(props) => props.theme.colors.oxfordBlueTint1};
  }
`

export const ALinkStyle = styled.a`
  padding-left: 0;
  font-size: 15px;
  color: ${(props) => props.theme.colors.white};

  :hover {
    color: ${(props) => props.theme.colors.white};
    text-decoration: underline;
  }
`

export const Footer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  & > :first-child {
    margin-right: 10px;
  }
`

export const AccordionIcon = styled.div`
  font-size: 20px;
  transform: rotate(${(props) => (props.state ? '180deg' : '0')});
  transition-duration: 0.1s;
  transition-property: transform;
`

export const AccordionLbl = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 18px;
  padding: 0 12px;
  color: ${(props) => (props.highlight === 1 ? props.theme.colors.activeLinks : props.theme.colors.white)};
  border: 1px solid ${(props) => (props.highlight === 1 ? props.theme.colors.activeLinks : props.theme.colors.white)};
  border-radius: 13px;
`
