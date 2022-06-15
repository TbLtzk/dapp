import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'components/Base/Button';
import VoterStatus from 'components/Custom/PageLists/VoterStatus';

import { StatsWrapper } from './styles';

import { getDelegationInfo } from 'store/q-vault/action-creators';
import { votingAgent } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';
import { getBaseVotingWeightInfo } from 'store/voting/proposals/action-creators';
import { baseVotingWeightInfoSelector } from 'store/voting/proposals/selectors';

import { getVoteDelegation } from 'contracts/helpers/voting-helpers/base-voting-helper';

import { fromWei } from 'func/balance';
import { fromSolDateFormattingT1 } from 'func/date';
import { fN } from 'func/useful';

function VotingStats () {
  const address = useSelector(userAddressMetamask);
  const agent = useSelector(votingAgent);

  const dispatch = useDispatch();

  const { ownWeight, lockedUntil } = useSelector(baseVotingWeightInfoSelector);

  const { votingInfo } = getVoteDelegation(agent, ownWeight, agent);

  useEffect(() => {
    dispatch(getBaseVotingWeightInfo());
    dispatch(getDelegationInfo(address));
  }, [dispatch]);

  const statsList = [
    {
      title: 'Total Voting Weight',
      value: ownWeight ? `${fN(fromWei(ownWeight))} Q` : '0 Q'
    },
    {
      title: 'Voting Locking End',
      value: lockedUntil ? fromSolDateFormattingT1(lockedUntil) : '0'
    },
    {
      title: 'Voting Status',
      value: <VoterStatus />
    },
    {
      title: 'Vote Delegation',
      value: votingInfo
    }
  ];

  return (
    <StatsWrapper>
      <div className="stats-head">
        <h1>Voting Stats</h1>
        <Link to="/q-vault">
          <Button alwaysEnabled look="white">
            Manage vault
          </Button>
        </Link>
      </div>

      <div className="stats-list">
        {statsList.map((elem) => (
          <div key={elem.title} className="stats-item">
            <h5>{elem.title}</h5>
            <p title={elem.value}>{elem.value}</p>
          </div>
        ))}
      </div>
    </StatsWrapper>
  );
}

export default VotingStats;
