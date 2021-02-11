import React from 'react';
import { Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import CustomBlock from 'components/Base/CustomBlock';
import ButtonLinkArrow from 'components/Base/Buttons/ButtonLinkArrow';
import ButtonLink from 'components/Base/Buttons/ButtonLink';

import { arrayLinksVoting, arrayLinksAuctions } from './constants';

import {
  BlockWrap, WrapDescrLink
} from 'components/Custom/PageLists/SidebarCards/References/styles';
import { WrapTitle, Title, WrapTitleBlock, WrapBtnView } from '../styles';

function References(props) {
  const { type } = props;
  const history = useHistory();

  const arrayLinks = (type === 'voting' ? arrayLinksVoting : arrayLinksAuctions);

  return (
    <BlockWrap>
      <WrapTitleBlock>
        <WrapTitle md={7}><Title>References</Title></WrapTitle>
        <WrapBtnView md={5}>
          <ButtonLinkArrow
            title="View Details"
            path="/#"
          />
        </WrapBtnView>
      </WrapTitleBlock>
      <CustomBlock>
        <Row>
          {arrayLinks.map((el, i) => {
            return (
              <WrapDescrLink md={12} key={i}>
                <ButtonLink
                  title={el.title}
                  handleLink={() => history.push(el.path)}
                />
              </WrapDescrLink>
            );
          })}
        </Row>

      </CustomBlock>
    </BlockWrap>

  );
}

export default References;

