import { NavLink } from 'react-router-dom';

import styled, { css } from 'styled-components';

export const SidebarContainer = styled.div`
  height: calc(100vh - 70px);
  position: relative;
  display: grid;
  width: 310px;
  justify-content: center;
  align-content: space-between;
  padding: 16px 32px;
  background-color: ${(props) => props.theme.colors.oxfordBlue};
  border-right: 1px solid ${(props) => props.theme.colors.oxfordBlueTint2};
  .divider {
    margin-top: 24px;
    margin-bottom: 24px;
    border-bottom: 1px solid ${(props) => props.theme.colors.oxfordBlueTint3};
  }
  .sidebar_links {
    max-height: 50vh;
    overflow-y: auto;
    overflow-x: hidden;
  }

  &:hover .sidebar_toggle {
    color: ${(props) => props.theme.colors.oxfordBlueTint3};
  }

  @media screen and (max-width: 1550px) {
    width: 270px;
  }

  @media screen and (max-height: 650px) {
    overflow-x: hidden;

    .sidebar_links {
      display: block;
      overflow: visible;
    }
  }
`;

export const ListTitle = styled.div`
  display: block;
  color: ${(props) => props.theme.colors.oxfordBlueTint3};
  font-size: 12px;
`;

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
`;

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
`;

const filterImage = (theme) => {
  if (theme === 'dark') {
    return css`
      filter: brightness(0) saturate(100%) invert(77%) sepia(18%) saturate(135%) hue-rotate(171deg) brightness(99%)
        contrast(82%);
      &:hover {
        filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%)
          contrast(103%);
      }
    `;
  }
  return css`
    filter: brightness(0) saturate(100%) invert(28%) sepia(50%) saturate(351%) hue-rotate(173deg) brightness(94%)
      contrast(91%);
    &:hover {
      filter: brightness(0) saturate(100%) invert(8%) sepia(14%) saturate(4764%) hue-rotate(185deg) brightness(95%)
        contrast(100%);
    }
  `;
};

export const EcosystemAppsStyle = styled.div`
  display: flex;
  flex-wrap: wrap;

  .app_contaier {
    justify-content: center;
    text-align: center;
    width: 40px;
    height: 30px;
    transition: all 0.5s ease-out;

    img {
      width: 20px;
      height: 20px;
      cursor: pointer;
      ${(p) => filterImage(p.theme)}
    }
  }
`;

export const ExternalLinksStyle = styled.div`
  display: grid;
  margin: 12px;

  .external_link {
    padding-bottom: 8px;

    a {
      display: inline-block;
      font-size: 14px;
      color: ${(props) => props.theme.colors.oxfordBlueTint5};

      &:hover {
        color: ${(props) => props.theme.colors.white};
      }
    }

    .mdi {
      padding-top: 2px;
      margin-left: 9px;
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  & > :first-child {
    margin-right: 10px;
  }
`;

export const AccordionIcon = styled.div`
  font-size: 20px;
  transform: rotate(${(props) => (props.state ? '180deg' : '0')});
  transition-duration: 0.1s;
  transition-property: transform;
  &.${(props) => props.activeClassName} {
    color: ${(p) => p.theme.colors.activeLinks};
  }
`;

export const AccordionLbl = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 18px;
  padding: 0 12px;
  color: ${(props) => (props.highlight === 1 ? props.theme.colors.activeLinks : props.theme.colors.white)};
  border: 1px solid ${(props) => (props.highlight === 1 ? props.theme.colors.activeLinks : props.theme.colors.white)};
  border-radius: 13px;
`;

export const FooterContaier = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: ${(props) => props.theme.colors.oxfordBlueTint3};
  }

  p {
    display: flex;
    color: ${(props) => props.theme.colors.oxfordBlueTint3};
    font-size: 12px;
    cursor: pointer;
    margin: 0;
  }

  .policy_container {
    display: flex;
    text-align: center;
    align-items: center;
  }
`;
