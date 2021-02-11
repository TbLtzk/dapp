import React, { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';

import CustomBlock from 'components/Base/CustomBlock';
import Button from 'components/Base/Buttons/Button';

import { Title, BlockWrap } from './styles';
import { WrapBtn, WrapDescr, WrapDescrTitle, WrapTitle } from '../styles';

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
          {title === 'QUSD System Balance' ?
            <WrapBtn md={12}>
              <Button
                title="Perform Netting"
                width="100%"
                handleButton={() => {
                  console.log('click');
                }}
              />
            </WrapBtn>
            : null
          }
        </Row>
      </CustomBlock>
    </BlockWrap>
  );
}

export default SystemCard;

