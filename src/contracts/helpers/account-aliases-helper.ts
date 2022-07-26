import { AliasPurpose } from '@q-dev/q-js-sdk';
import { orderBy } from 'lodash';

import { getAccountAliasesInstance } from 'contracts/contract-instance';

import { isFeatureEnabled } from 'func/appConfig';
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
      address: item.returnValues[0],
      alias: item.returnValues[1],
      role: transformToHex(item.returnValues[2])
    }));
}

export async function getBlockSealingAliasMap (addresses = [], network: number) {
  if (!isFeatureEnabled('aliases', network)) return {};

  const contract = await getAccountAliasesInstance();
  const aliases = await contract.resolveBatch(
    addresses,
    addresses.map(() => AliasPurpose.BLOCK_SEALING)
  );

  return aliases.reduce((acc, alias, i) => {
    acc[addresses[i]] = alias === addresses[i] ? '' : alias;
    return acc;
  }, {} as { [address: string]: string });
}
