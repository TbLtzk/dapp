import React, { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';

import CustomBlock from 'components/Base/CustomBlock';
import ButtonLinkArrow from 'components/Base/Buttons/ButtonLinkArrow';

import {
  WrapTitleBlock, Title, WrapTitle, BlockWrap, WrapBtnView, WrapDescr,
  WrapDescrTitle, WrapBtn
} from './styles';
import Button from 'components/Base/Buttons/Button';
import { useHistory } from 'react-router-dom';

function Stats(props) {
  const { statsData, type } = props;
  const history = useHistory();

  return (
    <BlockWrap>
      <WrapTitleBlock>
        <WrapTitle md={7}><Title>{type} Stats</Title></WrapTitle>
        <WrapBtnView md={5}>
          <ButtonLinkArrow
            title="View Details"
            path="/piggy-bank"
          />
        </WrapBtnView>
      </WrapTitleBlock>
      <CustomBlock>
        <Row>
          {statsData?.map((elem) => {
            return (
              <Fragment key={elem.title}>
                <WrapDescrTitle md={6}>{elem.title}</WrapDescrTitle>
                <WrapDescr md={6}>{elem.value}</WrapDescr>
              </Fragment>
            );
          })}
          <WrapBtn md={12}>
            <Button
              title="Manage PiggyBank"
              width="100%"
              handleButton={() => {
                // console.log('click');
                history.push('piggy-bank');
              }}
            />
          </WrapBtn>
        </Row>
      </CustomBlock>
    </BlockWrap>
  );
}

export default Stats;

