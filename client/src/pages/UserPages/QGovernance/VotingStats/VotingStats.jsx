import React from 'react';

import CustomBlock from 'components/Base/CustomBlock';

import Button from 'components/Base/Buttons/Button';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { VotingStatsContainer, Title } from './styles';
import { roundBalance } from '../../../../func/balance';
import { votingLockingEnd, votingWeight } from '../../../../store/selectors/q-piggy-bank';
import { fromSolDateFormattingT1 } from '../../../../func/date';

function VotingStats() {
  const history = useHistory();
  const userVotingWeight = roundBalance(useSelector(votingWeight));
  const userLockingEnd = fromSolDateFormattingT1(useSelector(votingLockingEnd));

  return (
    <VotingStatsContainer>
      <Title>Voting Stats</Title>
      <CustomBlock>
        <div className="stats_container">
          <span>PiggyBank Voting Weight (Q)</span>
          <span>
            {userVotingWeight}
            Q
          </span>
        </div>
        <div className="stats_container">
          <span>Voting Locking End</span>
          <span>{userLockingEnd}</span>
        </div>
        <div className="stats_container">
          <span>Voting Status</span>
          <span>Root Node</span>
        </div>
        <Button
          title="Manage PiggyBank"
          width="100%"
          handleButton={() => history.push('piggy-bank')}
        />
      </CustomBlock>
    </VotingStatsContainer>
  );
}

export default VotingStats;
