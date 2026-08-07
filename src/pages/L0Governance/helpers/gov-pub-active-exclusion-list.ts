import { ethers } from 'ethers';

import { GovPubRpcProvider } from './gov-pub-rpc';
import { GovPubExcludedValidator, GovPubExclusionList } from './types';

interface GovPubActiveExclusionListRpc {
  timestamp: number | string;
  validators: GovPubExcludedValidator[];
  hash?: string;
  signers?: string[];
}

function normalizeValidators (validators: GovPubExcludedValidator[]): GovPubExcludedValidator[] {
  return validators.map((validator) => ({
    address: ethers.utils.getAddress(validator.address),
    block: Number(validator.block),
    endBlock: validator.endBlock != null ? Number(validator.endBlock) : undefined,
  }));
}

export async function fetchGovPubActiveExclusionList (
  provider: GovPubRpcProvider,
): Promise<GovPubExclusionList | null> {
  const result: GovPubActiveExclusionListRpc | null = await provider.send(
    'govPub_activeExclusionList',
    [],
  );

  if (!result?.validators?.length) {
    return null;
  }

  return {
    timestamp: Number(result.timestamp),
    validators: normalizeValidators(result.validators),
    hash: result.hash || '',
    signatures: [],
  };
}
