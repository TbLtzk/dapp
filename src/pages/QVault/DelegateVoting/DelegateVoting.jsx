import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Buttons/Button';
import CardBlock from 'components/Base/CardBlock';
import CustomBlock from 'components/Base/CustomBlock';
import FormInput from 'components/Base/Form/FormInput';

import { getDelegationInfo, setAnnounceNewVotingAgent, setNewVotingAgent } from 'store/q-vault/action-creators';
import { isPendingDelegation, receivedWeight, votingAgent, votingAgentPassOverTime } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { getVoteDelegation } from 'contracts/helpers/voting-helpers/base-voting-helper';

import { fromWei } from 'func/balance';
import { getNowTimestamp, remainDate } from 'func/convertDate';

export default function LockCoin () {
  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);
  const weight = useSelector(receivedWeight);
  const agent = useSelector(votingAgent);
  const isPending = useSelector(isPendingDelegation);
  const time = useSelector(votingAgentPassOverTime);

  const { register: reg1, handleSubmit: submit1, errors: err1 } = useForm();

  useEffect(() => {
    dispatch(getDelegationInfo(address));
  }, []);

  async function announce (formData) {
    dispatch(setAnnounceNewVotingAgent(formData.address));
  }

  async function btnHandler () {
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
              <h4>{`This delegation info is currently pending. It can be finalized after ${remainDate(
                time
              )}`}</h4>
            </>
          )
          : (
            <CardBlock
              title="Confirm announced voting agent"
              firstContent="This delegation info is currently pending. Need to confirm."
              iconFontSize="20px"
              btnTitle="Confirm"
              btnHandler={btnHandler}
            />
          )}
      <div className="card__line" />
      <h3>Announce new voting agent</h3>
      <h4>Address</h4>
      <div className={'card__one-line-simple-form'}>
        <FormInput
          ref={reg1({
            required: 'Please, fill the field',
            pattern: /[0-9]/i
          })}
          name="address"
          placeholder="0x000"
          error={err1.address?.message}
        />
        <Button
          type="outline"
          title="Announce"
          width="90px"
          handleButton={submit1(announce)}
        />
      </div>
      <h4>This will immediately reduce the voting weight of your voting agent for new voting</h4>
    </CustomBlock>
  );
}
