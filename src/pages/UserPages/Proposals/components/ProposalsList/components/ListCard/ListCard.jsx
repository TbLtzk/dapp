import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Accordion } from 'react-bootstrap'
import { ListCardWrp, ListCardHeader, ListCardBody } from './styles'
import CustomHeaderButtons from '../CustomHeaderButtons'
import { theme } from 'store/theme/selectors'
import CardCollapsedContent from '../CardCollapsedContent'

function ListCard ({ proposal, id, content, proposalsKind, oneProposalPage }) {
  const currentTheme = useSelector(theme)
  const [open, setOpen] = useState(false)
  const [collapsedContentOpen, setCollapsedContentOpen] = useState(false)

  return (
        <ListCardWrp palette={currentTheme}>
            <Accordion defaultActiveKey="0">
                <ListCardHeader>
                    <div>
                        <h1> {proposal.title}</h1>
                        {proposal.status ? <div className="list-card__status">{proposal.status}</div> : null}
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
                            shareText={`${window.location.origin}/q-governance/proposal/${proposal.contract}/${proposal.id}`}
                        />
                    </div>
                </ListCardHeader>
                <ListCardBody>
                    {content}
                    <Accordion.Collapse eventKey={id}>
                        {collapsedContentOpen
                          ? (
                            <CardCollapsedContent
                                proposalStatus={proposal.status}
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
