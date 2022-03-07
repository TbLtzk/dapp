import styled, { css } from 'styled-components'
import { indents } from 'constants/style'
import { NavLink } from 'react-router-dom'

function handleSidebarOpen (p, width, padding, left) {
  if (!p.openSidebar) {
    return css`
      margin-right: ${indents['30']};
      .sidebar_container {
        position: absolute;
        padding: 0;
        left: ${left};
        .sidebar_links {
          transition: all 0.3s ease-in-out;
          visibility: hidden;
        }
        .mdi-chevron-right {
          font-size: 40px;
          position: absolute;
          transition: all 0.3s ease-in-out;
          top: 40%;
          display: block;
          right: -5px;
          visibility: visible;
          color: ${(props) => props.theme.colors.oxfordBlueTint3};
        }
      }
      .sidebar_container:hover {
        transition-delay: 0.3s;
        padding: ${padding};
        width: ${width};
        left: 0;
        background-color: ${(props) => props.theme.colors.oxfordBlue};
        .sidebar_links {
          transition-delay: 0.3s;
          visibility: visible;
        }
        .mdi-chevron-right {
          visibility: hidden;
          transition-delay: 0.2s;
        }
      }
    `
  }
  return null
}

export const FooterContainer = styled.div`
  margin-top: 20px;
  margin-left: 12px;
`

export const SidebarContainer = styled.div`
  height: calc(100vh - 70px);
  position: relative;

  .sidebar_container {
    display: grid;
    width: 310px;
    position: relative;
    height: 100%;
    transition: all 0.3s ease-in-out;
    align-content: space-between;

    padding: ${indents['30']};
    background-color: ${(props) => props.theme.colors.oxfordBlue};
    z-index: 10;

    border-right: 1px solid ${(props) => props.theme.colors.oxfordBlueTint2};
    .mdi-chevron-right {
      display: none;
    }
  }
  .sidebar_links {
    display: inline;
    overflow-y: auto;
    overflow-x: hidden;
  }

  ${(p) => handleSidebarOpen(p, '310px', indents['30'], '-280px')}

  &:hover .sidebar_toggle {
    color: ${(props) => props.theme.colors.oxfordBlueTint3};
  }

  @media screen and (max-width: 1550px) {
    .sidebar_container {
      padding: ${indents['15']};
      width: 280px;
    }
    ${(p) => handleSidebarOpen(p, '280px', indents['15'], '-250px')}
  }

  @media screen and (max-height: 650px) {
    .sidebar_container {
      overflow-x: hidden;

      .sidebar_links {
        display: block;
        overflow: visible;
      }
    }
  }
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
  width: 230px;
  border-radius: 4px;
  padding-right: 5px;
  color: ${(props) => props.theme.colors.white};

  :hover {
    background: ${(props) => props.theme.colors.oxfordBlueTint1};
  }

  button {
    margin: 0;
    padding-right: 4px;
    background: transparent;
    color: ${(props) => props.theme.colors.white};
    border: none;
    &:hover {
      color: ${(props) => props.theme.colors.neonGreen};
    }
  }
`

export const LinkStyle = styled(NavLink)`
  padding: 6px 12px;
  font-size: 15px;
  color: ${(p) => p.theme.colors.white};

  &.${(props) => props.activeClassName} {
    color: ${(p) => p.theme.colors.activeLinks};
  }

  :hover {
    cursor: pointer;
    text-decoration: none;
    color: ${(p) => p.theme.colors.white};
    &.${(props) => props.activeClassName} {
      color: ${(p) => p.theme.colors.activeLinks};
    }
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
  &.${(props) => props.activeClassName} {
    color: ${(p) => p.theme.colors.activeLinks};
  }
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
