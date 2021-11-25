import React from 'react'
import { useSelector } from 'react-redux'
import Button from 'components/Base/Buttons/Button'
import { isUserRootNode } from 'store/root-node/selectors'
// import { isUserEPDRMembership, isUserEPQFIMembership } from 'store/membership/selectors'
import Tooltip from 'components/Base/Tooltip'
import { CONTRACTS_NAMES } from 'constants/contracts'

const TOOLTIP_INFO = {
  votePeriod: 'Vote period already gone',
  vetoPeriod: 'Veto period has not started',
  isNotRootNode: 'User is not Root Node'
}

function VotingItems ({ status, handleVote, handleExecute, contract, proposalStatus }) {
  const isRootNode = useSelector(isUserRootNode)

//   const isEPDRMembership = useSelector(isUserEPDRMembership)
//   const isEPQFIMembership = useSelector(isUserEPQFIMembership)
  
  const contractsWithoutVeto =
        contract === CONTRACTS_NAMES.validatorsSlashingVoting || contract === CONTRACTS_NAMES.emergencyUpdateVoting

  function checkVoteUser () {
    if (contractsWithoutVeto) {
      return { disabled: !isRootNode, info: isRootNode ? TOOLTIP_INFO.votePeriod : TOOLTIP_INFO.isNotRootNode }
    } else if (status === 'Accepted') {
      return { disabled: true, info: TOOLTIP_INFO.votePeriod }
    }
    return { disabled: false, info: '' }
  }

  function checkVetoUser () {
    if (status === 'Pending') {
      return { disabled: false, info: isRootNode ? TOOLTIP_INFO.vetoPeriod : TOOLTIP_INFO.isNotRootNode }
    } else if (status === 'Accepted') {
      return { disabled: !isRootNode, info: isRootNode ? TOOLTIP_INFO.vetoPeriod : TOOLTIP_INFO.isNotRootNode }
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
