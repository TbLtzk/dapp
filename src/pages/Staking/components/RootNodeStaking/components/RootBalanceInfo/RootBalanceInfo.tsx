import { useSelector } from 'react-redux';

import { isUserRootNode, rootMinimumTimeLock, rootNodeStake, withdrawals } from 'store/root-node/selectors';

import { fromWei } from 'func/balance';
import { fromSolDateFormattingT1 } from 'func/date';
import { fN } from 'func/useful';

function RootBalanceInfo () {
  const isUserRoot = useSelector(isUserRootNode);
  const amountNodeStake = useSelector(rootNodeStake);
  const withdrawalsData = useSelector(withdrawals);
  const rootTimeLockMinimumBalance = useSelector(rootMinimumTimeLock);

  return (
    <div className="block-body">
      <div>
        <p className="text-md">Status</p>
        <h4 className="text-xl">{isUserRoot ? 'Member of root node panel' : 'Not a member of root node panel'}</h4>
      </div>

      <div>
        <p className="text-md">Stake in Root Node Ranking</p>
        <h4 className="text-xl">{fN(amountNodeStake)} Q</h4>
      </div>

      {Number(rootTimeLockMinimumBalance) > 0 && (
        <div>
          <p className="text-md">Time Locked Amount</p>
          <h4 className="text-xl">{fN(rootTimeLockMinimumBalance)} Q</h4>
        </div>
      )}

      <div>
        <p className="text-md">Announced for Withdrawal</p>
        <h4 className="text-xl">{fN(fromWei(withdrawalsData?.amount))} Q</h4>
      </div>

      <div>
        <p className="text-md">Announcement Status</p>
        <h4 className="text-xl">{Number(withdrawalsData?.amount) > 0 ? 'Pending' : '-'}</h4>
      </div>

      <div>
        <p className="text-md">Announcement End</p>
        <h4 className="text-xl">
          {Number(withdrawalsData?.amount) > 0 && withdrawalsData
            ? fromSolDateFormattingT1(withdrawalsData?.endTime)
            : '-'
          }
        </h4>
      </div>
    </div>
  );
}

export default RootBalanceInfo;
