import React from 'react'
import { BlockAlignBlock } from './styles'

import Button from 'components/Base/Buttons/Button'
import ExplorerAddress from 'components/Custom/ExplorerAddress'

function CardBlock ({ title, firstContent, btnTitle, btnHandler, btnIcon, iconFontSize, btnDisabled }) {
  return (
        <BlockAlignBlock>
            <div>
                {title && <h5>{title}</h5>}
                <div className='card_text'>
                  {firstContent && title === 'QUSD Contract'
                    ? <ExplorerAddress address={firstContent} />
                    : firstContent
                  }
                </div>
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
