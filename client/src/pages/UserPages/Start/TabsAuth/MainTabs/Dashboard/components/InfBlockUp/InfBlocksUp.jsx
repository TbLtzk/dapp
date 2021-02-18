import React, { useEffect, useState } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import SmallBlock from './SmallBlock';

import { Col, Row } from 'react-bootstrap';
import { LoadingWrap } from 'components/Custom/MembersPanel/styles';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { loadingNumberAll, numberOfAllProposals, constitutionHash } from 'store/selectors/voting/proposals';
import { getNumberAllProposals, getConstitutionHash } from 'store/actions/action-creaters/voting/proposals';
import { latestConstitution, archiveConstitution } from 'contracts/handler/ConstitutionHandler';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

function InfBlocksUp() {
  const state = useDrizzleState(state => state);

  const dispatch = useDispatch();

  const numberAllProposals = useSelector(numberOfAllProposals);
  const loadingNumberAllProposals = useSelector(loadingNumberAll);
  const constitutionHashShow = useSelector(constitutionHash);

  useEffect(() => {
    dispatch(getNumberAllProposals());
    dispatch(getConstitutionHash());
  }, [dispatch]);

  return (
    <Row>
      <Col md={4} className="d-flex align-items-stretch">
        <SmallBlock
          title="Blockchain"
          firstSubtitle="Block Height"
          secondSubtitle="System Contract Registry:"
          firstContent={<p> {state?.currentBlock ? state?.currentBlock?.number : 0}</p>}
          secondContent={
            <p>
              {contractsToAddresses.ContractRegistry}
            </p>}
        />
      </Col>
      <Col md={4} className="d-flex align-items-stretch">
        <SmallBlock
          title="Constitution"
          firstSubtitle="Hash:"
          secondSubtitle={null}
          firstContent={
            <p>
              {constitutionHashShow}
            </p>
          }
          secondContent={
            <>
              <p><a href={latestConstitution} target="_blank">Download Latest</a></p>
              <p><a href={archiveConstitution} target="_blank">Check archive</a></p>
            </>
          }
        />
      </Col>
      <Col md={4} className="d-flex align-items-stretch">
        <SmallBlock
          title="Governance"
          firstSubtitle="Active proposals"
          secondSubtitle="Past proposals"
          firstContent={
            loadingNumberAllProposals ? <LoadingWrap xs={12}><LoadingSpinner/></LoadingWrap> :
              <p>{numberAllProposals?.active}</p>

          }
          secondContent={
            loadingNumberAllProposals ? <LoadingWrap xs={12}><LoadingSpinner/></LoadingWrap> :
              <p>{numberAllProposals?.ended}</p>
          }
        />
      </Col>
    </Row>
  );
}

export default InfBlocksUp;

