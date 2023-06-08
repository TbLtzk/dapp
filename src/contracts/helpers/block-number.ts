import { ErrorHandler } from 'helpers';

import { currentProvider } from 'contracts/contract-instance';

export async function getMinimalActiveBlockHeight () {
  try {
    const lastBlockHeight = await fetchBlockNumber('latest');
    const minimalActiveBlockHeight = Math.max(0, Number(lastBlockHeight) - 1_000_000);
    return {
      minimalActiveBlockHeight,
      lastBlockHeight,
    };
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    return {
      minimalActiveBlockHeight: 0,
      lastBlockHeight: 'latest',
    };
  }
}

export async function fetchBlockNumber (block = 'latest') {
  try {
    const currBlock = await currentProvider?.getBlock(block);
    return currBlock?.number || 0;
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    return 0;
  }
}
