import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fromWei } from 'web3-utils';

import Button from 'ui/Button';

import useVoteDelegation from 'hooks/useVoteDelegation';
import useVoterStatus from 'hooks/useVoterStatus';

import { StatsContainer } from './styles';

import { getDelegationInfo } from 'store/q-vault/action-creators';
import { votingAgent } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';
import { getBaseVotingWeightInfo } from 'store/voting/proposals/actions';
import { baseVotingWeightInfoSelector } from 'store/voting/proposals/selectors';

import { formatDateDMY, formatTimeGMT, unixToDate } from 'utils/date';
import { formatAsset } from 'utils/numbers';

function VotingStats () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const address = useSelector(userAddressMetamask);
  const agent = useSelector(votingAgent);
  const voterStatus = useVoterStatus();

  const { ownWeight, lockedUntil } = useSelector(baseVotingWeightInfoSelector);
  const { votingInfo } = useVoteDelegation(ownWeight, agent);

  useEffect(() => {
    dispatch(getBaseVotingWeightInfo());
    dispatch(getDelegationInfo(address));
  }, [dispatch]);

  const statsList = [
    {
      title: t('TOTAL_VOTING_WEIGHT'),
      value: formatAsset(fromWei(ownWeight || '0'), 'Q'),
    },
    {
      title: t('VOTING_LOCKING_END'),
      value: lockedUntil && lockedUntil !== '0'
        ? (
          <>
            <span>{formatDateDMY(unixToDate(lockedUntil))}</span>
            <span className="text-md">{formatTimeGMT(unixToDate(lockedUntil))}</span>
          </>
        )
        : '–'
    },
    {
      title: t('VOTING_STATUS'),
      value: <span className="text-lg">{voterStatus}</span>
    },
    {
      title: t('VOTE_DELEGATION'),
      value: <span className="text-lg">{votingInfo}</span>
    }
  ];

  return (
    <StatsContainer className="block">
      <div className="block__header">
        <h2 className="text-h2">{t('VOTING_STATS')}</h2>
        <Link to="/q-vault">
          <Button
            block
            alwaysEnabled
            look="secondary"
          >
            {t('MANAGE_VAULT')}
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
