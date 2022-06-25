export enum SupportedChainId {
  Q_MAINNET = 35443,
  Q_TESTNET = 35441,
  Q_DEVNET = 35442,
}

export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.Q_MAINNET]: 'Q Mainnet',
  [SupportedChainId.Q_TESTNET]: 'Q Testnet',
  [SupportedChainId.Q_DEVNET]: 'Q Devnet',
};

/**
 * Array of all the supported chain IDs
 */
export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
  (id) => typeof id === 'number'
) as SupportedChainId[];
