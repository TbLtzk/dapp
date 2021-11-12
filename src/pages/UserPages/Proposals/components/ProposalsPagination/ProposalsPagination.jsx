import React from 'react'

import LoadingSpinner from 'components/Base/LoadingSpinner'
import { LoadingWrap } from 'constants/style'
import ProposalsList from './ProposalsList'

function ProposalsPagination ({ proposals, proposalsKind, loading, errorMessage, activeTab, proposalsCount }) {
  return (
        <div>
            {loading
              ? (
                <LoadingWrap>
                    <LoadingSpinner />
                </LoadingWrap>
                )
              : errorMessage
                ? (
                <p>Error loading proposals</p>
                  )
                : proposals?.length === 0
                  ? (
                <p>No proposals</p>
                    )
                  : !proposals
                      ? (
                <p>No proposals</p>
                        )
                      : (
                <>
                    <ProposalsList
                        currentProposals={proposals}
                        proposalsKind={proposalsKind}
                        activeTab={activeTab}
                        proposalsCount={proposalsCount}
                    />
                </>
                        )}
        </div>
  )
}

export default ProposalsPagination
