import React from 'react'
import { useSelector } from 'react-redux'
import Button from 'components/Base/Buttons/Button'
import { isUserRootNode } from 'store/root-node/selectors'
import Tooltip from 'components/Base/Tooltip'
import { CONTRACTS_NAMES } from 'constants/contracts'
import { isUserEPDRMembership, isUserEPQFIMembership } from 'store/membership/selectors'

const TOOLTIP_INFO = {
  votePeriod: 'Voting period has ended.',
  vetoPeriod: 'Veto period not started or ended.',
  isNotRootNode: 'User is not root node.',
  isDeFiExpert: 'User is not member of DeFi risk expert panel.',
  isFeesExpert: 'User is not member of Q fees & incentives expert panel.'
}

function VotingItems ({ status, handleVote, handleExecute, contract, proposalStatus }) {
  const isRootNode = useSelector(isUserRootNode)
  const isEPDRMembership = useSelector(isUserEPDRMembership) // DeFi risk expert EPDRParametersVoting  EPDRMembershipVoting
  const isEPQFIMembership = useSelector(isUserEPQFIMembership) // Fees & Incentive expert EPQFIParametersVoting EPQFIMembershipVoting

  const contractsWithoutVeto =
        contract === CONTRACTS_NAMES.validatorsSlashingVoting || contract === CONTRACTS_NAMES.emergencyUpdateVoting
  const epdrContract =
        contract === CONTRACTS_NAMES.ePDRParametersVoting || contract === CONTRACTS_NAMES.ePDRMembershipVoting
  const epqfiContract =
        contract === CONTRACTS_NAMES.ePQFIParametersVoting || contract === CONTRACTS_NAMES.ePQFIMembershipVoting

  function checkVoteUser () {
    if (status === 'Accepted') {
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
    if (status === 'Pending') {
      return { disabled: false, info: isRootNode ? TOOLTIP_INFO.vetoPeriod : TOOLTIP_INFO.isNotRootNode }
    } else if (status === 'Accepted') {
      return { disabled: isRootNode, info: isRootNode ? TOOLTIP_INFO.vetoPeriod : TOOLTIP_INFO.isNotRootNode }
    }
  }

  const isUserCanVote = checkVoteUser()
  const isUserCanVeto = checkVetoUser()

  return (
        <>
            {proposalStatus === 'ended' ? null : <div className="list-card__line" />}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {status === 'Passed' ? <Button handleButton={handleExecute} title="Execute" /> : null}
                {status === 'Pending' || status === 'Accepted'
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
                        {contractsWithoutVeto
                          ? null
                          : (
                            <Tooltip disabled={isUserCanVeto.disabled} additionalInfo={isUserCanVeto.info}>
                                <Button
                                    icon="window-close"
                                    width="75px"
                                    margin="0 0 0 20px"
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
        </>
  )
}

export default VotingItems
