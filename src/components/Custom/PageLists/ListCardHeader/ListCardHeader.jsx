import React from 'react';

import { CardTitle, Header, WrapBtnHeader } from './styles';

function ListCardHeader ({ title, data }) {
  return (
    <Header>
      <CardTitle>{title}</CardTitle>
      <WrapBtnHeader>{data}</WrapBtnHeader>
    </Header>
  );
}

export default ListCardHeader;
