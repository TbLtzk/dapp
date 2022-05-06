import React from 'react';

import Button from 'components/Base/Buttons/Button';
import ExplorerAddress from 'components/Custom/ExplorerAddress';

import { BlockAlignBlock } from './styles';

function CardBlock ({ title, firstContent, btnTitle, btnHandler, btnIcon, iconFontSize, btnDisabled }) {
  return (
    <BlockAlignBlock>
      <div>
        {title && <h5>{title}</h5>}
        <p>
          {firstContent && title === 'QUSD Contract'
            ? <ExplorerAddress address={firstContent} />
            : firstContent
          }
        </p>
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
  );
}

export default CardBlock;
