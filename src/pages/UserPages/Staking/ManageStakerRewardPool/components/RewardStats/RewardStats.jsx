import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { delegatedStakeSelector } from 'store/selectors/validators';

import FormInput from 'components/Base/Form/FormInput';
import Button from 'components/Base/Buttons/Button';

import { useForm } from 'react-hook-form';
import Handler from './handler';

import { errorHandler, fN } from 'func/useful';

export default function RewardStats() {
  const {
    register: reg1,
    handleSubmit: submit1,
    errors: err1
  } = useForm();
  const {
    register: reg2,
    handleSubmit: submit2,
    errors: err2
  } = useForm();

  const [amountRP, setAmountRP] = useState(0);
  const [delShare, setDelShare] = useState(0);
  const [delClaim, setDelClaim] = useState('0')
  const delegatedStake = useSelector(delegatedStakeSelector);

  const address = useSelector(userAddressMetamask);
  const handler = new Handler(address, useDispatch());
  

  useEffect(() => {
    handler.getAmountOfRewardPool(setAmountRP);
    handler.getDelegatorShare(setDelShare);
    handler.getInterestRate(setIntRate);
    handler.getPoolInfo(setDelClaim);
  }, []);

  const setDelegatorShare = (formData) => {
    handler.setDelegatorShare(formData, setDelShare);
  };

  const disDelClaims = amountRP - delClaim;

  const rewardStatsArr = useMemo(() => {
    return [
      [
        {
          label: 'Collected Pool Rewards:',
          value: fN(amountRP) + 'Q'
        },
        {
          label: 'Outstanding Delegator Claims:',
          value: fN(delClaim) + 'Q'
        },
        {
          label: 'Distributable Delegator Rewards:',
          value: fN(disDelClaims) + 'Q'
        },
        {
          label: 'Distributable Delegator Percentage:',
          value:   fN(disDelClaims / delegatedStake)+ '%'
        },
      ],
      [
        {
          label: 'Validator Share:',
          value: delShare === 0 ? '100%' : fN(100 - delShare) + '%'
        },
        {
          label: 'Delegator Share:',
          value: fN(delShare) + '%'
        },
      ]
    ];

  }, [amountRP, delShare, delClaim, disDelClaims, delegatedStake]);

  return (
    <>
      <h3 className="title type-1">Reward Stats</h3>
      {rewardStatsArr?.map((line, index) => {
        return (
          <div key={index + '--reward-line'} style={{ display: 'flex' }}>
            {
              line.map(el => {
                return (
                  <div key={el.label + '-reward-stats'} style={{ width: '50%' }}>
                    <h5>{el.label}</h5>
                    <p>{el.value}</p>
                  </div>
                );
              })
            }
          </div>
        );
      })}
      <h4>Set Delegator Share</h4>
      <div className="modal-one-line-form">
        <FormInput
          name="amount"
          type="number"
          lbl="%"
          placeholder="0"
          palette="dark"
          ref={reg1({
            required: true,
            min: 0,
            max: 100.0001
          })}
          valid={errorHandler(err1, 'amount')}
        />
        <Button
          type="outline"
          title="Set"
          width="94px"
          handleButton={submit1(setDelegatorShare)}
        />
      </div>
    </>
  );
}
