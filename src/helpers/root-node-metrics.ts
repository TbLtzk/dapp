import { L0ListItemStatus, } from '@q-dev/q-js-sdk';
import { AxiosError } from 'axios';
import { ErrorHandler } from 'helpers';

import { getIndexerInstance } from 'contracts/contract-instance';

export function getCosignatureMetrics (indexerUrl: string, cycles: number, blocksDelay = 0) {
  const indexer = getIndexerInstance(indexerUrl);
  return indexer.getRootNodeMetrics({ cycles, blocksDelay });
}

export async function getRootNodesExclusion (indexerUrl: string, status: L0ListItemStatus) {
  try {
    const indexer = getIndexerInstance(indexerUrl);
    const rootNodesExclusion = await indexer.getL0ExclusionList(status);

    return rootNodesExclusion;
  } catch (error) {
    if ((error as AxiosError)?.response?.status !== 404) throw error;
    ErrorHandler.processWithoutFeedback(error);
    return null;
  }
}

export async function getRootNodesL0 (indexerUrl: string, status: L0ListItemStatus) {
  try {
    const indexer = getIndexerInstance(indexerUrl);
    const rootNodesL0 = await indexer.getL0RootList(status);

    return rootNodesL0;
  } catch (error) {
    if ((error as AxiosError)?.response?.status !== 404) throw error;

    ErrorHandler.processWithoutFeedback(error);
    return null;
  }
}
