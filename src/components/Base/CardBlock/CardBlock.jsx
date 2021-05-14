import React from 'react';

import { BlockAlignBlock } from './styles';
import Button from 'components/Base/Buttons/Button';

function CardBlock(props) {
  const {
    title,
    firstContent,
    btnTitle,
    btnHandler,
    btnIcon,
    iconFontSize,
    btnDisabled,
  } = props;

  return (
    <BlockAlignBlock>
      <div>
        {title === undefined ? null : <h5>{title}</h5>}
        {firstContent === undefined ? null : <p>{firstContent}</p>}
      </div>

      {(!btnTitle && !btnIcon) ? null :
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
      }
    </BlockAlignBlock>
  );
}

export default CardBlock;

