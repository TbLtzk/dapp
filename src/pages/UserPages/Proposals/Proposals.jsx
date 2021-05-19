import React, { useEffect } from 'react';
import PageWrap from 'components/Base/PageWrap';
import BigTabsView from 'components/Base/Tabs/BigTabsView';
import ProposalsTab from './components/ProposalsTab';
import CreateQProposalBtn from './components/CreateQProposalBtn';

import { PROPOSALS_TYPES } from 'constants/statuses';
import { useDispatch, useSelector } from 'react-redux';
import {
  qEndedProposals, qErrorEnded,
  qErrorM, qLoadingEndedProposals,
  qLoadingProposals,
  qProposalsArr
} from 'store/selectors/voting/q-proposals';
import {
  rootNodeEndedProposals, rootNodeErrorEnded,
  rootNodeErrorM, rootNodeLoadingEndedProposals,
  rootNodeLoadingProposals,
  rootNodeProposalsArr
} from 'store/selectors/voting/root-node-proposals';
import {
  expertEndedProposals, expertErrorEnded,
  expertErrorM, expertLoadingEndedProposals,
  expertProposalsArr,
  loadingExpertProposals
} from 'store/selectors/voting/expert-proposals';
import {
  slashingEndedProposals, slashingErrorEnded,
  slashingErrorM, slashingLoadingEndedProposals,
  slashingLoadingProposals,
  slashingProposalsArr
} from 'store/selectors/voting/slashing-proposals';
import {
  getEndedProposals,
  getProposalsList
} from 'store/actions/action-creaters/voting/proposals';

function Proposals(props) {
  const {
    proposalsType
  } = props;
  const dispatch = useDispatch();

  const {
    proposals,
    endedProposals,
    isLoading,
    isEndedLoading,
    error,
    endedError
  } = getProposalsSelector(proposalsType);

  const name = getPageName(proposalsType);

  function getPageName(type) {
    switch (type) {
      case PROPOSALS_TYPES.proposals:
        return 'Q Proposals';
      case PROPOSALS_TYPES.rootNodePanel:
        return 'Q Root Node Panel';
      case PROPOSALS_TYPES.expertProposals:
        return 'Q Expert Proposals';
      case PROPOSALS_TYPES.slashingProposals:
      default:
        return 'Slashing Proposals';
    }
  }

  function getProposalsSelector(type) {
    switch (type) {
      case PROPOSALS_TYPES.proposals:
        return {
          proposals: useSelector(qProposalsArr),
          endedProposals: useSelector(qEndedProposals),
          isLoading: useSelector(qLoadingProposals),
          isEndedLoading: useSelector(qLoadingEndedProposals),
          error: useSelector(qErrorM),
          endedError: useSelector(qErrorEnded),
        };
      case PROPOSALS_TYPES.rootNodePanel:
        return {
          proposals: useSelector(rootNodeProposalsArr),
          endedProposals: useSelector(rootNodeEndedProposals),
          isLoading: useSelector(rootNodeLoadingProposals),
          isEndedLoading: useSelector(rootNodeLoadingEndedProposals),
          error: useSelector(rootNodeErrorM),
          endedError: useSelector(rootNodeErrorEnded),
        };
      case PROPOSALS_TYPES.expertProposals:
        return {
          proposals: useSelector(expertProposalsArr),
          endedProposals: useSelector(expertEndedProposals),
          isLoading: useSelector(loadingExpertProposals),
          isEndedLoading: useSelector(expertLoadingEndedProposals),
          error: useSelector(expertErrorM),
          endedError: useSelector(expertErrorEnded),
        };
      case PROPOSALS_TYPES.slashingProposals:
        return {
          proposals: useSelector(slashingProposalsArr),
          endedProposals: useSelector(slashingEndedProposals),
          isLoading: useSelector(slashingLoadingProposals),
          isEndedLoading: useSelector(slashingLoadingEndedProposals),
          error: useSelector(slashingErrorM),
          endedError: useSelector(slashingErrorEnded),
        };
    }
  }

  useEffect(() => {
    dispatch(getProposalsList(proposalsType));
    dispatch(getEndedProposals(proposalsType));
  }, []);

  const tabsItems = [
    {
      label: 'active-proposals',
      title: 'Active Proposals',
      content: <ProposalsTab
        isLoading={isLoading}
        proposals={proposals}
        proposalsType={proposalsType}
        errorMessage={error}
      />,
    },
    {
      label: 'ended-proposals',
      title: 'Ended Proposals',
      content: <ProposalsTab
        isLoading={isEndedLoading}
        proposals={endedProposals}
        proposalsType={proposalsType}
        errorMessage={endedError}
      />,
    },
  ];

  return (
    <PageWrap
      headerTitle={name}
      headerExtra={<CreateQProposalBtn activeTab={proposalsType}/>}
    >

      <BigTabsView
        tabsItems={tabsItems}
        active={tabsItems[0]?.label}
      />
    </PageWrap>
  );
};

export default Proposals;
