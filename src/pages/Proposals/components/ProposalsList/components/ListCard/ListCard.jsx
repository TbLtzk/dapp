import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Accordion } from 'react-bootstrap'
import { ListCardWrp, ListCardHeader, ListCardBody } from './styles'
import CustomCardButtons from 'components/Custom/CustomCardButtons'
import { theme } from 'store/theme/selectors'
import CardCollapsedContent from '../CardCollapsedContent'
import ProposalContent from '../ProposalContent'
import { getProposal } from 'contracts/helpers/voting-helpers/base-voting-helper'
import SkeletonProposalsLoading from 'components/Base/SkeletonLoading'
import { transactionLoadingSelector } from 'store/transaction-handler/selectors'
import { formVoteObject } from 'store/voting/proposals/selectors'
import { createShareText } from 'func/useful'

import { setVoteProposalObj } from 'store/voting/proposals/action-creators'

function ListCard ({ proposal, id, proposalsKind, onePage }) {
  const dispatch = useDispatch()

  const currentTheme = useSelector(theme)
  const transactionLoading = useSelector(transactionLoadingSelector)

  const [open, setOpen] = useState(false)

  const [proposalInfo, setProposalInfo] = useState(null)
  const obj = useSelector(formVoteObject)

  useEffect(() => {
    if (!transactionLoading && proposal.contract === obj.contract && proposal.id === obj.id) {
      handleGetProposal()
      dispatch(setVoteProposalObj({}))
    }
  }, [transactionLoading])

  useEffect(() => {
    handleGetProposal()

    return () => {
      setOpen(false)
      setProposalInfo(null)
    }
  }, [])

  async function handleGetProposal () {
    const result = await getProposal(proposal.contract, proposal.id)
    setProposalInfo(result)
  }

  return !proposalInfo
    ? (
        <SkeletonProposalsLoading />
      )
    : (
        <ListCardWrp palette={currentTheme}>
            <Accordion defaultActiveKey="0">
                <ListCardHeader>
                    <div className="card__title">
                        <h1> {proposalInfo?.title}</h1>
                        {proposalInfo?.status ? <div className="list-card__status">{proposalInfo?.status}</div> : null}
                    </div>
                    <div className="card__buttons">
                        <CustomCardButtons
                            open={open}
                            onePage={onePage}
                            setOpen={() => setOpen(!open)}
                            eventKey={id}
                            shareText={createShareText('proposal', proposalInfo.contract, proposalInfo.id)}
                        />
                    </div>
                </ListCardHeader>
                <ListCardBody>
                    <ProposalContent proposal={proposalInfo} />
                    <Accordion.Collapse eventKey={id}>
                        <CardCollapsedContent
                            proposalInfo={proposalInfo}
                            proposalsKind={proposalsKind}
                            contract={proposal.contract}
                            proposalId={proposal.id}
                        />
                    </Accordion.Collapse>
                </ListCardBody>
            </Accordion>
        </ListCardWrp>
      )
}

export default ListCard
