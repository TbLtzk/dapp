import React, { useEffect } from 'react';

import MemberTable from 'components/Custom/MembersPanel/MemberTable';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import CustomBlock from '../../../Base/CustomBlock';

import { tableHeader } from './constants';

import { Container, Row, Col } from 'react-bootstrap';
import {
  H5Headline, ContainerWrap, HeadlineWrap,
  LoadingWrap
} from '../styles';

function ExpertsPanel(props) {
  const { members, loading, errorMessage, title } = props;
  return (
    <CustomBlock>
      <ContainerWrap>
        <Container fluid>
          <Row>
            {loading ? <LoadingWrap xs={12}><LoadingSpinner/></LoadingWrap> :
              errorMessage || members?.length === 0 ? <Col xs={12}><p>No members</p></Col> :
                <>
                  <Col xs={12}>
                    <HeadlineWrap>
                      <H5Headline>List of {title} Experts</H5Headline>
                    </HeadlineWrap>
                  </Col>
                  <Col xs={12}>
                    <MemberTable
                      type="members"
                      arrayData={members}
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

export default ExpertsPanel;

