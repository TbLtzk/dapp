import React, { Suspense } from 'react';
import CustomBlock from 'components/Base/CustomBlock';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import KeyAddressesTable from '../KeyAddressesTable';
import {
  ContainerWrap,
  H5Headline,
  HeadlineWrap,
  LoadingWrap
} from 'components/Custom/MembersPanel/styles';
import { Col, Container, Row } from 'react-bootstrap';
import { Text } from '../../../../../../QGovernance/components/ProposalsList/VoteBreakdown/styles';

function KeyAddressViewer(props) {
  const {
    tableData,
    loading,
    errorMsg,
    header,
    subHeader,
    tableHeaders = [],
    emptyMsg
  } = props;
  return (
    <CustomBlock>
      <ContainerWrap>
        <Container fluid>
          <Row>
            <Col xs={12}>
              <HeadlineWrap>
                <H5Headline>{header}</H5Headline>
              </HeadlineWrap>
              <HeadlineWrap>
                <Text>{subHeader}</Text>
              </HeadlineWrap>
            </Col>
            <Suspense fallback={<LoadingWrap xs={12}><LoadingSpinner/></LoadingWrap>}>
              {loading ? <LoadingWrap xs={12}><LoadingSpinner/></LoadingWrap> :
                errorMsg ? <Col xs={12}><p>{errorMsg}</p></Col> :
                  !tableData?.length ? <Col xs={12}><p>{emptyMsg}</p></Col> :
                    <Col xs={12}>
                      <KeyAddressesTable
                        tableData={tableData}
                        tableHeaders={tableHeaders}
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

export default KeyAddressViewer;
