import React from 'react';
import CustomBlock from 'components/Base/CustomBlock';

import { Title, BlockAlign } from '../../styles';

function SmallBlock(props) {
  const { title, firstSubtitle, secondSubtitle, firstContent, secondContent } = props;

  return (
    <CustomBlock style={{
      padding: '14px 10px',
      width: '100%'
    }}>
      <Title>{title}</Title>
      <div>
        <BlockAlign>
          <p>{firstSubtitle}</p>
          {firstContent}
        </BlockAlign>
        <BlockAlign>
          <p>{secondSubtitle}</p>
          {secondContent}
        </BlockAlign>
      </div>
    </CustomBlock>
  );
}

export default SmallBlock;

