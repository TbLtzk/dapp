import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Accordion } from 'react-bootstrap'
import { ListCardWrp, ListCardHeader, ListCardBody } from './styles'
import CustomHeaderButtons from '../CustomHeaderButtons'
import { theme } from 'store/theme/selectors'
import CardCollapsedContent from '../CardCollapsedContent'
import ProposalContent from '../ProposalContent'
import { getProposal } from 'contracts/helpers/voting-helpers/base-voting-helper'
import ContentLoader from 'react-content-loader'

function ListCard ({ proposal, id, proposalsKind, oneProposalPage }) {
  const currentTheme = useSelector(theme)
  const [open, setOpen] = useState(false)
  const [collapsedContentOpen, setCollapsedContentOpen] = useState(false)

  const [proposalInfo, setProposalInfo] = useState(null)

  useEffect(() => {
    getProposal(proposal.contract, proposal.id, 'header').then((result) => {
      setProposalInfo(result)
    })
    return () => {
      setProposalInfo(null)
    }
  }, [])

  return !proposalInfo
    ? (
        <ProposalLoader />
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
                    {oneProposalPage || (!proposalInfo
                      ? null
                      : (
                        <ProposalContent proposal={proposalInfo} />
                        ))}
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

export const ProposalLoader = () => (
    <div style={{ backgroundColor: '#07172B', borderRadius: '6px', display: 'block', marginBottom: '16px' }}>
        <ContentLoader speed={2} width="100%" height={170} backgroundColor="#0B2545" foregroundColor="#6D7C8F">
            <rect x="20" y="20" rx="3" ry="3" width="60%" height="20" />
            <rect x="75%" y="20" rx="3" ry="3" width="15%" height="20" />

            <rect x="20" y="65" rx="3" ry="3" width="18%" height="10" />
            <rect x="35%" y="65" rx="3" ry="3" width="18%" height="10" />
            <rect x="75%" y="65" rx="3" ry="3" width="18%" height="10" />

            <rect x="20" y="88" rx="3" ry="3" width="5%" height="8" />
            <rect x="35%" y="88" rx="3" ry="3" width="22%" height="8" />
            <rect x="75%" y="88" rx="3" ry="3" width="22%" height="8" />
        </ContentLoader>
    </div>
)
