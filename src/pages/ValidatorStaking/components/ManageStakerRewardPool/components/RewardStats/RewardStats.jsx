import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import FormInput from 'components/Base/Form/FormInput';

import useInputForm from 'hooks/useInputForm';

import { setVRPDelegatorsShare } from 'store/validation-reward-pools/action-creators';
import { balance, delegatorShare, poolInfoSelector } from 'store/validation-reward-pools/selectors';
import { delegatedStakeSelector } from 'store/validators/selectors';

import formTypes from 'constants/form-types';
import { errorHandler, fN } from 'func/useful';

function RewardStats () {
  const dispatch = useDispatch();

  const delegatedStake = useSelector(delegatedStakeSelector);
  const delShare = useSelector(delegatorShare);
  const amountRP = useSelector(balance);
  const delClaim = useSelector(poolInfoSelector);

  const { register, handleSubmit, errors } = useInputForm(formTypes.validatorsPool);

  const setDelegatorShareFunc = (formData) => {
    dispatch(setVRPDelegatorsShare(formData.amount));
  };

  const disDelClaims = amountRP - delClaim;

  const rewardStats = [
    [
      {
        label: 'Collected Pool Rewards:',
        value: fN(amountRP) + 'Q',
      },
      {
        label: 'Outstanding Delegator Claims:',
        value: fN(delClaim) + 'Q',
      },
      {
        label: 'Distributable Delegator Rewards:',
        value: fN(disDelClaims) + 'Q',
      },
      {
        label: 'Distributable Delegator Percentage:',
        value: fN(disDelClaims / Number(delegatedStake)) + '%',
      },
    ],
    [
      {
        label: 'Validator Share:',
        value: !delShare ? '100%' : fN(100 - delShare) + '%',
      },
      {
        label: 'Delegator Share:',
        value: fN(delShare) + '%',
      },
    ],
  ];

  return (
    <>
      <h3 className="title type-1">Reward Stats</h3>
      {rewardStats.map((rewardItem, index) => (
        <div key={index} style={{ display: 'flex' }}>
          {rewardItem.map((item) => (
            <div key={item.label + '-reward-stats'} style={{ width: '50%' }}>
              <h5>{item.label}</h5>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      ))}

      <h4>Set Delegator Share</h4>
      <div className="modal-one-line-form">
        <FormInput
          ref={register({
            required: true,
            min: 0,
            max: 100.0001,
          })}
          name="amount"
          type="number"
          prefix="%"
          placeholder="0"
          error={errorHandler(errors, 'amount')}
        />
        <Button
          type="outline"
          title="Set"
          width="94px"
          handleButton={handleSubmit(setDelegatorShareFunc)}
        />
      </div>
    </>
  );
}

export default RewardStats;
