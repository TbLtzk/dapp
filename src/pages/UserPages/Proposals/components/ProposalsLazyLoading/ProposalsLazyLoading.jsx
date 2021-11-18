/* eslint-disable */
import React, { useEffect, useState } from 'react'

import LoadingSpinner from 'components/Base/LoadingSpinner'
import { LoadingWrap } from 'constants/style'
import ProposalsList from './ProposalsList'
import { useDispatch } from 'react-redux'
import { getProposalsList } from 'store/voting/proposals/action-creators'
import Button from 'components/Base/Buttons/Button'
import { slice, concat } from 'lodash'

const LIMIT = 10

function ProposalsLazyLoading ({ proposals, proposalsKind, loading, errorMessage, activeTab, proposalsCount, types }) {
  const dispatch = useDispatch()

  const [list, setList] = useState([])
  const [index, setIndex] = useState(LIMIT)
  const [showMore, setShowMore] = useState(true)
  const [blocker, setBlocker] = useState(true)

  const [blocks, setBlocks] = useState([500000, 'latest']) // [500000, "latest"], [400000, 500000]
  const [allProposals, setAllProposals] = useState([])
  const [proposalsRange, setProposalsRange] = useState([])

  function getNextProposals () {
    const newIndex = index + LIMIT
    const showMore = newIndex < proposals.length - 1
    const newList = concat(list, slice(proposals, index, newIndex))
    setShowMore(showMore)
    setIndex(newIndex)
    setList(newList)

    if (!showMore) {
      const newBlocks = [blocks[0] - 100000, blocks[0]]
      dispatch(getProposalsList(proposalsKind, types, newBlocks))
      setShowMore(false)
      setBlocker(false)
    }
  }

  useEffect(() => {
    dispatch(getProposalsList(proposalsKind, types, blocks))
  }, [dispatch])

  useEffect(() => {
    if (blocker) {
      setList(slice(proposals, 0, LIMIT))
    } else {
      const newIndex = index + LIMIT
      const newList = concat(list, slice(proposals, index, newIndex))
      setList(newList)
      setIndex(newIndex)
    }
  }, [proposals])

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
                    <ProposalsList currentProposals={list} proposalsKind={proposalsKind} activeTab={activeTab} />
                    {loading
                      ? (
                        <LoadingWrap>
                            <LoadingSpinner />
                        </LoadingWrap>
                        )
                      : null}
                    {proposals.length === proposalsCount || loading
                      ? null
                      : (
                        <LoadingWrap>
                            <Button title="Show more" handleButton={getNextProposals} />
                        </LoadingWrap>
                        )}
                </div>
                    )}
        </div>
  )
}

export default ProposalsLazyLoading
