import { useSelector } from 'react-redux';

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
  const isThisUserValidator = useSelector(isUserValidator);

  const userAccountableTotalStake = useSelector(accountableTotalStake);
  const withdrawalInfo = useSelector(validatorWithdrawalInfo);
  const validatorLockedAmount = useSelector(validatorsMinimumTimeLock);
  const memberTable = useSelector(validatorsWidenedSelector);

  const userRank = memberTable.find((member: any) => member.address === address)?.rank;

  return (
    <div className="block-body">
      <div>
        <p className="text-md">Status</p>
        <h4 className="text-xl">{isThisUserValidator ? 'Active validator' : 'Not a validator'}</h4>
      </div>
      <div>
        <p className="text-md">Current Rank</p>
        <h4 className="text-xl">{userRank ? `${userRank} #` : '-'}</h4>
      </div>

      <div>
        <p className="text-md">Stake in Validator Ranking</p>
        <h4 className="text-xl">{fN(userAccountableTotalStake)} Q</h4>
      </div>

      {Number(validatorLockedAmount) > 0 && (
        <div>
          <p className="text-md">Time Locked Amount</p>
          <h4 className="text-xl">{fN(validatorLockedAmount)} Q </h4>
        </div>
      )}

      <div>
        <p className="text-md">Announced for Withdrawal</p>
        <h4 className="text-xl">{fromWei(withdrawalInfo.amount)} Q</h4>
      </div>

      <div>
        <p className="text-md">Announcement Status</p>
        <h4 className="text-xl">{Number(withdrawalInfo?.amount) > 0 ? 'Pending' : '-'}</h4>
      </div>

      <div>
        <p className="text-md">Announcement End</p>
        <h4 className="text-xl">
          {withdrawalInfo && Number(withdrawalInfo?.amount) > 0 ? fromSolDateFormattingT1(withdrawalInfo.endTime) : '-'}
        </h4>
      </div>
    </div>
  );
}

export default ValidatorBalanceInfo;
