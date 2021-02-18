import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getValidatorMembers } from 'store/actions/action-creaters/validators';
import {
  loadingMembers, errorMembers, validatorMembers
} from 'store/selectors/validators';

import { Container, Row, Col } from 'react-bootstrap';

import ButtonLinkArrow from 'components/Base/Buttons/ButtonLinkArrow';
import MemberTable from 'components/Custom/MembersPanel/MemberTable';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import CustomBlock from '../../../Base/CustomBlock';

import { tableHeader } from './constants';

import {
  H5Headline, ContainerWrap, HeadlineWrap,
  BottomText, WrapBtn, LoadingWrap
} from '../styles';

function ValidatorsPanel(props) {
  const { bottom } = props;

  const loading = useSelector(loadingMembers);
  const errorMessage = useSelector(errorMembers);
  const validators = useSelector(validatorMembers);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getValidatorMembers());
  }, [dispatch]);

  return (
    <CustomBlock>
      <ContainerWrap>
        <Container fluid>
          <Row>
            {loading ? <LoadingWrap xs={12}><LoadingSpinner/></LoadingWrap> :
              errorMessage || validators?.length === 0 ? <Col xs={12}><p>No validators</p></Col> :
                <>
                  <Col xs={12}>
                    <HeadlineWrap>
                      <H5Headline>Validator Ranking</H5Headline>
                    </HeadlineWrap>
                  </Col>
                  <Col xs={12}>
                    <MemberTable
                      type="validators"
                      arrayData={validators}
                      tableHeader={tableHeader}
                    />
                  </Col>
                </>
            }
            <Col xs={12}>
              {!bottom ? null :
                <Row>
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

