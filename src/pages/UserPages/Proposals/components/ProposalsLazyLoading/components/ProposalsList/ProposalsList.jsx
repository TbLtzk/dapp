import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import {
  setVoteProposalObj,
  setStepVoteCounter,
  setDisabledCreatedProposalBtn,
  executeProposal
} from 'store/voting/proposals/action-creators'

import ModalVote from '../../../CreateQProposalBtn/ModalVote'

import ListCard from '../ListCard'
import CardCollapsedContent from '../CardCollapsedContent'
import ProposalContent from '../ProposalContent'

const ProposalsList = ({ proposalsKind, activeTab, currentProposals, proposalStatus }) => {
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false)
  const [proposalId, setProposalId] = useState(null)
  const [vetoEndTime, setVetoEndTime] = useState(null)
  const [proposalContract, setProposalContract] = useState(null)

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
            {currentProposals.map((proposal) => (
                <ListCard
                    key={proposal.id + proposal?.contract}
                    id={proposal.id + proposal?.contract}
                    proposal={proposal}
                    content={<ProposalContent proposal={proposal} />}
                    collapsedContent={
                        <CardCollapsedContent
                        proposalStatus={proposal.status}
                        proposalsKind={proposalsKind}
                            contract={proposal.contract}
                            proposalId={proposal.id}
                            handleVote={() => {
                              onProposalVote(proposal.id, proposal.contract, proposal.vetoEndTime)
                              onChooseTypeOfVoting(proposal.status)
                            }}
                            handleExecute={() => onProposalExecute(proposal.id, proposal.contract)}
                        />
                    }
                />
            ))}
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
