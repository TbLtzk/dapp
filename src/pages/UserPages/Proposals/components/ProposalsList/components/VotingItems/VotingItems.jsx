import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'components/Base/Buttons/Button'
import { isUserRootNode } from 'store/root-node/selectors'
import Tooltip from 'components/Base/Tooltip'
import { CONTRACTS_NAMES } from 'constants/contracts'
import { isUserEPDRMembership, isUserEPQFIMembership } from 'store/membership/selectors'
import {
  executeProposal,
  setDisabledCreatedProposalBtn,
  setStepVoteCounter,
  setVoteProposalObj
} from 'store/voting/proposals/action-creators'
import ModalVote from '../../../CreateQProposalBtn/ModalVote'

const TOOLTIP_INFO = {
  votePeriod: 'Voting period has ended.',
  vetoPeriod: 'Veto period not started or ended.',
  isNotRootNode: 'User is not root node.',
  isDeFiExpert: 'User is not member of DeFi risk expert panel.',
  isFeesExpert: 'User is not member of Q fees & incentives expert panel.'
}

function VotingItems ({ proposal }) {
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = useState(false)
  const [proposalId, setProposalId] = useState(null)
  const [vetoEndTime, setVetoEndTime] = useState(null)
  const [proposalContract, setProposalContract] = useState(null)

  const isRootNode = useSelector(isUserRootNode)
  const isEPDRMembership = useSelector(isUserEPDRMembership)
  const isEPQFIMembership = useSelector(isUserEPQFIMembership)

  const contractsWithoutVeto =
        proposal.contract === CONTRACTS_NAMES.validatorsSlashingVoting ||
        proposal.contract === CONTRACTS_NAMES.emergencyUpdateVoting
  const epdrContract =
        proposal.contract === CONTRACTS_NAMES.ePDRParametersVoting ||
        proposal.contract === CONTRACTS_NAMES.ePDRMembershipVoting
  const epqfiContract =
        proposal.contract === CONTRACTS_NAMES.ePQFIParametersVoting ||
        proposal.contract === CONTRACTS_NAMES.ePQFIMembershipVoting

  function checkVoteUser () {
    if (proposal.status === 'Accepted') {
      return { disabled: true, info: TOOLTIP_INFO.votePeriod }
    } else if (contractsWithoutVeto) {
      return { disabled: !isRootNode, info: isRootNode ? TOOLTIP_INFO.votePeriod : TOOLTIP_INFO.isNotRootNode }
    } else if (epdrContract) {
      return {
        disabled: !isEPDRMembership,
        info: isEPDRMembership ? TOOLTIP_INFO.isDeFiExpert : TOOLTIP_INFO.isDeFiExpert
      }
    } else if (epqfiContract) {
      return {
        disabled: !isEPQFIMembership,
        info: isEPQFIMembership ? TOOLTIP_INFO.isFeesExpert : TOOLTIP_INFO.isFeesExpert
      }
    } else {
      return { disabled: false, info: '' }
    }
  }

  function checkVetoUser () {
    if (proposal.status === 'Pending') {
      return { disabled: false, info: isRootNode ? TOOLTIP_INFO.vetoPeriod : TOOLTIP_INFO.isNotRootNode }
    } else if (proposal.status === 'Accepted') {
      return { disabled: isRootNode, info: isRootNode ? TOOLTIP_INFO.vetoPeriod : TOOLTIP_INFO.isNotRootNode }
    } else {
      return { disabled: false, info: '' }
    }
  }

  const isUserCanVote = checkVoteUser()
  const isUserCanVeto = checkVetoUser()

  const onProposalVote = () => {
    dispatch(setDisabledCreatedProposalBtn(true))
    setProposalId(proposal.id)
    setVetoEndTime(proposal.vetoEndTime)
    setProposalContract(proposal.contract)
    setModalShow(true)
  }

  const onProposalExecute = () => {
    dispatch(
      executeProposal({
        idProposal: proposal.id,
        contract: proposal.contract
      })
    )
  }

  const onChooseTypeOfVoting = () => {
    const type = proposal.status === 'Pending' ? 'basic-vote-on-proposal' : 'constitution-check'
    dispatch(setVoteProposalObj({ first: type, contract: proposal.contract, id: proposal.id }))
    dispatch(setDisabledCreatedProposalBtn(false))
  }

  const handleVote = () => {
    onProposalVote()
    onChooseTypeOfVoting()
  }

  const addCardLine = proposal.status === 'Passed' || proposal.status === 'Pending' || proposal.status === 'Accepted'

  return (
        <div>
            {addCardLine ? <div className="list-card__line" /> : null}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {proposal.status === 'Passed' ? <Button handleButton={onProposalExecute} title="Execute" /> : null}
                {proposal.status === 'Pending' || proposal.status === 'Accepted'
                  ? (
                    <>
                        <Tooltip disabled={!isUserCanVote.disabled} additionalInfo={isUserCanVote.info}>
                            <Button
                                icon="checkbox-marked-outline"
                                width="75px"
                                title="Vote"
                                disabled={isUserCanVote.disabled}
                                handleButton={handleVote}
                            />
                        </Tooltip>
                        <div style={{ width: '20px' }} />
                        {contractsWithoutVeto
                          ? null
                          : (
                            <Tooltip disabled={isUserCanVeto.disabled} additionalInfo={isUserCanVeto.info}>
                                <Button
                                    icon="window-close"
                                    width="75px"
                                    title="Veto"
                                    disabled={!isUserCanVeto.disabled}
                                    handleButton={handleVote}
                                />
                            </Tooltip>
                            )}
                    </>
                    )
                  : null}
            </div>
            {modalShow
              ? (
                <ModalVote
                    proposalContract={proposalContract}
                    proposalId={proposalId}
                    vetoEndTime={vetoEndTime}
                    activeTab={0}
                    modalShow={modalShow}
                    onHide={() => {
                      setModalShow(false)
                      dispatch(setStepVoteCounter(1))
                      dispatch(setDisabledCreatedProposalBtn(true))
                    }}
                />
                )
              : null}
        </div>
  )
}

export default VotingItems
