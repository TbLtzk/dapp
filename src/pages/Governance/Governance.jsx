import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MODE } from 'components/Base/DashboardMode/DashboardMode';
import PageWrap from 'components/Base/PageWrap';
import VotingStats from 'components/Custom/VotingStats';

import InfoBlock from './components/InfoBlock';

import { mode } from 'store/dashboard-mode/selectors';
import { getContractUpdatesProposals } from 'store/voting/contract-updates/action-creators';
import {
  contractUpdatesActiveProposalsCountSelector,
  contractUpdatesEndedProposalsCountSelector,
  contractUpdatesLoadingProposalsCountSelector
} from 'store/voting/contract-updates/selectors';
import { getExpertProposals } from 'store/voting/expert-proposals/action-creators';
import {
  expertActiveProposalsCountSelector,
  expertEndedProposalsCountSelector,
  expertLoadingProposalsCountSelector
} from 'store/voting/expert-proposals/selectors';
import { getQProposals } from 'store/voting/q-proposals/action-creators';
import {
  qActiveProposalsCountSelector,
  qEndedProposalsCountSelector,
  qLoadingProposalsCountSelector
} from 'store/voting/q-proposals/selectors';
import { getRootProposals } from 'store/voting/root-node-proposals/action-creators';
import {
  rootActiveProposalsCountSelector,
  rootEndedProposalsCountSelector,
  rootLoadingProposalsCountSelector
} from 'store/voting/root-node-proposals/selectors';
import { getSlashingProposals } from 'store/voting/slashing-proposals/action-creators';
import {
  slashingActiveProposalsCountSelector,
  slashingEndedProposalsCountSelector,
  slashingLoadingProposalsCountSelector
} from 'store/voting/slashing-proposals/selectors';

function Governance () {
  const dispatch = useDispatch();
  const appMode = useSelector(mode);

  const qActiveProposalsCount = useSelector(qActiveProposalsCountSelector);
  const qEndedProposalsCount = useSelector(qEndedProposalsCountSelector);
  const qLoadingProposalsCount = useSelector(qLoadingProposalsCountSelector);

  const rootActiveProposalsCount = useSelector(rootActiveProposalsCountSelector);
  const rootEndedProposalsCount = useSelector(rootEndedProposalsCountSelector);
  const rootLoadingProposalsCount = useSelector(rootLoadingProposalsCountSelector);

  const expertActiveProposalsCount = useSelector(expertActiveProposalsCountSelector);
  const expertEndedProposalsCount = useSelector(expertEndedProposalsCountSelector);
  const expertLoadingProposalsCount = useSelector(expertLoadingProposalsCountSelector);

  const slashingActiveProposalsCount = useSelector(slashingActiveProposalsCountSelector);
  const slashingEndedProposalsCount = useSelector(slashingEndedProposalsCountSelector);
  const slashingLoadingProposalsCount = useSelector(slashingLoadingProposalsCountSelector);

  const contractUpdatesActiveProposalsCount = useSelector(contractUpdatesActiveProposalsCountSelector);
  const contractUpdatesEndedProposalsCount = useSelector(contractUpdatesEndedProposalsCountSelector);
  const contractUpdatesLoadingProposalsCount = useSelector(contractUpdatesLoadingProposalsCountSelector);

  useEffect(() => {
    if (appMode === MODE.basic) {
      dispatch(getQProposals());
      dispatch(getRootProposals());
    } else {
      dispatch(getQProposals());
      dispatch(getRootProposals());
      dispatch(getExpertProposals());
      dispatch(getSlashingProposals());
      dispatch(getContractUpdatesProposals());
    }
  }, [dispatch, appMode]);

  return (
    <PageWrap wrapContentClasses="wrap-content__colm-2" headerTitle="Governance">
      <div className="content__colm-2">
        <InfoBlock
          header="Q Proposals"
          detailsLink="/governance/q-proposals"
          activeProposalsNumber={qActiveProposalsCount}
          endedProposalsNumber={qEndedProposalsCount}
          isLoading={qLoadingProposalsCount}
        />
        <InfoBlock
          header="Root Node Panel"
          activeProposalsNumber={rootActiveProposalsCount}
          endedProposalsNumber={rootEndedProposalsCount}
          detailsLink="q-root-node-panel"
          isLoading={rootLoadingProposalsCount}
        />
        {appMode === MODE.advanced
          ? (
            <InfoBlock
              header="Expert Proposals"
              activeProposalsNumber={expertActiveProposalsCount}
              endedProposalsNumber={expertEndedProposalsCount}
              detailsLink="q-expert-proposals"
              isLoading={expertLoadingProposalsCount}
            />
          )
          : null}
        {appMode === MODE.advanced
          ? (
            <InfoBlock
              header="Slashing Proposals"
              activeProposalsNumber={slashingActiveProposalsCount}
              endedProposalsNumber={slashingEndedProposalsCount}
              detailsLink="slashing-proposals"
              isLoading={slashingLoadingProposalsCount}
            />
          )
          : null}
        {appMode === MODE.advanced
          ? (
            <InfoBlock
              header="Contract Updates"
              activeProposalsNumber={contractUpdatesActiveProposalsCount}
              endedProposalsNumber={contractUpdatesEndedProposalsCount}
              detailsLink="contract-updates"
              isLoading={contractUpdatesLoadingProposalsCount}
            />
          )
          : null}
      </div>
      <VotingStats />
    </PageWrap>
  );
}

export default Governance;
