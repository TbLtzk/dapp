import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';

import CustomBlock from 'components/Base/CustomBlock';
import InfoTooltip from 'components/Custom/InfoTooltip';

import useVoteDelegation from 'hooks/useVoteDelegation';

import AnnounceForm from './components/AnnounceForm';

import { getDelegationInfo, setNewVotingAgent } from 'store/q-vault/action-creators';
import { isPendingDelegation, receivedWeight, votingAgentPassOverTime } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { fromWei } from 'func/balance';
import { getNowTimestamp, remainDate } from 'func/convertDate';

function DelegateVoting () {
  const dispatch = useDispatch();

  const address = useSelector(userAddressMetamask);
  const weight = useSelector(receivedWeight);
  const isPending = useSelector(isPendingDelegation);
  const time = useSelector(votingAgentPassOverTime);

  const { delegateInfo } = useVoteDelegation(weight);

  useEffect(() => {
    dispatch(getDelegationInfo(address));
  }, []);

  async function handleDelegate () {
    dispatch(setNewVotingAgent());
  }

  return (
    <CustomBlock>
      <h1>
        <span>Delegate Voting Power</span>
        <InfoTooltip topic="delegate-voting-power" />
      </h1>
      <h5>Total Voting Weight</h5>
      <p>{fromWei(weight)}</p>
      <h5>Current agent</h5>
      <p>{delegateInfo}</p>

      {!isPending
        ? null
        : time - getNowTimestamp() > 0
          ? (
            <>
              <h5>Delegation info</h5>
              <h4>{`This delegation info is currently pending. It can be finalized after ${remainDate(time)}`}</h4>
            </>
          )
          : (
            <div className="card_block">
              <div>
                <h5>Confirm announced voting agent</h5>
                <p style={{ marginBottom: 0 }}>This delegation info is currently pending. Need to confirm.</p>
              </div>
              <div>
                <Button compact onClick={handleDelegate}>
                  <i className="mdi mdi-chart-pie" />
                  <span>Confirm</span>
                </Button>
              </div>
            </div>
          )}
      <div className="card__line" />
      <AnnounceForm />
    </CustomBlock>
  );
}

export default DelegateVoting;
