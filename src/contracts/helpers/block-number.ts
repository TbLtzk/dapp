import { captureError } from 'utils/errors';

export async function getMinimalActiveBlockHeight () {
  try {
    const latestBlock = await fetchBlockNumber('latest');
    const blocks = 1_000_000;
    const minimalActiveBlockHeight = Math.max(0, Number(latestBlock) - Number(blocks));

    return {
      minimalActiveBlockHeight,
      lastBlockHeight: latestBlock,
    };
  } catch (error) {
    captureError(error);
    return {
      minimalActiveBlockHeight: 0,
      lastBlockHeight: 'latest',
    };
  }
};

export async function fetchBlockNumber (block = 'latest') {
  try {
    const { number } = await window?.web3?.eth.getBlock(block);
    return number;
  } catch (error) {
    captureError(error);
    return 0;
  }
}
