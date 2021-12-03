import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Accordion } from 'react-bootstrap'
import { ListCardWrp, ListCardHeader, ListCardBody } from './styles'
import CustomHeaderButtons from '../CustomHeaderButtons'
import { theme } from 'store/theme/selectors'
import CardCollapsedContent from '../CardCollapsedContent'
import ProposalContent from '../ProposalContent'
import { getProposal } from 'contracts/helpers/voting-helpers/base-voting-helper'
import SkeletonLoading from 'components/Base/SkeletonLoading'
import { transactionCounter } from 'store/transaction-handler/selectors'
import { formVoteObject } from 'store/voting/proposals/selectors'

function ListCard ({ proposal, id, proposalsKind, oneProposalPage }) {
  const currentTheme = useSelector(theme)
  const updateProposal = useSelector(transactionCounter)

  const [open, setOpen] = useState(false)
  const [reloadProposal, setReloadProposal] = useState(false)
  const [collapsedContentOpen, setCollapsedContentOpen] = useState(false)

  const [proposalInfo, setProposalInfo] = useState(null)
  const obj = useSelector(formVoteObject)

  useEffect(() => {
    if (!updateProposal && proposal.contract === obj.contract && proposal.id === obj.id) {
      handleGetProposal()
    }
  }, [updateProposal])

  useEffect(() => {
    handleGetProposal()
  }, [])

  async function handleGetProposal () {
    setReloadProposal(true)
    const result = await getProposal(proposal.contract, proposal.id, 'header')
    setProposalInfo(result)
    setReloadProposal(false)
  }

  return !proposalInfo
    ? (
        <SkeletonLoading />
      )
    : (
        <ListCardWrp palette={currentTheme}>
            <Accordion defaultActiveKey="0">
                <ListCardHeader>
                    <div>
                        <h1> {proposalInfo?.title}</h1>
                        {proposalInfo?.status ? <div className="list-card__status">{proposalInfo?.status}</div> : null}
                    </div>
                    <div>
                        <CustomHeaderButtons
                            open={open}
                            oneProposalPage={oneProposalPage}
                            setOpen={() => {
                              setOpen(!open)
                              setCollapsedContentOpen(true)
                            }}
                            eventKey={id}
                            shareText={`${window.location.origin}/q-governance/proposal/${proposalInfo?.contract}/${proposalInfo?.id}`}
                        />
                    </div>
                </ListCardHeader>
                <ListCardBody>
                    {oneProposalPage || (!proposalInfo ? null : <ProposalContent proposal={proposalInfo} />)}
                    <Accordion.Collapse eventKey={id}>
                        {collapsedContentOpen
                          ? (
                            <CardCollapsedContent
                                reloadProposal={reloadProposal}
                                proposalStatus={proposalInfo.status}
                                proposalsKind={proposalsKind}
                                contract={proposal.contract}
                                proposalId={proposal.id}
                            />
                            )
                          : (
                            <div />
                            )}
                    </Accordion.Collapse>
                </ListCardBody>
            </Accordion>
        </ListCardWrp>
      )
}

export default ListCard
