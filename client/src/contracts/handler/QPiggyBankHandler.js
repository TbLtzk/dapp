import {fromWei} from '../../func/balance';

export function handleLockedAssetsResponse(data) {
  const resp = {
    votingWeight: 0,
    votingLockingEnd: 0,
  };

  if (undefined !== data[0]) {
    resp.votingWeight = fromWei(data["lockedAmount"]);
  }

  if (undefined !== data[1]) {
    // eslint-disable-next-line prefer-destructuring
    resp.votingLockingEnd = data["lockedUntil"];
  }

  return resp;
}
