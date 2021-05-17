import React, { useEffect } from 'react';
import PageWrap from 'components/Base/PageWrap';
import InfoBlock from './components/InfoBlock';
import VotingStats from './components/VotingStats';
import { useDispatch, useSelector } from 'react-redux';
import { getEndedProposals, getProposalsList, onChangePageType } from 'store/actions/action-creaters/voting/proposals';
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

function Governance() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProposalsList('q-root-node-panel'));
    dispatch(getEndedProposals('q-root-node-panel'));

    dispatch(getProposalsList('q-proposals'));
    dispatch(getProposalsList('q-expert-proposals'));
    dispatch(getProposalsList('slashing-proposals'));

    dispatch(getEndedProposals('q-proposals'));
    dispatch(getEndedProposals('q-expert-proposals'));
    dispatch(getEndedProposals('slashing-proposals'));
  }, []);

  const qProposals = useSelector(qProposalsArr);
  const qLoading = useSelector(qLoadingProposals);
  const qError = useSelector(qErrorM);
  const qEnded = useSelector(qEndedProposals);
  const qLoadingEnded = useSelector(qLoadingEndedProposals);
  const qErrorEndedM = useSelector(qErrorEnded);

  const rootNodeProposals = useSelector(rootNodeProposalsArr);
  const rootNodeLoading = useSelector(rootNodeLoadingProposals);
  const rootNodeError = useSelector(rootNodeErrorM);
  const rootNodeEnded = useSelector(rootNodeEndedProposals);
  const rootNodeLoadingEnded = useSelector(rootNodeLoadingEndedProposals);
  const rootNodeErrorEndedM = useSelector(rootNodeErrorEnded);

  const expertProposals = useSelector(expertProposalsArr);
  const expertLoading = useSelector(loadingExpertProposals);
  const expertError = useSelector(expertErrorM);
  const expertEnded = useSelector(expertEndedProposals);
  const expertLoadingEnded = useSelector(expertLoadingEndedProposals);
  const expertErrorEndedM = useSelector(expertErrorEnded);

  const slashingProposals = useSelector(slashingProposalsArr);
  const slashingLoading = useSelector(slashingLoadingProposals);
  const slashingError = useSelector(slashingErrorM);
  const slashingEnded = useSelector(slashingEndedProposals);
  const slashingLoadingEnded = useSelector(slashingLoadingEndedProposals);
  const slashingErrorEndedM = useSelector(slashingErrorEnded);

  return (
    <PageWrap
      wrapContentClasses={'wrap-content__three-colm'}
      headerTitle={'Governance'}
    >
      <div>
        <InfoBlock
          header="Q Proposals"
          activeProposalsNumber={qProposals.length}
          onlyVotableNumber="-"
          endedProposalsNumber={qEnded.length}
          detailsLink="q-proposals"
          isLoading={qLoading || qLoadingEnded}
          isError={qError || qErrorEndedM}
        />

        <InfoBlock
          header="Expert Proposals"
          activeProposalsNumber={expertProposals.length}
          onlyVotableNumber="-"
          endedProposalsNumber={expertEnded.length}
          detailsLink="expert-proposals"
          isLoading={expertLoading || expertLoadingEnded}
          isError={expertError || expertErrorEndedM}
        />
      </div>
      <div>
        <InfoBlock
          header="Root Node Panel"
          activeProposalsNumber={rootNodeProposals.length}
          onlyVotableNumber="-"
          endedProposalsNumber={rootNodeEnded.length}
          detailsLink="root-node-panel"
          isLoading={rootNodeLoading || rootNodeLoadingEnded}
          isError={rootNodeError || rootNodeErrorEndedM}
        />
        <InfoBlock
          header="Slashing Proposals"
          activeProposalsNumber={slashingProposals.length}
          onlyVotableNumber="-"
          endedProposalsNumber={slashingEnded.length}
          detailsLink="slashing-proposals"
          isLoading={slashingLoading || slashingLoadingEnded}
          isError={slashingError || slashingErrorEndedM}
        />
      </div>
      <VotingStats/>
    </PageWrap>
  );
}

export default Governance;
