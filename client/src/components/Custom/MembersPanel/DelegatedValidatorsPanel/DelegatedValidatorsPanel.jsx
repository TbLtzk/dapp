import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getDelegationsList } from 'store/actions/action-creaters/q-piggy-bank';
import {
  loadingDelegationList, errorDelegationList, delegationList,
} from 'store/selectors/q-piggy-bank';
import { userAddressMetamask } from 'store/selectors/user-inf';

import MemberTable from 'components/Custom/MembersPanel/MemberTable';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import CustomBlock from 'components/Base/CustomBlock';

import { tableHeader } from './constants';

import { Container, Row, Col } from 'react-bootstrap';
import {
  H5Headline, ContainerWrap, HeadlineWrap,
  LoadingWrap
} from '../styles';

function DelegatedValidatorsPanel() {
  const userAddress = useSelector(userAddressMetamask);
  const loading = useSelector(loadingDelegationList);
  const errorMessage = useSelector(errorDelegationList);
  const delegations = useSelector(delegationList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDelegationsList(userAddress));
  }, [dispatch]);

  return (
    <CustomBlock>
      <ContainerWrap>
        <Container fluid>
          <Row>
            {loading ? <LoadingWrap xs={12}><LoadingSpinner/></LoadingWrap> :
              errorMessage || delegations?.length === 0 ? <Col xs={12}><p>No delegations</p></Col> :
                <>
                  <Col xs={12}>
                    <HeadlineWrap>
                      <H5Headline>Your current delegations</H5Headline>
                    </HeadlineWrap>
                  </Col>
                  <Col xs={12}>
                    <MemberTable
                      type="delegated-validators"
                      arrayData={delegations}
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

