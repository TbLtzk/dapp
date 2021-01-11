import React, { useEffect, useState } from 'react';

import { drizzleReactHooks } from '@drizzle/react-plugin';

import { useDispatch, useSelector } from 'react-redux';
import { getRootMembersData } from 'store/actions/action-creaters/root-contract';
import { getValidatorMembers } from 'store/actions/action-creaters/validators';
import {
  loadingMembers, errorMembers, validatorMembers
} from 'store/selectors/validators';

import { Container, Row, Col } from 'react-bootstrap';

import ContractRegistryService from 'api/contracts/ContractRegistryService';
import RootService from 'api/contracts/RootService';
import ButtonLinkArrow from 'components/Base/Buttons/ButtonLinkArrow';
import ValidatorTable from './ValidatorTable';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import CustomBlock from '../../Base/CustomBlock';

import {
  H5Headline, ContainerWrap, HeadlineWrap, TotalWrap,
  BottomText, WrapBtn
} from './styles';

const { useDrizzle } = drizzleReactHooks;

function ValidatorsPanel(props) {
  const { type, bottom } = props;
  const { drizzle } = useDrizzle();

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
            {loading ? <Col xs={12}><LoadingSpinner/></Col> :
                errorMessage ? <Col xs={12}><p>No validators</p></Col> :
                  <>
                    <Col xs={12}>
                      <HeadlineWrap>
                        <H5Headline>Validator Ranking</H5Headline>
                      </HeadlineWrap>
                    </Col>
                    <Col xs={12}>
                      <ValidatorTable/>
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

