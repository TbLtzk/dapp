import React, { lazy, Suspense } from 'react';

import LoadingSpinner from 'components/Base/LoadingSpinner';
import CustomBlock from 'components/Base/CustomBlock';

import { tableHeader } from './constants';

import { Container, Row, Col } from 'react-bootstrap';
import {
  H5Headline, ContainerWrap, HeadlineWrap,
  LoadingWrap
} from '../styles';

const MemberTable = lazy(() => import('components/Custom/MembersPanel/MemberTable'));

function ExpertsPanel(props) {
  const { members, loading, errorMessage, title } = props;
  return (
    <CustomBlock>
      <ContainerWrap>
        <Container fluid>
          <Row>
            <Col xs={12}>
              <HeadlineWrap>
                <H5Headline>List of {title} Experts</H5Headline>
              </HeadlineWrap>
            </Col>
            <Suspense fallback={<LoadingWrap xs={12}><LoadingSpinner/></LoadingWrap>}>
              {loading ? <LoadingWrap xs={12}><LoadingSpinner/></LoadingWrap> :
                errorMessage || members?.length === 0 ? <Col xs={12}><p>No members</p></Col> :
                  <Col xs={12}>
                    <MemberTable
                      type="members"
                      arrayData={members}
                      tableHeader={tableHeader}
                    />
                  </Col>
              }
            </Suspense>
          </Row>
        </Container>
      </ContainerWrap>
    </CustomBlock>
  );
}

export default ExpertsPanel;

