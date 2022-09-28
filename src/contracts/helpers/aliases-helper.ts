import { AliasPurpose } from '@q-dev/q-js-sdk';
import orderBy from 'lodash/orderBy';
import { AliasEvent } from 'typings/validator';
import { toHex } from 'web3-utils';

import { fetchBlockNumber } from './block-number';

import { getAccountAliasesInstance } from 'contracts/contract-instance';

import { chainIdToNetworkMap, networkConfigsMap, ORIGIN_NETWORK_NAME } from 'constants/config';
import { captureError } from 'utils/errors';

export async function getAliasEvents (): Promise<AliasEvent[]> {
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
      event: item.event,
      address: item.address,
      alias: item.returnValues[1],
      role: toHex(item.returnValues[2]) as AliasPurpose,
    }));
}

export async function getBlockSealingAliasMap (addresses: string[] = [], chainId: number) {
  try {
    const network = chainIdToNetworkMap[chainId] || ORIGIN_NETWORK_NAME;
    if (!networkConfigsMap[network].featureFlags.aliases) return {};

    const contract = await getAccountAliasesInstance();
    const aliases = await contract.resolveBatch(
      addresses,
      addresses.map(() => AliasPurpose.BLOCK_SEALING)
    );

    return aliases.reduce((acc, alias, i) => {
      acc[addresses[i]] = alias === addresses[i] ? '' : alias;
      return acc;
    }, {} as { [address: string]: string });
  } catch (error) {
    captureError(error);
    return addresses.reduce((acc, address) => {
      acc[address] = '';
      return acc;
    }, {} as { [address: string]: string });
  }
}
