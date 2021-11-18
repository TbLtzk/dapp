import React from 'react'
import PageWrap from 'components/Base/PageWrap'
import BigTabsView from 'components/Base/Tabs/BigTabsView'
import ProposalsTab from './components/ProposalsTab'
import CreateQProposalBtn from './components/CreateQProposalBtn'
import Button from 'components/Base/Buttons/Button'

import { PROPOSALS_TYPES, PROPOSAL_STATUS_TYPES } from 'constants/statuses'
import { useDispatch, useSelector } from 'react-redux'
import {
  qActiveProposalsCountSelector,
  qActiveProposalsErrorSelector,
  qActiveProposalsSelector,
  qEndedProposalsCountSelector,
  qEndedProposalsErrorSelector,
  qEndedProposalsSelector,
  qLoadingActiveProposalsSelector,
  qLoadingEndedProposalsSelector
} from 'store/voting/q-proposals/selectors'
import {
  rootActiveProposalsCountSelector,
  rootActiveProposalsErrorSelector,
  rootActiveProposalsSelector,
  rootEndedProposalsCountSelector,
  rootEndedProposalsErrorSelector,
  rootEndedProposalsSelector,
  rootLoadingActiveProposalsSelector,
  rootLoadingEndedProposalsSelector
} from 'store/voting/root-node-proposals/selectors'
import {
  expertActiveProposalsCountSelector,
  expertActiveProposalsErrorSelector,
  expertActiveProposalsSelector,
  expertEndedProposalsCountSelector,
  expertEndedProposalsErrorSelector,
  expertEndedProposalsSelector,
  expertLoadingActiveProposalsSelector,
  expertLoadingEndedProposalsSelector
} from 'store/voting/expert-proposals/selectors'
import {
  slashingActiveProposalsCountSelector,
  slashingActiveProposalsErrorSelector,
  slashingActiveProposalsSelector,
  slashingEndedProposalsCountSelector,
  slashingEndedProposalsErrorSelector,
  slashingEndedProposalsSelector,
  slashingLoadingActiveProposalsSelector,
  slashingLoadingEndedProposalsSelector
} from 'store/voting/slashing-proposals/selectors'
import { getProposalsList } from 'store/voting/proposals/action-creators'

function Proposals ({ proposalsType }) {
  const dispatch = useDispatch()

  const {
    proposals,
    endedProposals,
    isLoading,
    isEndedLoading,
    error,
    endedError,
    activeProposalsCount,
    endedProposalsCount
  } = getProposalsSelector(proposalsType)

  const name = getPageName(proposalsType)

  function getPageName (type) {
    switch (type) {
      case PROPOSALS_TYPES.proposals:
        return 'Q Proposals'
      case PROPOSALS_TYPES.rootNodePanel:
        return 'Root Node Panel'
      case PROPOSALS_TYPES.expertProposals:
        return 'Expert Proposals'
      case PROPOSALS_TYPES.slashingProposals:
      default:
        return 'Slashing Proposals'
    }
  }

  function getProposalsSelector (type) {
    switch (type) {
      case PROPOSALS_TYPES.proposals:
        return {
          proposals: useSelector(qActiveProposalsSelector),
          endedProposals: useSelector(qEndedProposalsSelector),
          isLoading: useSelector(qLoadingActiveProposalsSelector),
          isEndedLoading: useSelector(qLoadingEndedProposalsSelector),
          error: useSelector(qActiveProposalsErrorSelector),
          endedError: useSelector(qEndedProposalsErrorSelector),
          activeProposalsCount: useSelector(qActiveProposalsCountSelector),
          endedProposalsCount: useSelector(qEndedProposalsCountSelector)
        }
      case PROPOSALS_TYPES.rootNodePanel:
        return {
          proposals: useSelector(rootActiveProposalsSelector),
          endedProposals: useSelector(rootEndedProposalsSelector),
          isLoading: useSelector(rootLoadingActiveProposalsSelector),
          isEndedLoading: useSelector(rootLoadingEndedProposalsSelector),
          error: useSelector(rootActiveProposalsErrorSelector),
          endedError: useSelector(rootEndedProposalsErrorSelector),
          activeProposalsCount: useSelector(rootActiveProposalsCountSelector),
          endedProposalsCount: useSelector(rootEndedProposalsCountSelector)
        }
      case PROPOSALS_TYPES.expertProposals:
        return {
          proposals: useSelector(expertActiveProposalsSelector),
          endedProposals: useSelector(expertEndedProposalsSelector),
          isLoading: useSelector(expertLoadingActiveProposalsSelector),
          isEndedLoading: useSelector(expertLoadingEndedProposalsSelector),
          error: useSelector(expertActiveProposalsErrorSelector),
          endedError: useSelector(expertEndedProposalsErrorSelector),
          activeProposalsCount: useSelector(expertActiveProposalsCountSelector),
          endedProposalsCount: useSelector(expertEndedProposalsCountSelector)
        }
      case PROPOSALS_TYPES.slashingProposals:
        return {
          proposals: useSelector(slashingActiveProposalsSelector),
          endedProposals: useSelector(slashingEndedProposalsSelector),
          isLoading: useSelector(slashingLoadingActiveProposalsSelector),
          isEndedLoading: useSelector(slashingLoadingEndedProposalsSelector),
          error: useSelector(slashingActiveProposalsErrorSelector),
          endedError: useSelector(slashingEndedProposalsErrorSelector),
          activeProposalsCount: useSelector(slashingActiveProposalsCountSelector),
          endedProposalsCount: useSelector(slashingEndedProposalsCountSelector)
        }
    }
  }

  function resetProposals () {
    dispatch(getProposalsList(proposalsType, PROPOSAL_STATUS_TYPES.reset))
  }

  const tabsItems = [
    {
      label: 'active-proposals',
      title: 'Active Proposals',
      content: (
                <ProposalsTab
                    isLoading={isLoading}
                    proposals={proposals}
                    proposalsType={proposalsType}
                    errorMessage={error}
                    types={PROPOSAL_STATUS_TYPES.active}
                    proposalsCount={activeProposalsCount}
                />
      )
    },
    {
      label: 'ended-proposals',
      title: 'Ended Proposals',
      content: (
                <ProposalsTab
                    isLoading={isEndedLoading}
                    proposals={endedProposals}
                    proposalsType={proposalsType}
                    errorMessage={endedError}
                    types={PROPOSAL_STATUS_TYPES.ended}
                    proposalsCount={endedProposalsCount}
                />
      )
    },
    {
      title: (
                <Button
                    title="Refresh"
                    handleButton={resetProposals}
                    type="button"
                    width="100px"
                    position="absolute"
                    right="70px"
                    top="108px"
                />
      )
    }
  ]

  return (
        <PageWrap headerTitle={name} headerExtra={<CreateQProposalBtn activeTab={proposalsType} />}>
            <BigTabsView tabsItems={tabsItems} active={tabsItems[0]?.label} />
        </PageWrap>
  )
}

export default Proposals
