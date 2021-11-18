import React, { useEffect } from 'react'
import PageWrap from 'components/Base/PageWrap'
import BigTabsView from 'components/Base/Tabs/BigTabsView'
import ProposalsTab from './components/ProposalsTab'
import CreateQProposalBtn from './components/CreateQProposalBtn'
import Button from 'components/Base/Buttons/Button'

import { PROPOSALS_TYPES, PROPOSAL_STATUS_TYPES } from 'constants/statuses'
import { useDispatch, useSelector } from 'react-redux'
import {
  qActiveProposalsCountSelector,
  qEndedProposals,
  qEndedProposalsCountSelector,
  qErrorEnded,
  qErrorM,
  qLoadingEndedProposals,
  qLoadingProposals,
  qProposalsArr
} from 'store/voting/q-proposals/selectors'
import {
  rootActiveProposalsCountSelector,
  rootEndedProposalsCountSelector,
  rootNodeEndedProposals,
  rootNodeErrorEnded,
  rootNodeErrorM,
  rootNodeLoadingEndedProposals,
  rootNodeLoadingProposals,
  rootNodeProposalsArr
} from 'store/voting/root-node-proposals/selectors'
import {
  expertActiveProposalsCountSelector,
  expertEndedProposals,
  expertEndedProposalsCountSelector,
  expertErrorEnded,
  expertErrorM,
  expertLoadingEndedProposals,
  expertProposalsArr,
  loadingExpertProposals
} from 'store/voting/expert-proposals/selectors'
import {
  slashingActiveProposalsCountSelector,
  slashingEndedProposals,
  slashingEndedProposalsCountSelector,
  slashingErrorEnded,
  slashingErrorM,
  slashingLoadingEndedProposals,
  slashingLoadingProposals,
  slashingProposalsArr
} from 'store/voting/slashing-proposals/selectors'
import { getProposalsList } from 'store/voting/proposals/action-creators'
import { getLockedAssets } from 'store/q-vault/action-creators'
import { userAddressMetamask } from 'store/user-inf/selectors'
import { transactionCounter } from 'store/transaction-handler/selectors'

function Proposals ({ proposalsType }) {
  const dispatch = useDispatch()
  const address = useSelector(userAddressMetamask)
  const transaction = useSelector(transactionCounter)
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
          proposals: useSelector(qProposalsArr),
          endedProposals: useSelector(qEndedProposals),
          isLoading: useSelector(qLoadingProposals),
          isEndedLoading: useSelector(qLoadingEndedProposals),
          error: useSelector(qErrorM),
          endedError: useSelector(qErrorEnded),
          activeProposalsCount: useSelector(qActiveProposalsCountSelector),
          endedProposalsCount: useSelector(qEndedProposalsCountSelector)
        }
      case PROPOSALS_TYPES.rootNodePanel:
        return {
          proposals: useSelector(rootNodeProposalsArr),
          endedProposals: useSelector(rootNodeEndedProposals),
          isLoading: useSelector(rootNodeLoadingProposals),
          isEndedLoading: useSelector(rootNodeLoadingEndedProposals),
          error: useSelector(rootNodeErrorM),
          endedError: useSelector(rootNodeErrorEnded),
          activeProposalsCount: useSelector(rootActiveProposalsCountSelector),
          endedProposalsCount: useSelector(rootEndedProposalsCountSelector)
        }
      case PROPOSALS_TYPES.expertProposals:
        return {
          proposals: useSelector(expertProposalsArr),
          endedProposals: useSelector(expertEndedProposals),
          isLoading: useSelector(loadingExpertProposals),
          isEndedLoading: useSelector(expertLoadingEndedProposals),
          error: useSelector(expertErrorM),
          endedError: useSelector(expertErrorEnded),
          activeProposalsCount: useSelector(expertActiveProposalsCountSelector),
          endedProposalsCount: useSelector(expertEndedProposalsCountSelector)
        }
      case PROPOSALS_TYPES.slashingProposals:
        return {
          proposals: useSelector(slashingProposalsArr),
          endedProposals: useSelector(slashingEndedProposals),
          isLoading: useSelector(slashingLoadingProposals),
          isEndedLoading: useSelector(slashingLoadingEndedProposals),
          error: useSelector(slashingErrorM),
          endedError: useSelector(slashingErrorEnded),
          activeProposalsCount: useSelector(slashingActiveProposalsCountSelector),
          endedProposalsCount: useSelector(slashingEndedProposalsCountSelector)
        }
    }
  }

  function uploadProposals () {
    dispatch(getProposalsList(proposalsType, PROPOSAL_STATUS_TYPES.active))
  }

  function uploadEndedProposals () {
    dispatch(getProposalsList(proposalsType, PROPOSAL_STATUS_TYPES.ended))
  }

  useEffect(() => {
    if (!transaction) {
      dispatch(getLockedAssets(address))
    }
  }, [transaction])

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
                    handleButton={() => {
                      uploadProposals()
                      uploadEndedProposals()
                    }}
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
