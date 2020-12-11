import { WeiToQ } from 'func/balance';

export function handleLockedAssetsResponse(data) {
  const resp = {
    votingWeight: 0,
    votingLockingEnd: 0,
  };

  if (undefined !== data[0]) {
    resp.votingWeight = WeiToQ(data[0]);
  }

  if (undefined !== data[1]) {
    resp.votingLockingEnd = data[1];
  }

  return resp;
}
