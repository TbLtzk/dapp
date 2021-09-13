import React from 'react'
import PieChartTwoItem from './PieChartTwoItem'

import { ColorTitle } from './styles'
import { Circle } from 'constants/style'

function VoteBreakdown (props) {
  const { voteBreakdown } = props

  return (
    <div>
      <h3>Vote Breakdown</h3>
      <div className="list-card__three-colm">
        <div>
          <h4>Vote Results</h4>
          <div className="list-card__chart-block">
            {voteBreakdown?.numberProposalVotes
              ? <PieChartTwoItem
                data={
                  [
                    {
                      name: 'For',
                      value: voteBreakdown.numberProposalVotes.votesFor
                    },
                    {
                      name: 'Against',
                      value: voteBreakdown.numberProposalVotes.votesAgainst
                    }
                  ]
                }
              />
              : <PieChartTwoItem
                data={null}
              />
            }
            <div>
              <ColorTitle color="white"><Circle color="circle-white" />
                For: {voteBreakdown?.numberProposalVotes ? voteBreakdown.numberProposalVotes.votesFor : 0}
              </ColorTitle>
              <ColorTitle color="dark"><Circle color="circle-dark" />
                Against: {voteBreakdown?.numberProposalVotes ? voteBreakdown.numberProposalVotes.votesAgainst : 0}
              </ColorTitle>
            </div>

          </div>
          <h5>Majority Requirement: {voteBreakdown.requiredMajority}%</h5>
        </div>
        <div>
          <h4>Constitution Check</h4>
          <div className="list-card__chart-block">
            <PieChartTwoItem
              data={[{
                name: 'For',
                value: Number(voteBreakdown.vetoesNumber)
              },
              {
                name: 'Against',
                value: Number(voteBreakdown.noVote)
              }]}
            />
            <div>
              <ColorTitle color="white"><Circle color="circle-white" />Objection: {voteBreakdown.vetoesNumber}</ColorTitle>
              <ColorTitle color="dark"><Circle color="circle-dark" />No Vote: {voteBreakdown.noVote}</ColorTitle>
            </div>
          </div>
          <h5>Objection Requirement: {'>'}{voteBreakdown.vetoThreshold}%</h5>
        </div>
      </div>
      <h3 style={{ marginTop: '20px' }}>Vote Requirements</h3>
      <div className="list-card__three-colm">
        <div>
          <h5>Quorum</h5>
          <p>{voteBreakdown.requiredQuorum}%</p>
          <h5>Current Quorum</h5>
          <p>{voteBreakdown.currentQuorum}%</p>
        </div>
        <div>
          <h5>Current Root Node Objection</h5>
          <p>{voteBreakdown.vetoesPercentage}%</p>
        </div>
      </div>
    </div>
  )
}

export default VoteBreakdown
