import React from 'react'

import { BlockAlignBlock } from './styles'
import Button from 'components/Base/Buttons/Button'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import colors from 'constants/colors'

function CardBlock ({ title, firstContent, btnTitle, btnHandler, btnIcon, iconFontSize, btnDisabled }) {
  const popover = (
        <Popover id="popover-basic">
            <Popover.Content
                style={{
                  background: colors.neonGreen
                }}
            >
                Copy
            </Popover.Content>
        </Popover>
  )

  return (
        <BlockAlignBlock>
            <div>
                {!title ? null : <h5>{title}</h5>}
                {!firstContent
                  ? null
                  : title === 'QUSD Contract'
                    ? (
                    <OverlayTrigger key="top" placement="top" overlay={popover}>
                        <CopyToClipboard text={firstContent}>
                            <p>{firstContent}</p>
                        </CopyToClipboard>
                    </OverlayTrigger>
                      )
                    : (
                    <p>{firstContent}</p>
                      )}
            </div>

            {!btnTitle && !btnIcon
              ? null
              : (
                <div>
                    <Button
                        disabled={btnDisabled}
                        icon={btnIcon}
                        title={btnTitle}
                        width="100%"
                        handleButton={btnHandler}
                        iconFontSize={iconFontSize}
                    />
                </div>
                )}
        </BlockAlignBlock>
  )
}

export default CardBlock
