import React from 'react'
import styled, { css } from 'styled-components'

const ToggleSidebarWrapper = styled.div`
    position: absolute;
    right: ${(p) => p.right};
    color: transparent;
    top: 5px;
    z-index: 12;

    ${(p) =>
        p.openSidebar
            ? css`
                  transform: rotate(0);
              `
            : css`
                  transform: rotate(180deg);
                  color: ${(p) => p.theme.colors.oxfordBlueTint3};
              `}
    i {
        cursor: pointer;
        font-size: 25px;
    }

    &:hover {
        color: ${(p) => p.theme.colors.white} !important;
    }
`

function ToggleSidebar ({ openSidebar, setOpenSidebar, right }) {
  const handleClick = () => {
    if (openSidebar) {
      setOpenSidebar('')
      localStorage.setItem('sidebar-toggle', '0')
    } else {
      setOpenSidebar('0')
      localStorage.setItem('sidebar-toggle', '')
    }
  }

  return (
        <ToggleSidebarWrapper right={right} className="sidebar_toggle" openSidebar={openSidebar} onClick={handleClick}>
            <i className="mdi mdi-arrow-left-bold-box" />
        </ToggleSidebarWrapper>
  )
}

export default ToggleSidebar
