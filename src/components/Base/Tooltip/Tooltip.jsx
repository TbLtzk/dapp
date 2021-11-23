import colors from 'constants/colors'
import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'

function Tooltip ({ additionalInfo, children }) {
  return (
        <OverlayTrigger
            key="top"
            placement="top"
            overlay={
                <Popover id="popover-basic">
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
            <div style={{ cursor: 'help' }}> {children} </div>
        </OverlayTrigger>
  )
}

export default Tooltip
