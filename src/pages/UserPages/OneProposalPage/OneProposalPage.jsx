import React, { useEffect, useMemo, useState } from 'react'

import VotingStats from 'components/Custom/VotingStats'
import { useDispatch, useSelector } from 'react-redux'
import { getOneProposal } from 'store/voting/proposals/action-creators'
import { qErrorM, qLoadingProposals, oneQProposal } from 'store/voting/q-proposals/selectors'
import { PROPOSALS_TYPES } from 'constants/statuses'
import {
  rootNodeErrorM,
  rootNodeLoadingProposals,
  oneRootNodeProposal
} from 'store/voting/root-node-proposals/selectors'
import {
  expertErrorM,
  oneExpertProposal,
  loadingExpertProposals
} from 'store/voting/expert-proposals/selectors'
import {
  slashingErrorM,
  slashingLoadingProposals,
  oneSlashingProposal
} from 'store/voting/slashing-proposals/selectors'

import ProposalsList from 'pages/UserPages/Proposals/components/ProposalsLazyLoading'
import PageWrap from 'components/Base/PageWrap'
import { tabSwitcher } from 'contracts/helpers/voting-helpers/base-voting-helper'
import { CONTRACTS_NAMES } from 'constants/contracts'

function OneProposalPage (props) {
  const { match } = props
  const dispatch = useDispatch()
  const [empty, setEmpty] = useState(false)

  const qProposals = useSelector(oneQProposal)
  const qLoading = useSelector(qLoadingProposals)
  const qError = useSelector(qErrorM)

  const rootNodeProposals = useSelector(oneRootNodeProposal)
  const rootNodeLoading = useSelector(rootNodeLoadingProposals)
  const rootNodeError = useSelector(rootNodeErrorM)

  const expertProposals = useSelector(oneExpertProposal)
  const expertLoading = useSelector(loadingExpertProposals)
  const expertError = useSelector(expertErrorM)

  const slashingProposals = useSelector(oneSlashingProposal)
  const slashingLoading = useSelector(slashingLoadingProposals)
  const slashingError = useSelector(slashingErrorM)

  useEffect(() => {
    if (match.params?.id && match.params?.contract && !isNaN((Number(match.params?.id)))) {
      setEmpty(false)
      dispatch(getOneProposal({
        id: match.params?.id,
        contract: match.params?.contract
      }))
    } else {
      setEmpty(true)
    }
  }, [dispatch, match])

  const activeTab = useMemo(() => {
    return checkActiveTabByContract(match.params?.contract)
  }, [match])

  const proposal = useMemo(() => {
    return tabSwitcher(activeTab, qProposals, rootNodeProposals, expertProposals, slashingProposals)
  }, [activeTab, qProposals, rootNodeProposals, expertProposals, slashingProposals])

  const loading = useMemo(() => {
    return tabSwitcher(activeTab, qLoading, rootNodeLoading, expertLoading, slashingLoading)
  }, [activeTab, qLoading, rootNodeLoading, expertLoading, slashingLoading])

  const error = useMemo(() => {
    return tabSwitcher(activeTab, qError, rootNodeError, expertError, slashingError)
  }, [activeTab, qError, rootNodeError, expertError, slashingError])

  function checkActiveTabByContract (contract) {
    switch (contract) {
      case CONTRACTS_NAMES.constitutionVoting:
      case CONTRACTS_NAMES.emergencyUpdateVoting:
      case CONTRACTS_NAMES.generalUpdateVoting:
        return PROPOSALS_TYPES.proposals
      case CONTRACTS_NAMES.rootsVoting:
        return PROPOSALS_TYPES.rootNodePanel
      case CONTRACTS_NAMES.ePQFIMembershipVoting:
      case CONTRACTS_NAMES.ePDRMembershipVoting:
      case CONTRACTS_NAMES.ePQFIParametersVoting:
      case CONTRACTS_NAMES.ePDRParametersVoting:
        return PROPOSALS_TYPES.expertProposals
      case CONTRACTS_NAMES.rootNodesSlashingVoting:
      case CONTRACTS_NAMES.validatorsSlashingVoting:
        return PROPOSALS_TYPES.slashingProposals
    }
  }

  return (
    <PageWrap
      wrapContentClasses="wrap-content__column-2-1"
      headerTitle={activeTab ? `${activeTab?.replace(/-/g, ' ')}` : null}
    >
      {empty
        ? <h2>Wrong Link</h2>
        : <>
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
  )
}

export default OneProposalPage
