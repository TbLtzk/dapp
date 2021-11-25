import colors from 'constants/colors'
import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { ChildrenWrapper } from './styles'

function Tooltip ({ additionalInfo, children, cursor, disabled }) {
  return disabled
    ? (
        <div>{children}</div>
      )
    : (
        <OverlayTrigger
            key="top"
            placement="top"
            overlay={
                <Popover>
                    <Popover.Content
                        style={{
                          fontSize: '12px',
                          textAlign: 'center',
                          backgroundColor: colors.neonGreen
                        }}
                    >
                        {additionalInfo}
                    </Popover.Content>
                </Popover>
            }
        >
            <ChildrenWrapper>
                <span /> {children}
            </ChildrenWrapper>
        </OverlayTrigger>
      )
}

export default Tooltip
