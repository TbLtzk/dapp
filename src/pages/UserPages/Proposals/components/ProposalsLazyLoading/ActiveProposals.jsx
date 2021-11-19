import { getLatestBlockNumber } from 'func/useful'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from 'components/Base/Buttons/Button'
import { LoadingWrap } from 'constants/style'
import ProposalsList from './ProposalsList'
import { getProposalsList } from 'store/voting/proposals/action-creators'
import { PROPOSAL_STATUS_TYPES } from 'constants/statuses'
import { slice, concat } from 'lodash'

const LIMIT = 3

function ActiveProposals ({ proposals, proposalsKind, activeTab, types }) {
  const dispatch = useDispatch()

  const [list, setList] = useState([])
  const [index, setIndex] = useState(LIMIT)

  const [disableButton, setDisableButton] = useState(false)

  useEffect(() => {
    getLatestBLocks()
    return () => dispatch(getProposalsList(proposalsKind, PROPOSAL_STATUS_TYPES.reset))
  }, [dispatch])

  const getLatestBLocks = async () => {
    const latestBlockNumber = await getLatestBlockNumber()
    const blocks = [latestBlockNumber - 150000, 'latest']
    dispatch(getProposalsList(proposalsKind, types, blocks))
  }

  function getNextProposals () {
    const newIndex = index + LIMIT
    const showMore = newIndex < proposals.length - 1
    const newList = concat(list, slice(proposals, index, newIndex))
    setIndex(newIndex)
    setList(newList)
    if (!showMore) {
      setDisableButton(false)
    }
  }

  useEffect(() => {
    setList(slice(proposals, 0, LIMIT))
    if (proposals.length > 0) {
      setDisableButton(true)
    }
    if (proposals.length < LIMIT) {
      setDisableButton(false)
    }
  }, [proposals])

  return (
        <>
            <ProposalsList currentProposals={list} proposalsKind={proposalsKind} activeTab={activeTab} />
            {disableButton
              ? (
                <LoadingWrap>
                    <Button title="Show more" handleButton={getNextProposals} />
                </LoadingWrap>
                )
              : null}
        </>
  )
}

export default ActiveProposals
