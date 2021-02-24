import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getOneProposal } from 'store/actions/action-creaters/voting/proposals';
import { qErrorM, qLoadingProposals, qProposalsArr } from 'store/selectors/voting/q-proposals';
import {
  rootNodeErrorM,
  rootNodeLoadingProposals,
  rootNodeProposalsArr
} from 'store/selectors/voting/root-node-proposals';
import {
  expertErrorM,
  expertProposalsArr,
  loadingExpertProposals
} from 'store/selectors/voting/expert-proposals';
import {
  slashingErrorM,
  slashingLoadingProposals,
  slashingProposalsArr
} from 'store/selectors/voting/slashing-proposals';
import { onChangePageType } from 'store/actions/action-creaters/voting/proposals';
import { pageType } from 'store/selectors/voting/proposals';

import ProposalsList from 'pages/UserPages/QGovernance/components/ProposalsList';
import PageWrap from 'components/Base/PageWrap';
import { checkCurrentTab, checkActiveTabByContract } from '../components/constants';
import { tabSwitcher } from 'contracts/handler/VotingHandler';

import { Row, Col } from 'react-bootstrap';
import { Title } from 'components/Custom/PageLists/styles';

function OneProposalPage(props) {
  const { match } = props;
  const dispatch = useDispatch();
  const [empty, setEmpty] = useState(false);

  const page = useSelector(pageType);

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

  useEffect(() => {
    if (page === 'ended' || !page) {
      dispatch(onChangePageType('active'));
    }
  }, []);

  useEffect(() => {
    if (match.params?.id && match.params?.contract && !isNaN((Number(match.params?.id)))) {
      setEmpty(false);
      dispatch(getOneProposal({
        id: match.params?.id,
        contract: match.params?.contract
      }));
    } else {
      setEmpty(true);
    }
  }, [dispatch, match]);

  const activeTab = useMemo(() => {
    return checkActiveTabByContract(match.params?.contract);
  }, [match]);

  const proposal = useMemo(() => {
    return tabSwitcher(activeTab, qProposals, rootNodeProposals, expertProposals, slashingProposals);
  }, [activeTab, qProposals, rootNodeProposals, expertProposals, slashingProposals]);

  const loading = useMemo(() => {
    return tabSwitcher(activeTab, qLoading, rootNodeLoading, expertLoading, slashingLoading);
  }, [activeTab, qLoading, rootNodeLoading, expertLoading, slashingLoading]);

  const error = useMemo(() => {
    return tabSwitcher(activeTab, qError, rootNodeError, expertError, slashingError);
  }, [activeTab, qError, rootNodeError, expertError, slashingError]);

  const proposalKind = useMemo(() => {
    return checkCurrentTab(activeTab);
  }, [activeTab]);

  return (
    <PageWrap>
      <Row>
        <Col xs={8}>
          <Title>{activeTab ? `${activeTab?.replace(/-/g, ' ')}` : null}</Title>
          {empty ? <p>Wrong link</p> :
            <ProposalsList
              activeTab={activeTab}
              proposals={proposal}
              loading={loading}
              errorMessage={error}
              proposalsKind={proposalKind}
            />
          }
        </Col>
      </Row>
    </PageWrap>
  );
}

export default OneProposalPage;

