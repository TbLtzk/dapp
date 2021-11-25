import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import {
  setVoteProposalObj,
  setStepVoteCounter,
  setDisabledCreatedProposalBtn,
  executeProposal
} from 'store/voting/proposals/action-creators'

import ModalVote from '../CreateQProposalBtn/ModalVote'

import ListCard from 'components/Custom/PageLists/ListCard'
import CardCollapsedContent from './components/CardCollapsedContent'

import { convertToMonthDayYear, remainDate } from 'func/convertDate'
import { getUniqueProposals } from 'func/useful'
import Tooltip from 'components/Base/Tooltip'
import { CONTRACTS_NAMES } from 'constants/contracts'

function ProposalContent ({ proposal }) {
  const opacity = proposal.status === 'Pending' ? '0.4' : '1'

  const vetoInfo =
        proposal.contract === CONTRACTS_NAMES.validatorsSlashingVoting ||
        proposal.contract === CONTRACTS_NAMES.emergencyUpdateVoting
          ? null
          : (
            <>
                <Tooltip
                    disabled={false}
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

  return (
        <div className="list-card__three-colm">
            <div>
                <h5>Proposal Id</h5>
                <p>{proposal.id}</p>
            </div>
            <Tooltip
                disabled={false}
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
            {vetoInfo}
        </div>
  )
}

const ProposalsList = React.forwardRef(({ proposalsKind, activeTab, currentProposals, proposalStatus }, ref) => {
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
                                <h1 ref={ref}>{proposal.title}</h1>
                                {proposal.status ? <div className="list-card__status">{proposal.status}</div> : null}
                            </>
                        }
                        customHeaderButtons={true}
                        shareText={`${window.location.origin}/q-governance/proposal/${proposal.contract}/${proposal.id}`}
                        collapsedContent={
                            <CardCollapsedContent
                                proposalType={proposal?.type}
                                proposal={proposal}
                                voteBreakdown={proposal}
                                proposalsKind={proposalsKind}
                                contract={proposal.contract}
                                proposalID={proposal.id}
                                status={proposal.status}
                                vetoTime={proposal.vetoEndTime}
                                proposalStatus={proposalStatus}
                                handleVote={() => {
                                  onProposalVote(proposal.id, proposal.contract, proposal.vetoEndTime)
                                  onChooseTypeOfVoting(proposal.status)
                                }}
                                handleExecute={() => {
                                  onProposalExecute(proposal.id, proposal.contract)
                                }}
                            />
                        }
                        content={<ProposalContent proposalStatus={proposalStatus} proposal={proposal} />}
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
})

export default ProposalsList
