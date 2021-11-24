/* eslint-disable */
import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  setVoteProposalObj,
  setStepVoteCounter,
  setDisabledCreatedProposalBtn,
  executeProposal
} from 'store/voting/proposals/action-creators'

import ModalVote from '../CreateQProposalBtn/ModalVote'

import ListCard from 'components/Custom/PageLists/ListCard'
import CardDropdownItems from './components/CardDropdownItems'
import CardCollapsedContent from './components/CardCollapsedContent'

import { convertToMonthDayYear, remainDate } from 'func/convertDate'
import { getUniqueProposals } from 'func/useful'
import Tooltip from 'components/Base/Tooltip'
import { CONTRACTS_NAMES } from 'constants/contracts'

function getVetoInfo (proposal) {
  const opacity = proposal.status === 'Pending' ? '0.4' : '1'

  switch (proposal.contract) {
    case CONTRACTS_NAMES.validatorsSlashingVoting:
    case CONTRACTS_NAMES.emergencyUpdateVoting:
      return null
    default:
      return (
                <>
                    <Tooltip
                        additionalInfo={
                            <div>
                                Remaining Time for Veto <br /> {remainDate(proposal.vetoEndTime)}
                            </div>
                        }
                    >
                        <div style={{ opacity: opacity }}>
                            <h5>Veto Ends</h5>
                            <p>{convertToMonthDayYear(proposal.vetoEndTime)}</p>
                        </div>
                    </Tooltip>
                </>
      )
  }
}

const ProposalsList = ({ proposalsKind, activeTab, currentProposals }) => {
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false)
  const [proposalId, setProposalId] = useState(null)
  const [vetoEndTime, setVetoEndTime] = useState(null)
  const [proposalContract, setProposalContract] = useState(null)

  const proposals = getUniqueProposals(currentProposals)

  const onProposalVote = (id, contract, vetoEndTime) => {
    dispatch(setDisabledCreatedProposalBtn(true))
    setProposalId(id)
    setVetoEndTime(vetoEndTime)
    setProposalContract(contract)
    setModalShow(true)
  }

  const onProposalExecute = (id, contract) => {
    dispatch(
      executeProposal({
        idProposal: id,
        contract
      })
    )
  }

  const onChooseTypeOfVoting = (status) => {
    const type = status === 'Pending' ? 'basic-vote-on-proposal' : 'constitution-check'
    dispatch(setVoteProposalObj({ first: type }))
    dispatch(setDisabledCreatedProposalBtn(false))
  }

  return (
        <div>
            {proposals.map((proposal) => {
              return (
                    <ListCard
                        key={proposal.id + proposal?.contract}
                        id={proposal.id + proposal?.contract}
                        headerLeftSide={
                            <>
                                <h1> {proposal.title}</h1>
                                {proposal.status ? <div className="list-card__status">{proposal.status}</div> : null}
                            </>
                        }
                        dropdownItems={
                            <CardDropdownItems
                                status={proposal.status}
                                handleVote={() => {
                                  onProposalVote(proposal.id, proposal.contract, proposal.vetoEndTime)
                                  onChooseTypeOfVoting(proposal.status)
                                }}
                                handleExecute={() => {
                                  onProposalExecute(proposal.id, proposal.contract)
                                }}
                                shareText={`${window.location.origin}/q-governance/proposal/${proposal.contract}/${proposal.id}`}
                            />
                        }
                        collapsedContent={
                            <CardCollapsedContent
                                proposalType={proposal?.type}
                                proposal={proposal}
                                voteBreakdown={proposal}
                                proposalsKind={proposalsKind}
                                contract={proposal.contract}
                                proposalID={proposal.id}
                                objData={proposal.status}
                                vetoTime={proposal.vetoEndTime}
                            />
                        }
                        content={
                            <div className="list-card__three-colm">
                                <div>
                                    <h5>Proposal Id</h5>
                                    <p>{proposal.id}</p>
                                </div>
                                <Tooltip
                                    additionalInfo={
                                        <div>
                                            Remaining Time for Voting <br /> {remainDate(proposal.votingEndTime)}
                                        </div>
                                    }
                                >
                                    <>
                                        <h5>Voting Ends</h5>
                                        <p>{convertToMonthDayYear(proposal.votingEndTime)}</p>
                                    </>
                                </Tooltip>
                                {getVetoInfo(proposal)}
                            </div>
                        }
                    />
              )
            })}
            {modalShow
              ? (
                <ModalVote
                    proposalContract={proposalContract}
                    proposalId={proposalId}
                    vetoEndTime={vetoEndTime}
                    activeTab={activeTab}
                    modalShow={modalShow}
                    onHide={() => {
                      setModalShow(false)
                      dispatch(setVoteProposalObj({}))
                      dispatch(setStepVoteCounter(1))
                      dispatch(setDisabledCreatedProposalBtn(true))
                    }}
                />
                )
              : null}
        </div>
  )
}

export default ProposalsList
