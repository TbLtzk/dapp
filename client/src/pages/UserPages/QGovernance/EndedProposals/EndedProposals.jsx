import React, { useEffect, useMemo } from 'react';

import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEndedProposals } from 'store/actions/action-creaters/voting/proposals';
import { qEndedProposals, qLoadingEndedProposals, qErrorEnded } from 'store/selectors/voting/q-proposals';
import {
  rootNodeEndedProposals,
  rootNodeLoadingEndedProposals,
  rootNodeErrorEnded
} from 'store/selectors/voting/root-node-proposals';
import {
  expertEndedProposals,
  expertLoadingEndedProposals,
  expertErrorEnded
} from 'store/selectors/voting/expert-proposals';
import {
  slashingEndedProposals,
  slashingLoadingEndedProposals,
  slashingErrorEnded
} from 'store/selectors/voting/slashing-proposals';
import { onChangePageType } from 'store/actions/action-creaters/voting/proposals';
import { pageType } from 'store/selectors/voting/proposals';

import ProposalsList from 'pages/UserPages/QGovernance/components/ProposalsList';
import PageWrap from 'components/Base/PageWrap';

import { tabSwitcher } from 'contracts/handler/VotingHandler';
import { checkCurrentTab } from 'pages/UserPages/QGovernance/components/constants';

import { Row, Col } from 'react-bootstrap';
import { Title } from 'components/Custom/PageLists/styles';

function EndedProposals() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { activeTab } = location.state;
  const page = useSelector(pageType);

  const qEnded = useSelector(qEndedProposals);
  const qLoading = useSelector(qLoadingEndedProposals);
  const qError = useSelector(qErrorEnded);

  const rootNodeEnded = useSelector(rootNodeEndedProposals);
  const rootNodeLoading = useSelector(rootNodeLoadingEndedProposals);
  const rootNodeError = useSelector(rootNodeErrorEnded);

  const expertEnded = useSelector(expertEndedProposals);
  const expertLoading = useSelector(expertLoadingEndedProposals);
  const expertError = useSelector(expertErrorEnded);

  const slashingEnded = useSelector(slashingEndedProposals);
  const slashingLoading = useSelector(slashingLoadingEndedProposals);
  const slashingError = useSelector(slashingErrorEnded);

  useEffect(() => {
    if (page === 'active' || !page) {
      dispatch(onChangePageType('ended'));
    }
  }, []);

  useEffect(() => {
    dispatch(getEndedProposals(activeTab));
  }, [dispatch, activeTab]);

  const proposalKind = useMemo(() => {
    return checkCurrentTab(activeTab);
  }, [activeTab, location?.state?.numberOfProposals]);

  const endedArr = useMemo(() => {
    return tabSwitcher(activeTab, qEnded, rootNodeEnded, expertEnded, slashingEnded);
  }, [activeTab, qEnded, rootNodeEnded, expertEnded, slashingEnded]);

  const loading = useMemo(() => {
    return tabSwitcher(activeTab, qLoading, rootNodeLoading, expertLoading, slashingLoading);
  }, [activeTab, qLoading, rootNodeLoading, expertLoading, slashingLoading]);

  const error = useMemo(() => {
    return tabSwitcher(activeTab, qError, rootNodeError, expertError, slashingError);
  }, [activeTab, qError, rootNodeError, expertError, slashingError]);

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

