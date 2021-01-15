import React, { useEffect, useMemo, useState } from 'react';

import { getEndedProposals } from 'store/actions/action-creaters/voting/proposals';
import { endedProposals, loadingEndedProposals, errorEnded } from 'store/selectors/voting/proposals';
import { useDispatch, useSelector } from 'react-redux';
import { drizzleReactHooks } from '@drizzle/react-plugin';

import { useLocation } from 'react-router-dom';

import ProposalsList from 'pages/UserPages/QGovernance/components/ProposalsList';

import { Row, Col } from 'react-bootstrap';
import { Title } from './styles';

const { useDrizzle } = drizzleReactHooks;

function OneProposalPage(props) {
  const {params} = props;
  const { drizzle } = useDrizzle();
  const dispatch = useDispatch();
  console.log('props.match.params', params);

  return (
    <Row>
      <Col xs={8}>
        one proposal
      </Col>
    </Row>
  );
}

export default OneProposalPage;

