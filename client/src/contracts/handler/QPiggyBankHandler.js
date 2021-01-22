import { web3 } from '../config/drizzle-config';

export function handleLockedAssetsResponse(data) {
  const resp = {
    votingWeight: 0,
    votingLockingEnd: 0,
  };

  if (undefined !== data[0]) {
    resp.votingWeight = web3.utils.fromWei(data[0]);
  }

  if (undefined !== data[1]) {
    // eslint-disable-next-line prefer-destructuring
    resp.votingLockingEnd = data[1];
  }

  return resp;
}
