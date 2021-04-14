import React, { lazy, Suspense, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getRootMembersData, getRootNodeStakes, getWithdrawals } from 'store/actions/action-creaters/root-contract';
import {
  rootMembersData, rootMembersAmountStakes, loadingRootMembers, errorM,
} from 'store/selectors/root-contract';
import { userAddressMetamask } from 'store/selectors/user-inf';

import RootService from 'contracts/src/Root';
import PieChartCustom from 'components/Base/PieChartCustom';
import ButtonLinkArrow from 'components/Base/Buttons/ButtonLinkArrow';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import CustomBlock from '../../../Base/CustomBlock';
// import MemberTable from '../MemberTable';
const MemberTable = lazy(() => import('components/Custom/MembersPanel/MemberTable'));

import { Container, Row, Col } from 'react-bootstrap';
import {
  H5Headline, ContainerWrap, HeadlineWrap, TotalWrap,
  BottomText, LoadingWrap
} from '../styles';

import { tableHeader } from '../RootNodePanel/constants';

function RootNodePanel(props) {
  const { type, bottom } = props;
  const rootService = new RootService();

  const userAddress = useSelector(userAddressMetamask);
  const rootMembersArray = useSelector(rootMembersData);
  const loading = useSelector(loadingRootMembers);
  const errorMessage = useSelector(errorM);
  const rootAmountStakes = useSelector(rootMembersAmountStakes);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRootMembersData(rootService));
    dispatch(getRootNodeStakes(rootService, userAddress));
  }, [dispatch]);

  return (
    <CustomBlock>
      <ContainerWrap>
        <Container fluid>
          <Row>
            <Suspense fallback={<LoadingWrap xs={12}><LoadingSpinner/></LoadingWrap>}>
              {loading ? <div>
                  <Col xs={12}> <H5Headline>Root Node Panel</H5Headline></Col>
                  <LoadingWrap xs={12}><LoadingSpinner/></LoadingWrap>
                </div> :
                errorMessage || rootMembersArray?.length === 0 ? <Col xs={12}><p>No roots node</p></Col> :
                  <>
                    <Col xs={4}>
                      <HeadlineWrap>
                        <H5Headline>Root Node Panel</H5Headline>
                        {type !== 'with-total' ? null :
                          <TotalWrap>Total Stake: {rootAmountStakes + 'Q'}</TotalWrap>}
                      </HeadlineWrap>
                      <PieChartCustom/>
                    </Col>
                    <Col xs={8}>
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
            </Suspense>
          </Row>
        </Container>
      </ContainerWrap>
    </CustomBlock>
  );
}

export default RootNodePanel;

