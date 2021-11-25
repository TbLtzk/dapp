import React, { useEffect, useState } from 'react'

import LoadingSpinner from 'components/Base/LoadingSpinner'
import { LoadingWrap } from 'constants/style'
import ProposalsList from './ProposalsList'
import { useDispatch } from 'react-redux'
import { getProposalsList } from 'store/voting/proposals/action-creators'
import { useInView } from 'react-intersection-observer'

function ProposalsLazyLoading ({ proposals, proposalsKind, loading, errorMessage, activeTab, proposalsCount, proposalStatus }) {
  const dispatch = useDispatch()
  const [state, setState] = useState([0, 3])

  const { ref, entry } = useInView({ trackVisibility: true, delay: 100 })

  function getNextProposals (isVisible) {
    if (proposalsCount !== proposals.length) {
      if (!loading && isVisible && proposalStatus !== 'active' && !!proposalStatus) {
        const range = [state[0] + 3, state[1] + 3]
        setState(range)
        dispatch(getProposalsList(proposalsKind, proposalStatus, range))
      }
    }
  }

  useEffect(() => {
    getNextProposals(entry?.isVisible)
  }, [entry?.isVisible])

  return (
        <div>
            {errorMessage
              ? (
                <p>Error loading proposals</p>
                )
              : !loading && !proposals.length
                  ? (
                <p>No proposals</p>
                    )
                  : (
                <div>
                    <ProposalsList
                        ref={ref}
                        proposalStatus={proposalStatus}
                        currentProposals={proposals}
                        proposalsKind={proposalsKind}
                        activeTab={activeTab}
                    />
                    {loading
                      ? (
                        <LoadingWrap>
                            <LoadingSpinner />
                        </LoadingWrap>
                        )
                      : null}
                </div>
                    )}
        </div>
  )
}

export default ProposalsLazyLoading
