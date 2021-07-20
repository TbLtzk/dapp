import React from 'react';
import Stats from 'components/Custom/PageLists/SidebarCards/Stats';
import VoterStatus from 'components/Custom/PageLists/VoterStatus';

import { fN } from 'func/useful';
import { fromSolDateFormattingT1 } from 'func/date';
import { useSelector } from 'react-redux';
import { votingLockingEnd, votingWeight } from 'store/selectors/q-vault';

function VotingStats() {
  const userVotingWeight = fN(useSelector(votingWeight));
  const userLockingEnd = fromSolDateFormattingT1(useSelector(votingLockingEnd));

  const statsData = (() => {
    return (
      [
        {
          title: 'Q Voting Weight (Q)',
          value: userVotingWeight + ' Q',
        },
        {
          title: 'Voting Locking End',
          value: userLockingEnd,
        },
        {
          title: 'Voting Status',
          value: <VoterStatus/>,
        },
      ]
    );
  });

  return (
    <Stats statsData={statsData()} type="Voting"/>
  );
}

export default VotingStats;
