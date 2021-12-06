import React, { useEffect, useState } from 'react'

import { LoadingWrap } from 'constants/style'
import Button from 'components/Base/Buttons/Button'
import { slice, concat } from 'lodash'
import ListCard from './components/ListCard'
import { fillArray } from 'func/useful'
import SkeletonLoading from 'components/Base/SkeletonLoading'
import { useDispatch, useSelector } from 'react-redux'
import { executedProposalSelector } from 'store/voting/proposals/selectors'
import { setExecutedProposal } from 'store/voting/proposals/action-creators'

const LOAD_TYPES = { load: 'load', empty: 'empty', error: 'error', loaded: 'loaded' }

function ProposalsList ({ proposals, proposalsKind, proposalsCount }) {
  const executedProposal = useSelector(executedProposalSelector)
  const dispatch = useDispatch()
  const [state, setState] = useState(LOAD_TYPES.load)

  const LENGTH = proposals.length
  const LIMIT = 9

  const [showMore, setShowMore] = useState(false)
  const [list, setList] = useState([])
  const [index, setIndex] = useState(LIMIT)

  const handleNextProposals = () => {
    const newIndex = index + LIMIT
    const newShowMore = newIndex < LENGTH - 1
    const newList = concat(list, slice(proposals, index, newIndex))
    setIndex(newIndex)
    setList(newList)
    setShowMore(newShowMore)
  }

  useEffect(() => {
    checkProposals()
  }, [proposals, proposalsCount])

  useEffect(() => {
    if (executedProposal) {
      const newList = list.filter(
        (proposal) =>
          !(proposal.id === executedProposal.idProposal && proposal.contract === executedProposal.contract)
      )
      setList(newList)
      if (!newList.length) {
        setState(LOAD_TYPES.empty)
      }
      dispatch(setExecutedProposal(null))
    }
  }, [executedProposal, dispatch, list])

  function checkProposals () {
    if (proposals.length) {
      setList(slice(proposals, 0, LIMIT))
      setState(LOAD_TYPES.loaded)
      if (proposals.length > LIMIT) {
        setShowMore(true)
      }
    } else if (!proposalsCount) {
      setState(LOAD_TYPES.empty)
    }
  }

  switch (state) {
    case LOAD_TYPES.error:
      return <p>Error loaded proposals</p>
    case LOAD_TYPES.empty:
      return <p>No proposals</p>
    case LOAD_TYPES.loaded:
      return (
                <div>
                    {list.map((proposal) => (
                        <ListCard
                            key={proposal.id + proposal?.contract}
                            id={proposal.id + proposal?.contract}
                            proposal={proposal}
                            oneProposalPage={false}
                            proposalsKind={proposalsKind}
                        />
                    ))}
                    {showMore
                      ? (
                        <LoadingWrap>
                            <Button margin='0 0 15px 0' width="100px" title="Show more" handleButton={handleNextProposals} />
                        </LoadingWrap>
                        )
                      : null}
                </div>
      )
    default:
      return (
                <div>
                    {fillArray(9).map((id) => (
                        <SkeletonLoading key={id} />
                    ))}
                </div>
      )
  }
}

export default ProposalsList
