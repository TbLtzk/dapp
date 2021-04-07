import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import { Row } from 'react-bootstrap';

import CustomBlock from 'components/Base/CustomBlock';
import ButtonLinkArrow from 'components/Base/Buttons/ButtonLinkArrow';
import Button from 'components/Base/Buttons/Button';

import { BlockWrap } from './styles';
import { WrapTitle, Title, WrapBtn, WrapDescr, WrapDescrTitle, WrapBtnView, WrapTitleBlock } from '../styles';

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
              title="Manage Q Vault"
              width="100%"
              handleButton={() => {
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

