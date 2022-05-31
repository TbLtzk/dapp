import { orderBy } from 'lodash';

import { getAccountAliasesInstance } from 'contracts/contract-instance';

import { fetchBlockNumber, transformToHex } from 'func/useful';

export async function getAliasEvents () {
  const contract = await getAccountAliasesInstance();
  const latestBlock = await fetchBlockNumber('latest');
  const opts = {
    fromBlock: latestBlock - 500_000, // ~4 weeks
    toBlock: 'latest'
  };

  const [updatedEvents, reservedEvents] = await Promise.all([
    contract.instance.getPastEvents('AliasUpdated', opts),
    contract.instance.getPastEvents('Reserved', opts)
  ]);

  return orderBy([...updatedEvents, ...reservedEvents], 'blockNumber', 'desc')
    .map(item => ({
      ...item,
      address: item.returnValues._main,
      alias: item.returnValues._alias,
      role: transformToHex(item.returnValues.role)
    }));
}
