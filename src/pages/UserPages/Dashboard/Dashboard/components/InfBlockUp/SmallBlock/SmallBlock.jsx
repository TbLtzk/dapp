import React from 'react';
import CustomBlock from 'components/Base/CustomBlock';

function SmallBlock(props) {
  const {
    title,
    firstSubtitle,
    secondSubtitle,
    firstContent,
    secondContent,
    display
  } = props;

  return (
    <CustomBlock>
      <h1>{title}</h1>
      <div style={{ display: display === 'columns' ? 'flex' : 'block' }}>
        <div style={{ width: display === 'columns' ? '50%' : null }}>
          <h5>{firstSubtitle}</h5>
          <div style={{ display: 'flex' }}>
            {firstContent}
          </div>
        </div>
        <div style={{ width: display === 'columns' ? '50%' : null }}>
          <h5>{secondSubtitle}</h5>
          <div style={{ display: 'flex' }}>
            {secondContent}
          </div>
        </div>
      </div>
    </CustomBlock>
  );
}

export default SmallBlock;

