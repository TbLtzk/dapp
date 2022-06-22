import { useSelector } from 'react-redux';

import { BalanceWrapper } from './styles';

import { accountBalance } from 'store/q-vault/selectors';
import { isUserRootNode, rootMinimumTimeLock, rootNodeStake, withdrawals } from 'store/root-node/selectors';

import { fromWei } from 'func/balance';
import { fromSolDateFormattingT1 } from 'func/date';
import { fN } from 'func/useful';

function RootBalanceInfo () {
  const userAccountBalance = useSelector(accountBalance);
  const isUserRoot = useSelector(isUserRootNode);
  const amountNodeStake = useSelector(rootNodeStake);
  const withdrawalsData = useSelector(withdrawals);
  const rootTimeLockMinimumBalance = useSelector(rootMinimumTimeLock);

  return (
    <BalanceWrapper>
      <div>
        <h5>Status</h5>
        <p>{isUserRoot ? 'Member of root node panel' : 'Not a member of root node panel'}</p>
      </div>

      <div>
        <h5>Stake in Root Node Ranking</h5>
        <p>{fN(amountNodeStake)} Q</p>
      </div>

      <div>
        <h5>Q Balance</h5>
        <p>{fN(userAccountBalance)} Q</p>
      </div>

      {Number(rootTimeLockMinimumBalance) > 0 && (
        <div>
          <h5>Time Locked Amount</h5>
          <p>{fN(rootTimeLockMinimumBalance)} Q</p>
        </div>
      )}

      <div>
        <h5>Announced for Withdrawal</h5>
        <p>{fN(fromWei(withdrawalsData?.amount))} Q</p>
      </div>

      <div>
        <h5>Announcement Status</h5>
        <p>{Number(withdrawalsData?.amount) > 0 ? 'Pending' : '-'}</p>
      </div>

      <div>
        <h5>Announcement End</h5>
        <p>
          {Number(withdrawalsData?.amount) > 0 && withdrawalsData
            ? fromSolDateFormattingT1(withdrawalsData?.endTime)
            : '-'
          }
        </p>
      </div>
    </BalanceWrapper>
  );
}

export default RootBalanceInfo;
