import React, { useEffect, useState } from 'react'

import LoadingSpinner from 'components/Base/LoadingSpinner'
import { LoadingWrap } from 'constants/style'
import Button from 'components/Base/Buttons/Button'
import { PROPOSAL_STATUS_TYPES } from 'constants/statuses'
import { useDispatch } from 'react-redux'
import { getProposalsList } from 'store/voting/proposals/action-creators'
import { slice, concat } from 'lodash'
import ProposalContent from './components/ProposalContent'
import ListCard from './components/ListCard'

const LIMIT = 9

function ProposalsList ({ proposals, proposalStatus, proposalsKind, loading, errorMessage, proposalsCount }) {
  const dispatch = useDispatch()

  const [range, setRange] = useState([0, 9])
  const [index, setIndex] = useState(LIMIT)
  const [disableButton, setDisableButton] = useState(false)
  const [currentProposals, setCurrentProposals] = useState([])
  const [loadingSpinner, setLoadingSpinner] = useState(true)
  const [loadMore, setLoadMore] = useState(true)

  useEffect(() => {
    dispatch(getProposalsList(proposalsKind, proposalStatus, range))
    return () => {
      dispatch(getProposalsList(proposalsKind, PROPOSAL_STATUS_TYPES.reset))
      setRange([0, 9])
      setDisableButton(false)
      setCurrentProposals([])
      setLoadingSpinner(true)
      setLoadMore(true)
    }
  }, [dispatch])

  function handleNextProposals () {
    const newIndex = index + LIMIT
    const newList = concat(currentProposals, slice(proposals, index, newIndex))
    if (newList.length === proposalsCount) {
      setDisableButton(false)
    }
    if (proposals.length < proposalsCount) {
      setLoadMore(true)
      fetchNextProposals()
    }
    setIndex(newIndex)
    setCurrentProposals(newList)
  }

  function fetchNextProposals () {
    const newRange = [range[0] + 9, range[1] + 9]
    setRange(newRange)
    dispatch(getProposalsList(proposalsKind, proposalStatus, newRange))
  }

  function getProposals () {
    if (proposals.length && index === LIMIT) {
      setCurrentProposals(slice(proposals, 0, LIMIT))
      setLoadingSpinner(false)
      if (proposalsCount > proposals.length) {
        setDisableButton(true)
      }
    }
  }

  useEffect(() => {
    setLoadMore(false)
    getProposals()
  }, [proposals])

  return (
        <div>
            {errorMessage
              ? (
                <p>Error loading proposals</p>
                )
              : !loading && !proposals.length
                  ? (
                <p> No proposals</p>
                    )
                  : loadingSpinner
                    ? (
                <LoadingWrap>
                    <LoadingSpinner />
                </LoadingWrap>
                      )
                    : (
                        currentProposals.map((proposal) => (
                    <ListCard
                        key={proposal.id + proposal?.contract}
                        id={proposal.id + proposal?.contract}
                        proposal={proposal}
                        oneProposalPage={false}
                        proposalsKind={proposalsKind}
                        content={<ProposalContent proposal={proposal} />}
                    />
                        ))
                      )}
            {disableButton
              ? (
                <LoadingWrap>
                    <Button
                        width="100px"
                        disabled={loadMore}
                        title={loadMore ? <LoadingSpinner /> : 'Show more'}
                        handleButton={handleNextProposals}
                    />
                </LoadingWrap>
                )
              : null}
        </div>
  )
}

export default ProposalsList
