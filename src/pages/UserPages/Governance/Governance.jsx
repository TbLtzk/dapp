import React, { useEffect } from 'react'
import PageWrap from 'components/Base/PageWrap'
import InfoBlock from './components/InfoBlock'
import VotingStats from 'components/Custom/VotingStats'
import { PROPOSALS_TYPES } from 'constants/statuses'
import { useDispatch, useSelector } from 'react-redux'
import { getEndedProposals, getProposalsList } from 'store/actions/action-creaters/voting/proposals'
import {
  qEndedProposals, qErrorEnded,
  qErrorM, qLoadingEndedProposals,
  qLoadingProposals,
  qProposalsArr
} from 'store/selectors/voting/q-proposals'
import {
  rootNodeEndedProposals, rootNodeErrorEnded,
  rootNodeErrorM, rootNodeLoadingEndedProposals,
  rootNodeLoadingProposals,
  rootNodeProposalsArr
} from 'store/selectors/voting/root-node-proposals'
import {
  expertEndedProposals, expertErrorEnded,
  expertErrorM, expertLoadingEndedProposals,
  expertProposalsArr,
  loadingExpertProposals
} from 'store/selectors/voting/expert-proposals'
import {
  slashingEndedProposals, slashingErrorEnded,
  slashingErrorM, slashingLoadingEndedProposals,
  slashingLoadingProposals,
  slashingProposalsArr
} from 'store/selectors/voting/slashing-proposals'
import { getLockedAssets } from 'store/actions/action-creaters/q-vault'
import { userAddressMetamask } from 'store/selectors/user-inf'

import { mode } from 'store/selectors/dashboardMode'
import { MODE } from 'components/Base/DashboardMode/DashboarModeButton'

function Governance () {
  const dispatch = useDispatch()
  const address = useSelector(userAddressMetamask)
  const appMode = useSelector(mode)

  useEffect(() => {
    for (const item in PROPOSALS_TYPES) {
      dispatch(getProposalsList(PROPOSALS_TYPES[item]))
      dispatch(getEndedProposals(PROPOSALS_TYPES[item]))
      dispatch(getLockedAssets(address))
    }
  }, [])

  const qProposals = useSelector(qProposalsArr)
  const qLoading = useSelector(qLoadingProposals)
  const qError = useSelector(qErrorM)
  const qEnded = useSelector(qEndedProposals)
  const qLoadingEnded = useSelector(qLoadingEndedProposals)
  const qErrorEndedM = useSelector(qErrorEnded)

  const rootNodeProposals = useSelector(rootNodeProposalsArr)
  const rootNodeLoading = useSelector(rootNodeLoadingProposals)
  const rootNodeError = useSelector(rootNodeErrorM)
  const rootNodeEnded = useSelector(rootNodeEndedProposals)
  const rootNodeLoadingEnded = useSelector(rootNodeLoadingEndedProposals)
  const rootNodeErrorEndedM = useSelector(rootNodeErrorEnded)

  const expertProposals = useSelector(expertProposalsArr)
  const expertLoading = useSelector(loadingExpertProposals)
  const expertError = useSelector(expertErrorM)
  const expertEnded = useSelector(expertEndedProposals)
  const expertLoadingEnded = useSelector(expertLoadingEndedProposals)
  const expertErrorEndedM = useSelector(expertErrorEnded)

  const slashingProposals = useSelector(slashingProposalsArr)
  const slashingLoading = useSelector(slashingLoadingProposals)
  const slashingError = useSelector(slashingErrorM)
  const slashingEnded = useSelector(slashingEndedProposals)
  const slashingLoadingEnded = useSelector(slashingLoadingEndedProposals)
  const slashingErrorEndedM = useSelector(slashingErrorEnded)

  return (
    <PageWrap
      wrapContentClasses={'wrap-content__three-colm'}
      headerTitle={'Governance'}
    >
      <div>
        <InfoBlock
          header="Q Proposals"
          activeProposalsNumber={qProposals.length}
          endedProposalsNumber={qEnded.length}
          detailsLink="q-proposals"
          isLoading={qLoading || qLoadingEnded}
          isError={qError || qErrorEndedM}
        />
        {appMode === MODE.advanced
          ? <InfoBlock
          header="Expert Proposals"
          activeProposalsNumber={expertProposals.length}
          endedProposalsNumber={expertEnded.length}
          detailsLink="q-expert-proposals"
          isLoading={expertLoading || expertLoadingEnded}
          isError={expertError || expertErrorEndedM}
        />
          : null}
      </div>
      <div>
        <InfoBlock
          header="Root Node Panel"
          activeProposalsNumber={rootNodeProposals.length}
          endedProposalsNumber={rootNodeEnded.length}
          detailsLink="q-root-node-panel"
          isLoading={rootNodeLoading || rootNodeLoadingEnded}
          isError={rootNodeError || rootNodeErrorEndedM}
        />
        {appMode === MODE.advanced
          ? <InfoBlock
          header="Slashing Proposals"
          activeProposalsNumber={slashingProposals.length}
          endedProposalsNumber={slashingEnded.length}
          detailsLink="slashing-proposals"
          isLoading={slashingLoading || slashingLoadingEnded}
          isError={slashingError || slashingErrorEndedM}
        />
          : null}
      </div>
      <VotingStats />
    </PageWrap>
  )
}

export default Governance
