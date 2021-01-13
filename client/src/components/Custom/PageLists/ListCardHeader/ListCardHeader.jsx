import React from 'react';

import { Row } from 'react-bootstrap';
import Button from 'components/Base/Buttons/Button';

import { Header, CardTitle, WrapBtnHeader } from './styles';

function ListCardHeader(props) {
  const { title, data } = props;

  return (
    <Header>
      <Row>
        <CardTitle md={8}>
          <p>{title}</p>
        </CardTitle>
        <WrapBtnHeader md={4}>
          {data}
        </WrapBtnHeader>
      </Row>

    </Header>
  );
}

export default ListCardHeader;

