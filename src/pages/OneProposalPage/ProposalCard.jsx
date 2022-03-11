import React from 'react'
import CustomCardButtons from 'components/Custom/CustomCardButtons'
import {
  ListCardBody,
  ListCardHeader,
  ListCardWrp
} from '../Proposals/components/ProposalsList/components/ListCard/styles'
import PollDetail from '../Proposals/components/ProposalsList/components/PollDetail'
import ProposalContent from '../Proposals/components/ProposalsList/components/ProposalContent'
import SlashingObjection from '../Proposals/components/ProposalsList/components/SlashingObjection'
import VoteBreakdown from '../Proposals/components/ProposalsList/components/VoteBreakdown'
import VotingItems from '../Proposals/components/ProposalsList/components/VotingItems'
import { theme } from 'store/theme/selectors'
import { useSelector } from 'react-redux'
import { PROPOSALS_TYPES, STATUSES } from 'constants/statuses'
import { createShareText } from 'func/useful'

function ProposalCard ({ proposal, proposalKind }) {
  const currentTheme = useSelector(theme)
  return (
        <ListCardWrp palette={currentTheme}>
            <ListCardHeader>
                <div className="card__title">
                    <h1> {proposal.title}</h1>
                    {proposal.status ? <div className="list-card__status">{proposal.status}</div> : null}
                </div>
                <div className="card__buttons">
                    <CustomCardButtons
                        onePage={true}
                        shareText={createShareText('proposal', proposal.contract, proposal.id)}
                    />
                </div>
            </ListCardHeader>
            <ListCardBody>
                <ProposalContent proposal={proposal} />
                <div className="list-card__line" />
                <PollDetail pollDetail={proposal} proposalsKind={proposalKind} contract={proposal.contract} />
                <div className="list-card__line" />
                <VoteBreakdown voteBreakdown={proposal} />
                <VotingItems proposal={proposal} />
                {proposalKind === PROPOSALS_TYPES.slashingProposals && proposal.status === STATUSES.executed
                  ? (
                    <>
                        <div className="list-card__line" />
                        <SlashingObjection
                            contract={proposal.contract}
                            proposalId={proposal.id}
                            objData={proposal.objEscrow}
                        />
                    </>
                    )
                  : null}
            </ListCardBody>
        </ListCardWrp>
  )
}

export default ProposalCard
