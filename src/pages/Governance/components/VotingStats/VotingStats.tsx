import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from 'ui/Button';

import VoterStatus from 'components/Custom/VoterStatus';

import useVoteDelegation from 'hooks/useVoteDelegation';

import { StatsContainer } from './styles';

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

  const [lockedDate, ...lockedRest] = lockedUntil
    ? fromSolDateFormattingT1(lockedUntil).split(' ')
    : [];

  const statsList = [
    {
      title: 'Total Voting Weight',
      value: ownWeight ? `${fN(fromWei(ownWeight))} Q` : '0 Q'
    },
    {
      title: 'Voting Locking End',
      value: lockedDate
        ? (
          <>
            <span>{lockedDate}</span>
            <span className="text-md">{lockedRest.join(' ')}</span>
          </>
        )
        : '–'
    },
    {
      title: 'Voting Status',
      value: <span className="text-lg"><VoterStatus /></span>
    },
    {
      title: 'Vote Delegation',
      value: <span className="text-lg">{votingInfo}</span>
    }
  ];

  return (
    <StatsContainer className="block">
      <div className="stats-head">
        <h2 className="text-h2">Voting Stats</h2>
        <Link to="/q-vault">
          <Button
            block
            alwaysEnabled
            look="secondary"
          >
            Manage vault
          </Button>
        </Link>
      </div>

      <div className="stats-list">
        {statsList.map(({ title, value }) => (
          <div key={title} className="stats-item">
            <p className="stats-item-lbl text-md">{title}</p>
            <p
              className="stats-item-val text-xl"
              title={String(value)}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </StatsContainer>
  );
}

export default VotingStats;
