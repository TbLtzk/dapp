import React from 'react';
import { useSelector } from 'react-redux';

import { BalanceWrapper } from './styles';

import { accountBalance } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';
import {
  accountableTotalStake,
  isUserValidator,
  validatorsMinimumTimeLock,
  validatorsWidenedSelector,
  validatorWithdrawalInfo,
} from 'store/validators/selectors';

import { fromWei } from 'func/balance';
import { fromSolDateFormattingT1 } from 'func/date';
import { fN } from 'func/useful';

function ValidatorBalanceInfo () {
  const address = useSelector(userAddressMetamask);
  const userAccountBalance = useSelector(accountBalance);
  const isThisUserValidator = useSelector(isUserValidator);

  const userAccountableTotalStake = useSelector(accountableTotalStake);
  const withdrawalInfo = useSelector(validatorWithdrawalInfo);
  const validatorLockedAmount = useSelector(validatorsMinimumTimeLock);
  const memberTable = useSelector(validatorsWidenedSelector);

  const userRank = memberTable.find((member) => member.address === address)?.rank;

  return (
    <BalanceWrapper>
      <div>
        <h5>Status</h5>
        {isThisUserValidator ? <p>Active validator</p> : <p>Not a validator</p>}
      </div>

      <div>
        <h5>Current Rank</h5>
        <p>{userRank ? `${userRank} #` : '-'}</p>
      </div>

      <div>
        <h5>Stake in Validator Ranking</h5>
        <p>{fN(userAccountableTotalStake)} Q</p>
      </div>

      <div>
        <h5>Q Balance</h5>
        <p>{fN(userAccountBalance)} Q</p>
      </div>

      {Number(validatorLockedAmount) > 0 && (
        <div>
          <h5>Time Locked Amount</h5>
          <p>{fN(validatorLockedAmount)} Q </p>
        </div>
      )}

      <div>
        <h5>Announced for Withdrawal</h5>
        <p>{fromWei(withdrawalInfo.amount)} Q</p>
      </div>

      <div>
        <h5>Announcement Status</h5>
        <p>{Number(withdrawalInfo?.amount) > 0 ? 'Pending' : '-'}</p>
      </div>

      <div>
        <h5>Announcement End</h5>
        <p>
          {withdrawalInfo && Number(withdrawalInfo?.amount) > 0
            ? fromSolDateFormattingT1(withdrawalInfo.endTime)
            : '-'
          }
        </p>
      </div>
    </BalanceWrapper>
  );
}

export default ValidatorBalanceInfo;
