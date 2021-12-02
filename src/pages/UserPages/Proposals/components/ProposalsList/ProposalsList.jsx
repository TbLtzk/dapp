import React, { useEffect, useState } from 'react'

import { LoadingWrap } from 'constants/style'
import Button from 'components/Base/Buttons/Button'
import { slice, concat } from 'lodash'
import ListCard from './components/ListCard'
import { fillArray } from 'func/useful'
import { ProposalLoader } from './components/ListCard/ListCard'

const LOAD_TYPES = { load: 'load', empty: 'empty', error: 'error', loaded: 'loaded' }

function ProposalsList ({ proposals, proposalsKind, proposalsCount }) {
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

  console.log(proposalsCount)

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
                            <Button width="100px" title="Show more" handleButton={handleNextProposals} />
                        </LoadingWrap>
                        )
                      : null}
                </div>
      )
    default:
      return (
                <div>
                    {fillArray(9).map((id) => (
                        <ProposalLoader key={id} />
                    ))}
                </div>
      )
  }
}

export default ProposalsList
