import React, { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';

import CustomBlock from 'components/Base/CustomBlock';

import {
  Title, WrapTitle, BlockWrap, WrapDescr, WrapDescrTitle
} from './styles';

function SystemCard(props) {
  const { data, title } = props;

  return (
    <BlockWrap>
      <CustomBlock>
        <Row>
          <WrapTitle md={12}><Title>{title}</Title></WrapTitle>
          {data?.map((elem) => {
            return (
              <Fragment key={elem.title}>
                <WrapDescrTitle md={6}>{elem.title}</WrapDescrTitle>
                <WrapDescr md={6}>{elem.value}</WrapDescr>
              </Fragment>
            );
          })}
        </Row>
      </CustomBlock>
    </BlockWrap>
  );
}

export default SystemCard;

