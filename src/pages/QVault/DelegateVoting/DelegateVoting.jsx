import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import CustomBlock from 'components/Base/CustomBlock';
import FormInput from 'components/Base/Form/FormInput';

import useInputForm from 'hooks/useInputForm';

import { getDelegationInfo, setAnnounceNewVotingAgent, setNewVotingAgent } from 'store/q-vault/action-creators';
import { isPendingDelegation, receivedWeight, votingAgent, votingAgentPassOverTime } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { getVoteDelegation } from 'contracts/helpers/voting-helpers/base-voting-helper';

import formTypes from 'constants/form-types';
import { fromWei } from 'func/balance';
import { getNowTimestamp, remainDate } from 'func/convertDate';
import { isAddress } from 'func/useful';

function DelegateVoting () {
  const dispatch = useDispatch();

  const address = useSelector(userAddressMetamask);
  const weight = useSelector(receivedWeight);
  const agent = useSelector(votingAgent);
  const isPending = useSelector(isPendingDelegation);
  const time = useSelector(votingAgentPassOverTime);

  const { register, handleSubmit, errors } = useInputForm(formTypes.qVaultAnnounce);

  useEffect(() => {
    dispatch(getDelegationInfo(address));
  }, []);

  async function handleAnnounce (formData) {
    dispatch(setAnnounceNewVotingAgent(formData.address));
  }

  async function handleDelegate () {
    dispatch(setNewVotingAgent());
  }

  const { delegateInfo } = getVoteDelegation(agent, weight, address);

  return (
    <CustomBlock>
      <h1>Delegate Voting Power</h1>
      <h5>Total Voting Weight</h5>
      <h4>{fromWei(weight)}</h4>
      <h5>Current agent</h5>
      <h4>{delegateInfo}</h4>
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
                <p>This delegation info is currently pending. Need to confirm.</p>
              </div>
              <div>
                <Button
                  icon="chart-pie"
                  iconFontSize="20px"
                  title="Confirm"
                  onClick={handleDelegate}
                />
              </div>
            </div>
          )}
      <div className="card__line" />
      <h3>Announce new voting agent</h3>
      <h4>Address</h4>
      <div className="card__one-line-simple-form">
        <FormInput
          ref={register({
            required: 'Please, fill the field',
            validate: (address) => (isAddress(address) ? true : 'Incorrect address'),
          })}
          name="address"
          placeholder="0x000"
          valid={errors?.address?.message}
        />
        <Button
          title="Announce"
          style={{ width: '90px' }}
          onClick={handleSubmit(handleAnnounce)}
        />
      </div>
      <h4>This will immediately reduce the voting weight of your voting agent for new voting</h4>
    </CustomBlock>
  );
}

export default DelegateVoting;
