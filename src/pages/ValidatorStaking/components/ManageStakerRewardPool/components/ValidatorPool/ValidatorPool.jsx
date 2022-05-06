import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RefreshDelegationUpdate from './components/RefreshDelegationUpdate';

import { userAddressMetamask } from 'store/user-inf/selectors';
import { getVRPLastUpdateOfCompoundRate } from 'store/validation-reward-pools/action-creators';
import {
  getAccountableTotalStake,
  getDelegatedStake,
  getOwnStake,
  getTotalStake
} from 'store/validators/action-creators';
import {
  accountableTotalStake,
  delegatedStakeSelector,
  ownStakeSelector,
  totalStakeSelector
} from 'store/validators/selectors';

import { fN } from 'func/useful';

export default function ValidatorPool ({ modalShow }) {
  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);

  const totalStake = useSelector(totalStakeSelector);
  const ownStake = useSelector(ownStakeSelector);
  const delegatedStake = useSelector(delegatedStakeSelector);
  const accTotalStake = useSelector(accountableTotalStake);

  useEffect(() => {
    if (modalShow) {
      dispatch(getVRPLastUpdateOfCompoundRate());
      dispatch(getTotalStake(address));
      dispatch(getOwnStake(address));
      dispatch(getDelegatedStake(address));
      dispatch(getAccountableTotalStake(address));
    }
  }, [modalShow, dispatch]);

  const validatorPoolInfArr = useMemo(() => {
    return [
      [
        {
          label: 'Total Stake:',
          value: fN(totalStake) + ' Q'
        },
        {
          label: 'Validator Own Stake:',
          value: fN(ownStake) + ' Q'
        }
      ],
      [
        {
          label: 'Delegated Stake:',
          value: fN(delegatedStake) + ' Q'
        },
        {
          label: 'Accountable Stake:',
          value: fN(accTotalStake) + ' Q'
        }
      ]
    ];
  }, [totalStake, ownStake, delegatedStake, accTotalStake]);

  return (
    <div>
      <h3>Validator Pool</h3>
      {validatorPoolInfArr?.map((line, index) => (
        <div key={index + '-validator-line'} style={{ display: 'flex' }}>
          {line.map((el) => (
            <div key={el.label + '-validator-pool'} style={{ width: '50%' }}>
              <h5>{el.label}</h5>
              <p>{el.value}</p>
            </div>
          ))}
        </div>
      ))}
      <RefreshDelegationUpdate />
    </div>
  );
}
