import React from 'react'
import styled, { css } from 'styled-components'

const ToggleSidebarWrapper = styled.div`
    position: absolute;
    right: -14px;

    top: 5px;
    z-index: 40;
    color: transparent;

    ${(p) =>
        p.openSidebar
            ? css`
                  transform: rotate(0);
              `
            : css`
                  transform: rotate(180deg);
              `}
    i {
        cursor: pointer;
        font-size: 25px;
    }

    &:hover {
        color: ${(p) => p.theme.colors.white} !important;
    }
`

function ToggleSidebar ({ openSidebar, setOpenSidebar }) {
  const handleClick = () => {
    setOpenSidebar(!openSidebar)
  }

  return (
        <ToggleSidebarWrapper className="toggle-sidebar" openSidebar={openSidebar} onClick={handleClick}>
            <i className="mdi mdi-arrow-left-drop-circle" />
        </ToggleSidebarWrapper>
  )
}

export default ToggleSidebar
