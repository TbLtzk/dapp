import { ethers } from 'ethers';

/** Descending address-byte order (matches q-client `newRootSet`). */
function compareAddressBytesDesc (left: string, right: string): number {
  const leftBytes = ethers.utils.arrayify(left);
  const rightBytes = ethers.utils.arrayify(right);

  for (let i = 0; i < leftBytes.length; i++) {
    if (leftBytes[i] !== rightBytes[i]) {
      return rightBytes[i] - leftBytes[i];
    }
  }

  return 0;
}

/** Matches q-client canonical root node order (descending address bytes). */
export function sortRootNodesCanonical (addresses: string[]): string[] {
  const unique = [...new Set(addresses.map((address) => ethers.utils.getAddress(address)))];

  return unique.sort(compareAddressBytesDesc);
}

/** Root-list content hash (Keccak256 of timestamp string + node bytes). */
export function computeRootListHash (timestamp: number, nodes: string[]): string {
  const canonicalNodes = sortRootNodesCanonical(nodes);
  const parts: ethers.BytesLike[] = [ethers.utils.toUtf8Bytes(String(timestamp))];

  for (const node of canonicalNodes) {
    parts.push(ethers.utils.arrayify(node));
  }

  return ethers.utils.keccak256(ethers.utils.concat(parts));
}

export function buildProposalTimestamp (): number {
  return Math.floor(Date.now() / 1000);
}
