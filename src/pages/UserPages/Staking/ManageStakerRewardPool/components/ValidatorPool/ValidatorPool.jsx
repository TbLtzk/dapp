import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import RefreshDelegationUpdate from './components/RefreshDelegationUpdate';

import { useDispatch, useSelector } from 'react-redux';
import {
  getAccTotalStake,
  getDelegatedStake,
  getOwnStake,
  getTotalStake,
} from 'store/actions/action-creaters/validators';
import { userAddressMetamask } from 'store/selectors/user-inf';
import {
  accTotalStakeSelector,
  delegatedStakeSelector,
  ownStakeSelector,
  totalStakeSelector,
} from 'store/selectors/validators';

import { fN } from 'func/useful';

export default function ValidatorPool(props) {

  const dispatch = useDispatch();
  const address = useSelector(userAddressMetamask);
  const totalStake = useSelector(totalStakeSelector);
  const ownStake = useSelector(ownStakeSelector);
  const delegatedStake = useSelector(delegatedStakeSelector);
  const accTotalStake = useSelector(accTotalStakeSelector);

  useEffect(() => {
    dispatch(getTotalStake(address));
    dispatch(getOwnStake(address));
    dispatch(getDelegatedStake(address));
    dispatch(getAccTotalStake(address));
  }, []);

  const validatorPoolInfArr = useMemo(() => {
    return [[
      {
        label: 'Total Stake:',
        value: fN(totalStake) + 'Q'
      },
      {
        label: 'Validator own Stake:',
        value: fN(ownStake) + 'Q'
      },
    ],
      [
        {
          label: 'Delegated Stake:',
          value: fN(delegatedStake) + 'Q'
        },
        {
          label: 'Accountable Stake:',
          value: fN(accTotalStake) + 'Q'
        },
      ]
    ];
  }, [totalStake, ownStake, delegatedStake, accTotalStake]);

  return (
    <div>
      <h3>Validator Pool</h3>
      {validatorPoolInfArr?.map((line, index) => {
        return (
          <div key={index + '-validator-line'} style={{ display: 'flex' }}>
            {
              line.map((el => {
                return (
                  <div key={el.label + '-validator-pool'} style={{ width: '50%' }}>
                    <h5>{el.label}</h5>
                    <p>{el.value}</p>
                  </div>
                );
              }))
            }
          </div>
        );
      })}
      <RefreshDelegationUpdate/>
    </div>
  );
}
