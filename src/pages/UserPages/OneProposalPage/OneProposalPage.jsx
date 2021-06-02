import React, { useEffect, useMemo, useState } from 'react';

import VotingStats from 'components/Custom/VotingStats';
import { useDispatch, useSelector } from 'react-redux';
import { getOneProposal } from 'store/actions/action-creaters/voting/proposals';
import { qErrorM, qLoadingProposals, qProposalsArr } from 'store/selectors/voting/q-proposals';
import { PROPOSALS_TYPES } from 'constants/statuses';
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

import ProposalsList from 'pages/UserPages/Proposals/components/ProposalsList';
import PageWrap from 'components/Base/PageWrap';
import { tabSwitcher } from 'contracts/handler/VotingHandler';

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

  function checkActiveTabByContract(contract) {
    switch (contract) {
      case 'ConstitutionVoting':
      case 'EmergencyUpdateVoting':
      case 'GeneralUpdateVoting':
        return PROPOSALS_TYPES.proposals;
      case 'RootsVoting':
        return PROPOSALS_TYPES.rootNodePanel;
      case 'EPQFI_MembershipVoting':
      case 'EPDR_MembershipVoting':
      case 'EPQFI_ParametersVoting':
      case 'EPDR_ParametersVoting':
        return PROPOSALS_TYPES.expertProposals;
      case 'RootNodesSlashingVoting':
      case 'ValidatorsSlashingVoting':
        return 'PROPOSALS_TYPES.slashingProposals';
    }
  }

  return (
    <PageWrap
      wrapContentClasses="wrap-content__column-2-1"
      headerTitle={activeTab ? `${activeTab?.replace(/-/g, ' ')}` : null}
    >
      {empty ? <h2>Wrong link</h2> :
        <>
          <ProposalsList
            activeTab={activeTab}
            proposals={proposal}
            loading={loading}
            errorMessage={error}
            proposalsKind={activeTab}
          />
          <VotingStats/>
        </>
      }
    </PageWrap>
  );
}

export default OneProposalPage;

