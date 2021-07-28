import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import {
  setVoteProposalObj,
  setStepVoteCounter,
  setDisabledCreatedProposalBtn,
  executeProposal
} from 'store/actions/action-creaters/voting/proposals'

import LoadingSpinner from 'components/Base/LoadingSpinner'
import ModalVote from '../CreateQProposalBtn/ModalVote'

import ListCard from 'components/Custom/PageLists/ListCard'
import CardDropdownItems from './components/CardDropdownItems'
import CardCollapsedContent from './components/CardCollapsedContent'
import { LoadingWrap } from 'constants/style'
import { convertToMonthDayYear, remainDate } from 'func/convertDate'

function ProposalsList (props) {
  const {
    proposals,
    proposalsKind,
    loading,
    errorMessage,
    activeTab
  } = props
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
    dispatch(executeProposal({
      idProposal: id,
      contract
    }))
  }

  return (
    <div>
      {loading ? <LoadingWrap><LoadingSpinner/></LoadingWrap>
        : errorMessage ? <p>No proposals</p>
          : proposals?.length === 0
            ? <p>No proposals</p>
            : !proposals ? <p>No proposals</p> : proposals.map((proposal, i) => {
              // TODO: don`t show proposal if veto time === 0
              // return remainDate(proposal.vetoEndTime) !== 0 ?
              return (
                <ListCard
                  key={proposal.id + proposal?.contract}
                  id={proposal.id + proposal?.contract}
                  headerLeftSide={
                    <>
                      <h1>{proposal.title}</h1>
                      {proposal.status ? <div className="list-card__status">{proposal.status}</div> : null}
                    </>
                  }
                  dropdownItems={
                    <CardDropdownItems
                      status={proposal.status}
                      handleVote={() => {
                        onProposalVote(proposal.id, proposal.contract, proposal.vetoEndTime)
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
                      votingTime={proposal.votingEndTime}
                      objData={proposal.status}
                      vetoTime={proposal.vetoEndTime}
                    />
                  }
                  content={
                    <div className="list-card__three-colm">
                      <div>
                        <h5>Proposal ID</h5>
                        <p>{proposal.id}</p>
                      </div>
                      <div>
                        <h5>Voting until</h5>
                        <p>{convertToMonthDayYear(proposal.vetoEndTime)}</p>
                      </div>
                      <div>
                        <h5>Remaining Time for Voting</h5>
                        <p>{remainDate(proposal.votingEndTime)}</p>
                      </div>
                    </div>
                  }
                  />
              )
            })
      }
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
    </div>
  )
}

export default ProposalsList
