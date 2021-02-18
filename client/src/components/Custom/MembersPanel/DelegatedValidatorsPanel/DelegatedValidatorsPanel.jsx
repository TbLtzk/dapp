import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getValidatorMembers } from 'store/actions/action-creaters/validators';
import {
  loadingMembers, errorMembers, validatorMembers
} from 'store/selectors/validators';

import { Container, Row, Col } from 'react-bootstrap';

import MemberTable from 'components/Custom/MembersPanel/MemberTable';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import CustomBlock from '../../../Base/CustomBlock';

import { tableHeader } from './constants';

import {
  H5Headline, ContainerWrap, HeadlineWrap,
  LoadingWrap
} from '../styles';

function DelegatedValidatorsPanel() {
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
              errorMessage ? <Col xs={12}><p>No validators</p></Col> :
                <>
                  <Col xs={12}>
                    <HeadlineWrap>
                      <H5Headline>Your current delegations</H5Headline>
                    </HeadlineWrap>
                  </Col>
                  <Col xs={12}>
                    <MemberTable
                      type="delegated-validators"
                      arrayData={validators}
                      tableHeader={tableHeader}
                    />
                  </Col>
                </>
            }
          </Row>
        </Container>
      </ContainerWrap>
    </CustomBlock>
  );
}

export default DelegatedValidatorsPanel;

