import React from 'react';
import CustomBlock from 'components/Base/CustomBlock';

import { Title, BlockAlign, BlockAlignBlock } from 'pages/UserPages/Start/TabsAuth/MainTabs/Dashboard/styles';
import Button from 'components/Base/Buttons/Button';
import { Col } from 'react-bootstrap';

function CardBlock(props) {
  const { title, firstContent, btnTitle, btnHandler } = props;

  return (
    <Col md={3} className="d-flex align-items-stretch">
      <BlockAlignBlock>
        <div>
          <p>{title}</p>
          <p>{firstContent}</p>
        </div>

        {!btnTitle ? null :
          <div>
            <Button
              title={btnTitle}
              width="100%"
              handleButton={btnHandler}
            />
          </div>
        }
      </BlockAlignBlock>
    </Col>
  );
}

export default CardBlock;

