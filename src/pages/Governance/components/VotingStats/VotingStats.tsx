import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ProposalType } from 'typings/proposals';

import Button from 'components/Base/Button';
import ModalWindow from 'components/Base/ModalWindow';
import PopperTooltip from 'components/Base/PopperTooltip';
import InfoTooltip from 'components/Custom/InfoTooltip';
import VoterStatus from 'components/Custom/PageLists/VoterStatus';

import useVoteDelegation from 'hooks/useVoteDelegation';

import PurgeSlashingForm from '../PurgeSlashingForm';

import { StatsWrapper } from './styles';

import { getDelegationInfo } from 'store/q-vault/action-creators';
import { votingAgent } from 'store/q-vault/selectors';
import { isUserRootNode } from 'store/root-node/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';
import { getBaseVotingWeightInfo } from 'store/voting/proposals/actions';
import { baseVotingWeightInfoSelector } from 'store/voting/proposals/selectors';

import { fromWei } from 'func/balance';
import { fromSolDateFormattingT1 } from 'func/date';
import { fN } from 'func/useful';

function VotingStats ({ type, row = false }: { type: ProposalType, row?: boolean }) {
  const dispatch = useDispatch();

  const address = useSelector(userAddressMetamask);
  const agent = useSelector(votingAgent);
  const isRootNode = useSelector(isUserRootNode);

  const { ownWeight, lockedUntil } = useSelector(baseVotingWeightInfoSelector);
  const { votingInfo } = useVoteDelegation(ownWeight, agent);

  const [purgeModalOpen, setPurgeModalOpen] = useState(false);

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
    <StatsWrapper $row={row}>
      <div className="stats-head">
        <h1 className="stats-title">Voting Stats</h1>
        <div className="stats-actions">
          {!row && type === 'slashing' && (
            <PopperTooltip
              disabled={isRootNode}
              trigger={
                <Button
                  look="white"
                  disabled={!isRootNode}
                  onClick={() => setPurgeModalOpen(true)}
                >
                  Purge slashing
                </Button>
              }
            >
              <span>Available only for root nodes</span>
            </PopperTooltip>
          )}

          <Link to="/q-vault">
            <Button alwaysEnabled look="white">
              Manage vault
            </Button>
          </Link>
        </div>

        <ModalWindow
          show={purgeModalOpen}
          modalTitle={
            <>
              <span>Purge Slashing</span>
              <InfoTooltip
                invertedColors
                topic="purge-slashing"
                placement="bottom"
              />
            </>
          }
          content={<PurgeSlashingForm />}
          width="420px"
          onHide={() => setPurgeModalOpen(false)}
        />
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
