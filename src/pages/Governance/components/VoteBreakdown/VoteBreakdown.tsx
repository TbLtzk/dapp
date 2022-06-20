
import PieChartTwoItem from './PieChartTwoItem';
import { ColorTitle, VoteBreakdownContainer } from './styles';

import { CONTRACTS_NAMES } from 'constants/contracts';
import { Circle } from 'constants/style';

function VoteBreakdown ({ voteBreakdown }: { voteBreakdown: any }) {
  const contractsWithoutVeto =
    voteBreakdown.contract === CONTRACTS_NAMES.validatorsSlashingVoting ||
    voteBreakdown.contract === CONTRACTS_NAMES.emergencyUpdateVoting;
  const approveContract =
    voteBreakdown.contract === CONTRACTS_NAMES.addressVoting ||
    voteBreakdown.contract === CONTRACTS_NAMES.upgradeVoting;

  return (
    <VoteBreakdownContainer>
      <h3>Vote Breakdown</h3>
      <div className="vote-breakdown__items">
        <div>
          <h4>Vote Results</h4>
          <div className="list-card__chart-block">
            {voteBreakdown?.numberProposalVotes
              ? (
                <PieChartTwoItem
                  data={[
                    {
                      name: 'For',
                      value: voteBreakdown.numberProposalVotes.votesFor
                    },
                    {
                      name: 'Against',
                      value: voteBreakdown.numberProposalVotes.votesAgainst
                    }
                  ]}
                />
              )
              : (
                <PieChartTwoItem data={null} />
              )}
            <div>
              <ColorTitle color="white">
                <Circle color="circle-white" />
                For:{' '}
                {voteBreakdown?.numberProposalVotes ? voteBreakdown.numberProposalVotes.votesFor : 0}
              </ColorTitle>
              <ColorTitle color="dark">
                <Circle color="circle-dark" />
                {approveContract ? 'No vote:' : 'Against: '}{' '}
                {voteBreakdown?.numberProposalVotes
                  ? voteBreakdown.numberProposalVotes.votesAgainst
                  : 0}
              </ColorTitle>
            </div>
          </div>
          <h5>Current Majority: {voteBreakdown.currentMajority} %</h5>
          <h5>Majority Requirement: {voteBreakdown.requiredMajority} %</h5>

          {approveContract
            ? null
            : (
              <>
                <div className="list-card__line" />
                <h3>Vote Requirements</h3>
                <div className="vote-breakdown__requirement-quorum">
                  <div>
                    <h5>Quorum Requirement</h5>
                    <p>{voteBreakdown.requiredQuorum} %</p>
                    <h5>Current Quorum</h5>
                    <p>{voteBreakdown.currentQuorum} %</p>
                  </div>
                </div>
              </>
            )}
        </div>

        {contractsWithoutVeto || approveContract
          ? null
          : (
            <div>
              <h4>Constitution Check</h4>
              <div className="list-card__chart-block">
                <PieChartTwoItem
                  data={[
                    {
                      name: 'For',
                      value: Number(voteBreakdown.vetoesNumber)
                    },
                    {
                      name: 'Against',
                      value: Number(voteBreakdown.noVote)
                    }
                  ]}
                />
                <div>
                  <ColorTitle color="white">
                    <Circle color="circle-white" />
                    Objection: {voteBreakdown.vetoesNumber}
                  </ColorTitle>
                  <ColorTitle color="dark">
                    <Circle color="circle-dark" />
                    No Vote: {voteBreakdown.noVote}
                  </ColorTitle>
                </div>
              </div>

              <h5>
                Objection Requirement: {'> '}
                {voteBreakdown.vetoThreshold} %
              </h5>

              <div className="vote-breakdown__requirement-objection">
                <h5>Current Root Node Objection</h5>
                <p>{voteBreakdown.vetoesPercentage} %</p>
              </div>
            </div>
          )}
      </div>
    </VoteBreakdownContainer>
  );
}

export default VoteBreakdown;
