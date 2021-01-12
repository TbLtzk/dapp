import React, { useEffect, useState } from 'react';

import { drizzleReactHooks } from '@drizzle/react-plugin';

import { useDispatch, useSelector } from 'react-redux';
import { getRootMembersData } from 'store/actions/action-creaters/root-contract';
import {
  rootMembersData, rootMembersAmountStakes, loadingRootMembers, errorM,
} from 'store/selectors/root-contract';

import { Container, Row, Col } from 'react-bootstrap';

import RootService from 'api/contracts/RootService';
import PieChartCustom from 'components/Base/PieChartCustom';
import ButtonLinkArrow from 'components/Base/Buttons/ButtonLinkArrow';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import CustomBlock from '../../../Base/CustomBlock';
import MemberTable from '../MemberTable';

import {
  H5Headline, ContainerWrap, HeadlineWrap, TotalWrap,
  BottomText, LoadingWrap
} from '../styles';

import { tableHeader } from '../RootNodePanel/constants';

const { useDrizzle } = drizzleReactHooks;

function RootNodePanel(props) {
  const { type, bottom } = props;
  const { drizzle } = useDrizzle();
  const rootService = new RootService(drizzle);

  const rootMembersArray = useSelector(rootMembersData);
  const loading = useSelector(loadingRootMembers);
  const errorMessage = useSelector(errorM);
  const rootAmountStakes = useSelector(rootMembersAmountStakes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRootMembersData(rootService));
  }, [dispatch]);

  return (
    <CustomBlock>
      <ContainerWrap>
        <Container fluid>
          <Row>
            {loading ? <LoadingWrap xs={12}><LoadingSpinner/></LoadingWrap> :
              errorMessage ? <Col xs={12}><p>No roots node</p></Col> :
                <>
                  <Col xs={5}>
                    <HeadlineWrap>
                      <H5Headline>Root Node Panel</H5Headline>
                      {type !== 'with-total' ? null :
                        <TotalWrap>Total Stake: {rootAmountStakes + 'Q'}</TotalWrap>}
                    </HeadlineWrap>
                    <PieChartCustom/>
                  </Col>
                  <Col xs={7}>
                    <MemberTable
                      type="root-node"
                      arrayData={rootMembersArray}
                      tableHeader={tableHeader}
                    />
                    {
                      !bottom ? null :
                        <Row>
                          <Col xs={7}>
                            <BottomText>Create a proposal to enter
                              or leave the Root Node Panel</BottomText>
                          </Col>
                          <Col xs={5}>
                            <ButtonLinkArrow
                              title="Go to Governance"
                              path="/q-governance"
                            />
                          </Col>
                        </Row>
                    }
                  </Col>
                </>
            }
          </Row>
        </Container>
      </ContainerWrap>
    </CustomBlock>
  );
}

export default RootNodePanel;

