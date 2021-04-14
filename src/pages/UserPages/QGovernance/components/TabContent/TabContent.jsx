import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProposalsList } from 'store/actions/action-creaters/voting/proposals';
import {
  qProposalsArr,
  qErrorM,
  qLoadingProposals,
} from 'store/selectors/voting/q-proposals';
import {
  rootNodeProposalsArr,
  rootNodeErrorM,
  rootNodeLoadingProposals,
} from 'store/selectors/voting/root-node-proposals';
import {
  expertProposalsArr,
  expertErrorM,
  loadingExpertProposals,
} from 'store/selectors/voting/expert-proposals';
import {
  slashingProposalsArr,
  slashingErrorM,
  slashingLoadingProposals,
} from 'store/selectors/voting/slashing-proposals';

import { Col } from 'react-bootstrap';

import QTypeProposalsTabs from 'pages/UserPages/QGovernance/components/QTypeProposalsTabs';
import ProposalsList from 'pages/UserPages/QGovernance/components/ProposalsList';

import { tabSwitcher } from 'contracts/handler/VotingHandler';
import { checkCurrentTab } from '../constants';

function TabContent(props) {
  const { activeTab } = props;
  const dispatch = useDispatch();

  const proposalKind = useMemo(() => {
    return checkCurrentTab(activeTab);
  }, [activeTab]);

  useEffect(() => {
    dispatch(getProposalsList(activeTab));
  }, [activeTab]);

  const qProposals = useSelector(qProposalsArr);
  const qLoading = useSelector(qLoadingProposals);
  const qError = useSelector(qErrorM);

  const rootNodeProposals = useSelector(rootNodeProposalsArr);
  const rootNodeLoading = useSelector(rootNodeLoadingProposals);
  const rootNodeError = useSelector(rootNodeErrorM);

  const expertProposals = useSelector(expertProposalsArr);
  const expertLoading = useSelector(loadingExpertProposals);
  const expertError = useSelector(expertErrorM);

  const slashingProposals = useSelector(slashingProposalsArr);
  const slashingLoading = useSelector(slashingLoadingProposals);
  const slashingError = useSelector(slashingErrorM);

  const proposals = useMemo(() => {
    return tabSwitcher(activeTab, qProposals, rootNodeProposals, expertProposals, slashingProposals);
  }, [activeTab, qProposals, rootNodeProposals, expertProposals, slashingProposals]);

  const loading = useMemo(() => {
    return tabSwitcher(activeTab, qLoading, rootNodeLoading, expertLoading, slashingLoading);
  }, [activeTab, qLoading, rootNodeLoading, expertLoading, slashingLoading]);

  const errorMessage = useMemo(() => {
    return tabSwitcher(activeTab, qError, rootNodeError, expertError, slashingError);
  }, [activeTab, qError, rootNodeError, expertError, slashingError]);

  return (
    <Col xs={12}>
      <QTypeProposalsTabs
        activeDescr={proposals?.length + ' Proposals'}
        activeContent={
          <ProposalsList
            activeTab={activeTab}
            proposals={proposals}
            loading={loading}
            errorMessage={errorMessage}
            proposalsKind={proposalKind}
          />
        }
        votableDesc="0 Proposals"
        votableContent={<p>Only votable</p>}
      />
    </Col>

  );
}

export default TabContent;

