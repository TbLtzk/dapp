import { ethers } from 'ethers';

import { GovPubRpcProvider } from './gov-pub-rpc';
import { GovPubRootList } from './types';

interface GovPubProposedRootListRpc {
  timestamp: number | string;
  nodes: string[];
  hash: string;
  signers?: string[];
}

export async function fetchGovPubProposedRootList (
  provider: GovPubRpcProvider,
): Promise<GovPubRootList | null> {
  const result: GovPubProposedRootListRpc | null = await provider.send(
    'govPub_proposedRootList',
    [],
  );

  if (!result?.nodes?.length) {
    return null;
  }

  return {
    timestamp: Number(result.timestamp),
    nodes: result.nodes.map((node) => ethers.utils.getAddress(node)),
    hash: result.hash,
    signatures: [],
  };
}
