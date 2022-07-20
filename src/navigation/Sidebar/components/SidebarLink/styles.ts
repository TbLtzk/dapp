import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

import { getSidebarColor } from 'navigation/Sidebar/colors';

export const StyledLink = styled(NavLink)`
  width: 238px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 16px;
  cursor: pointer;
  outline: none;
  color: ${({ theme }) => getSidebarColor(theme, 'linkText')};

  &:hover,
  &:focus-visible {
    text-decoration: none;
    background-color: ${({ theme }) => getSidebarColor(theme, 'linkBgHover')};
    color: ${({ theme }) => getSidebarColor(theme, 'linkTextActive')};
  }

  &.active,
  &.active:hover,
  &.active:focus-visible {
    background-color: ${({ theme }) => getSidebarColor(theme, 'linkBgActive')};
    color: ${({ theme }) => getSidebarColor(theme, 'linkTextActive')};
  }

  .q-sidebar-link-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .q-sidebar-link-count {
    display: grid;
    place-content: center;
    align-items: flex-end;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${({ theme }) => getSidebarColor(theme, 'linkIconBg')};
    color: ${({ theme }) => getSidebarColor(theme, 'linkIconText')};
  }
`;
