import React, { lazy, Suspense, useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getValidatorMembers } from 'store/actions/action-creaters/validators';
import {
  loadingMembers, errorMembers, validatorMembers
} from 'store/selectors/validators';

import ButtonLinkArrow from 'components/Base/Buttons/ButtonLinkArrow';
// import MemberTable from 'components/Custom/MembersPanel/MemberTable';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import CustomBlock from 'components/Base/CustomBlock';

const MemberTable = lazy(() => import('components/Custom/MembersPanel/MemberTable'));

import { tableHeaderShort, tableHeaderWidened } from './constants';

import { Container, Row, Col } from 'react-bootstrap';
import {
  H5Headline, ContainerWrap, HeadlineWrap,
  BottomText, WrapBtn, LoadingWrap
} from '../styles';

function ValidatorsPanel(props) {
  const { bottom, widened } = props;

  const loading = useSelector(loadingMembers);
  const errorMessage = useSelector(errorMembers);
  const validators = useSelector(validatorMembers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getValidatorMembers());
  }, [dispatch]);

  const tableHeader = useMemo(() => {
    // if (!widened) {
      return tableHeaderShort;
    // } else {
    //   return tableHeaderWidened;
    // }
  }, [widened]);

  return (
    <CustomBlock>
      <ContainerWrap>
        <Container fluid>
          <Row>
            <Col xs={12}>
              <HeadlineWrap>
                <H5Headline>Validator Ranking</H5Headline>
              </HeadlineWrap>
            </Col>
            <Suspense fallback={<LoadingWrap xs={12}><LoadingSpinner/></LoadingWrap>}>
              {loading ? <LoadingWrap xs={12}><LoadingSpinner/></LoadingWrap> :
                errorMessage || validators?.length === 0 ? <Col xs={12}><p>No validators</p></Col> :
                  <Col xs={12}>
                    <MemberTable
                      type={'validators'}
                      // type={!widened ? 'validators' : 'validators-widened'}
                      arrayData={validators}
                      tableHeader={tableHeader}
                      widened
                    />
                  </Col>
              }
            </Suspense>
            <Col xs={12}>
              {!bottom
                ? <WrapBtn xs={12}>
                  <ButtonLinkArrow
                    title="See more details"
                    path="/staking"
                    stateHistory={{
                      activeTab: 'validator-staking'
                    }}
                  />
                </WrapBtn>
                : <Row>
                  <Col xs={7}>
                    <BottomText>Manage your validator pool parameters in piggy bank.</BottomText>
                  </Col>
                  <WrapBtn xs={5}>
                    <ButtonLinkArrow
                      title="Go to Piggy Bank"
                      path="/piggy-bank"
                    />
                  </WrapBtn>
                </Row>
              }
            </Col>
          </Row>
        </Container>
      </ContainerWrap>
    </CustomBlock>
  );
}

export default ValidatorsPanel;

