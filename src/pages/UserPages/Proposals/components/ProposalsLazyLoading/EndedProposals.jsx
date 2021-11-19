/* eslint-disable */
import Button from 'components/Base/Buttons/Button'
import { PROPOSAL_STATUS_TYPES } from 'constants/statuses'
import { LoadingWrap } from 'constants/style'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getProposalsList } from 'store/voting/proposals/action-creators'
import ProposalsList from './ProposalsList'
import { slice, concat } from 'lodash'
import { getLatestBlockNumber } from 'func/useful'

const LIMIT = 3

function EndedProposals ({ proposals, proposalsKind, loading, errorMessage, activeTab, proposalsCount, types }) {
  const dispatch = useDispatch()

  const [list, setList] = useState([])
  const [index, setIndex] = useState(LIMIT)
  const [disableButton, setDisableButton] = useState(false)

  const [allProposals, setAllProposals] = useState([])

  const [blocks, setBlocks] = useState(null) // [500000, "latest"], [400000, 500000]

  useEffect(() => {
    getLatestBLocks()
    return () => dispatch(getProposalsList(proposalsKind, PROPOSAL_STATUS_TYPES.reset))
  }, [dispatch])

  const getLatestBLocks = async () => {
    const latestBlockNumber = await getLatestBlockNumber()
    const blocks = [latestBlockNumber - 50000, 'latest']
    setBlocks(blocks)
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

  function fetchNextProposals () {
    const newBlocks = [blocks[0] - 50000 < 0 ? 0 : blocks[0] - 50000, blocks[0]]
    setBlocks(newBlocks)
    dispatch(getProposalsList(proposalsKind, types, newBlocks))
  }

  function getProposals () {
    if (proposals.length < index && blocks[0] > 0) {
      console.log(blocks)
      console.log('here')
      fetchNextProposals()
    }
    setList(slice(proposals, 0, LIMIT))
    if (proposals.length < LIMIT) {
      setDisableButton(true)
    }
  }

  useEffect(() => {
    if (blocks) {
      getProposals()
    }
  }, [proposals, disableButton])

  // useEffect(() => {
  //     if (!!blocks) {
  //         getProposals();
  //     }
  //     setAllProposals([allProposals, ...proposals]);
  // }, [proposals]);

  return (
        <div>
            <div>
                <ProposalsList currentProposals={list} proposalsKind={proposalsKind} activeTab={activeTab} />

                {disableButton
                  ? (
                    <LoadingWrap>
                        <Button title="Show more" handleButton={getNextProposals} />
                    </LoadingWrap>
                    )
                  : null}
            </div>
        </div>
  )
}

export default EndedProposals
