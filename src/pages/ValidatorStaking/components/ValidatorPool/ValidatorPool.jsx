import { useSelector } from 'react-redux';

import RefreshDelegationUpdate from '../RefreshDelegationUpdate';

import {
  accountableTotalStake,
  delegatedStakeSelector,
  ownStakeSelector,
  totalStakeSelector
} from 'store/validators/selectors';

import { fN } from 'func/useful';

function ValidatorPool () {
  const totalStake = useSelector(totalStakeSelector);
  const ownStake = useSelector(ownStakeSelector);
  const delegatedStake = useSelector(delegatedStakeSelector);
  const accTotalStake = useSelector(accountableTotalStake);

  const validatorPoolData = [
    [
      {
        label: 'Total Stake:',
        value: `${fN(totalStake)} Q`
      },
      {
        label: 'Validator Own Stake:',
        value: `${fN(ownStake)} Q`
      }
    ],
    [
      {
        label: 'Delegated Stake:',
        value: `${fN(delegatedStake)} Q`
      },
      {
        label: 'Accountable Stake:',
        value: `${fN(accTotalStake)} Q`
      }
    ]
  ];

  return (
    <div>
      <h3>Validator Pool</h3>
      {validatorPoolData.map((line, index) => (
        <div
          key={`${index}-validator-line`}
          style={{ display: 'flex' }}
        >
          {line.map((el) => (
            <div
              key={`${el.label}-validator-pool`}
              style={{ width: '50%' }}
            >
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

export default ValidatorPool;
