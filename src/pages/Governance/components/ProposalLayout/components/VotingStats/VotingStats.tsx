import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'components/Base/Button';
import VoterStatus from 'components/Custom/VoterStatus';

import useVoteDelegation from 'hooks/useVoteDelegation';

import { StatsWrapper } from './styles';

import { getDelegationInfo } from 'store/q-vault/action-creators';
import { votingAgent } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';
import { getBaseVotingWeightInfo } from 'store/voting/proposals/actions';
import { baseVotingWeightInfoSelector } from 'store/voting/proposals/selectors';

import { fromWei } from 'func/balance';
import { fromSolDateFormattingT1 } from 'func/date';
import { fN } from 'func/useful';

function VotingStats () {
  const dispatch = useDispatch();

  const address = useSelector(userAddressMetamask);
  const agent = useSelector(votingAgent);

  const { ownWeight, lockedUntil } = useSelector(baseVotingWeightInfoSelector);
  const { votingInfo } = useVoteDelegation(ownWeight, agent);

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
        <h1 className="stats-title">Voting Stats</h1>
        <div className="stats-actions">
          <Link to="/q-vault">
            <Button
              block
              alwaysEnabled
              look="white"
            >
              Manage vault
            </Button>
          </Link>
        </div>
      </div>

      <div className="stats-list">
        {statsList.map((elem) => (
          <div key={elem.title} className="stats-item">
            <h5>{elem.title}</h5>
            <p title={String(elem.value)}>{elem.value}</p>
          </div>
        ))}
      </div>
    </StatsWrapper>
  );
}

export default VotingStats;
