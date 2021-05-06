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
  } = props;

  return (
    <BlockAlignBlock>
      <div>
        {!title ? null : <h5>{title}</h5>}
        {!firstContent ? null : <p>{firstContent}</p>}
      </div>

      {(!btnTitle && !btnIcon) ? null :
        <div>
          <Button
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

