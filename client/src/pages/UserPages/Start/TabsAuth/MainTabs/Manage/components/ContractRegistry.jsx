import React from "react";
import CustomBlock from '../../../../../../../components/Base/CustomBlock';
import { ContainerWrap, H5Headline, HeadlineWrap } from '../../../../../../../components/Custom/MembersPanel/styles';
import { Col, Container, Row } from 'react-bootstrap';

function ContractRegistry () {
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
          </Row>
        </Container>
      </ContainerWrap>
    </CustomBlock>
  )
}
export default ContractRegistry;
