import { AliasPurpose } from '@q-dev/q-js-sdk';
import { ErrorHandler } from 'helpers';
import orderBy from 'lodash/orderBy';
import { AliasEvent } from 'typings/validator';

import { fetchBlockNumber } from './block-number';

import { getAccountAliasesInstance } from 'contracts/contract-instance';

import { chainIdToNetworkMap, networkConfigsMap, ORIGIN_NETWORK_NAME } from 'constants/config';

export async function getAliasEvents (): Promise<AliasEvent[]> {
  const contract = await getAccountAliasesInstance();
  const latestBlock = await fetchBlockNumber('latest');
  const opts = {
    fromBlock: latestBlock - 500_000, // ~4 weeks
    toBlock: 'latest'
  };

  const [updatedEvents, reservedEvents] = await Promise.all([
    contract.instance.queryFilter(
      contract.instance.filters.AliasUpdated(),
      opts.fromBlock,
      opts.toBlock
    ),
    contract.instance.queryFilter(
      contract.instance.filters.Reserved(),
      opts.fromBlock,
      opts.toBlock
    )
  ]);

  return orderBy([...updatedEvents, ...reservedEvents], 'blockNumber', 'desc')
    .map(item => ({
      event: item.event || '',
      address: item.args._main,
      alias: item.args._alias,
      role: 'role' in item.args
        ? item.args.role.toHexString() as AliasPurpose
        : undefined
    }));
}

export async function getAliasMap (addresses: string[] = [], chainId: number, purpose: AliasPurpose) {
  try {
    const network = chainIdToNetworkMap[chainId] || ORIGIN_NETWORK_NAME;
    if (!networkConfigsMap[network].featureFlags.aliases) return {};
    const contract = await getAccountAliasesInstance();
    const aliases = await contract.resolveBatch(
      addresses,
      addresses.map(() => purpose)
    );

    return aliases.reduce((acc, alias, i) => {
      acc[addresses[i]] = alias === addresses[i] ? '' : alias;
      return acc;
    }, {} as { [address: string]: string });
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    return addresses.reduce((acc, address) => {
      acc[address] = '';
      return acc;
    }, {} as { [address: string]: string });
  }
}
