import React from 'react'

import { BlockAlignBlock } from './styles'
import Button from 'components/Base/Buttons/Button'
import CopyToClipboard from '../CopyToClipboard'

function CardBlock ({ title, firstContent, btnTitle, btnHandler, btnIcon, iconFontSize, btnDisabled }) {
  return (
        <BlockAlignBlock>
            <div>
                {title && <h5>{title}</h5>}
                {firstContent && title === 'QUSD Contract'
                  ? (
                    <CopyToClipboard valueToCopy={firstContent}>
                        <p>{firstContent}</p>
                    </CopyToClipboard>
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
