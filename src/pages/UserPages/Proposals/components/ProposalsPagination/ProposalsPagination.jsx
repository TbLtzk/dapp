import React, { useEffect, useState } from 'react'

import LoadingSpinner from 'components/Base/LoadingSpinner'
import { LoadingWrap } from 'constants/style'
import ProposalsList from './ProposalsList'
import { useDispatch } from 'react-redux'
import { getProposalsList } from 'store/voting/proposals/action-creators'
import { useInView } from 'react-intersection-observer'

function ProposalsPagination ({ proposals, proposalsKind, loading, errorMessage, activeTab, proposalsCount, types }) {
  const dispatch = useDispatch()
  const [state, setState] = useState([0, 10])

  const { ref, entry } = useInView({ trackVisibility: true, delay: 100 })

  function getNextProposals (isVisible) {
    if (proposalsCount !== proposals.length && !loading && isVisible) {
      console.log('inside')
      const range = [state[0] + 10, state[1] + 10]
      setState(range)
      dispatch(getProposalsList(proposalsKind, types, range))
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
              : !proposals
                  ? (
                <p>No proposals</p>
                    )
                  : (
                <div>
                    <ProposalsList
                        ref={ref}
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

export default ProposalsPagination
