import React, { useEffect, useMemo, useState } from 'react';

import { getEndedProposals } from 'store/actions/action-creaters/voting/proposals';
import { endedProposals, loadingEndedProposals, errorEnded } from 'store/selectors/voting/proposals';
import { useDispatch, useSelector } from 'react-redux';
import { drizzleReactHooks } from '@drizzle/react-plugin';

import { useLocation } from 'react-router-dom';

import ProposalsList from 'pages/UserPages/QGovernance/components/ProposalsList';
import { checkCurrentTab } from 'pages/UserPages/QGovernance/components/constants';

import { Row, Col } from 'react-bootstrap';
import { Title } from 'components/Custom/PageLists/styles';
import PageWrap from '../../../../components/Base/PageWrap';

const { useDrizzle } = drizzleReactHooks;

function EndedProposals() {
  const location = useLocation();
  const { drizzle } = useDrizzle();
  const dispatch = useDispatch();

  const endedArr = useSelector(endedProposals);
  const loading = useSelector(loadingEndedProposals);
  const error = useSelector(errorEnded);

  useEffect(() => {
    dispatch(getEndedProposals(drizzle, location?.state?.activeTab));
  }, [dispatch]);

  const proposalKind = useMemo(() => {
    return checkCurrentTab(location?.state?.activeTab);
  }, [location?.state?.activeTab, location?.state?.numberOfProposals]);

  return (
    <PageWrap>
      <Row>
        <Col xs={8}>
          <Title>{`Ended ${location?.state?.activeTab?.replace(/-/g, ' ')} (${endedArr?.length}`})</Title>
          <ProposalsList
            activeTab={location?.state?.activeTab}
            proposals={endedArr}
            loading={loading}
            errorMessage={error}
            proposalsKind={proposalKind}
          />
        </Col>
      </Row>
    </PageWrap>
  );
}

export default EndedProposals;

