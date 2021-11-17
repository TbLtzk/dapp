import React from 'react'
import PageWrap from 'components/Base/PageWrap'
import InfoBlock from './components/InfoBlock'
import VotingStats from 'components/Custom/VotingStats'

import { useSelector } from 'react-redux'
import {
  qActiveProposalsCountSelector,
  qEndedProposalsCountSelector,
  qLoadingProposalsCountSelector
} from 'store/voting/q-proposals/selectors'
import {
  rootActiveProposalsCountSelector,
  rootEndedProposalsCountSelector,
  rootLoadingProposalsCountSelector
} from 'store/voting/root-node-proposals/selectors'
import {
  expertActiveProposalsCountSelector,
  expertEndedProposalsCountSelector,
  expertLoadingProposalsCountSelector
} from 'store/voting/expert-proposals/selectors'
import {
  slashingActiveProposalsCountSelector,
  slashingEndedProposalsCountSelector,
  slashingLoadingProposalsCountSelector
} from 'store/voting/slashing-proposals/selectors'

import { mode } from 'store/dashboard-mode/selectors'
import { MODE } from 'components/Base/DashboardMode/DashboarModeButton'

function Governance () {
  const appMode = useSelector(mode)

  const qActiveProposalsCount = useSelector(qActiveProposalsCountSelector)
  const qEndedProposalsCount = useSelector(qEndedProposalsCountSelector)
  const qLoadingProposalsCount = useSelector(qLoadingProposalsCountSelector)

  const rootActiveProposalsCount = useSelector(rootActiveProposalsCountSelector)
  const rootEndedProposalsCount = useSelector(rootEndedProposalsCountSelector)
  const rootLoadingProposalsCount = useSelector(rootLoadingProposalsCountSelector)

  const expertActiveProposalsCount = useSelector(expertActiveProposalsCountSelector)
  const expertEndedProposalsCount = useSelector(expertEndedProposalsCountSelector)
  const expertLoadingProposalsCount = useSelector(expertLoadingProposalsCountSelector)

  const slashingActiveProposalsCount = useSelector(slashingActiveProposalsCountSelector)
  const slashingEndedProposalsCount = useSelector(slashingEndedProposalsCountSelector)
  const slashingLoadingProposalsCount = useSelector(slashingLoadingProposalsCountSelector)

  return (
        <PageWrap wrapContentClasses="wrap-content__three-colm" headerTitle="Governance">
            <div>
                <InfoBlock
                    header="Q Proposals"
                    detailsLink="q-proposals"
                    activeProposalsNumber={qActiveProposalsCount}
                    endedProposalsNumber={qEndedProposalsCount}
                    isLoading={qLoadingProposalsCount}
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
            </div>
            <div>
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
                        header="Slashing Proposals"
                        activeProposalsNumber={slashingActiveProposalsCount}
                        endedProposalsNumber={slashingEndedProposalsCount}
                        detailsLink="slashing-proposals"
                        isLoading={slashingLoadingProposalsCount}
                    />
                    )
                  : null}
            </div>
            <VotingStats />
        </PageWrap>
  )
}

export default Governance
