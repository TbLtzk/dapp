import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { ChildrenWrapper } from './styles'

function Tooltip ({ additionalInfo, children, disabled, copy, placement = 'top' }) {
  return disabled
    ? (
        <div>{children}</div>
      )
    : (
        <OverlayTrigger
            key={placement}
            placement={placement}
            overlay={
                <Popover data-placement={placement}>
                    <Popover.Content>{additionalInfo}</Popover.Content>
                </Popover>
            }
        >
            <ChildrenWrapper>
                {copy
                  ? (
                      children
                    )
                  : (
                    <>
                        <span /> {children}
                    </>
                    )}
            </ChildrenWrapper>
        </OverlayTrigger>
      )
}

export default Tooltip
