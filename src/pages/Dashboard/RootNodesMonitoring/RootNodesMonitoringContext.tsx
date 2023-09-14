import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

import {
  L0ExclusionListItem,
  L0RootListItem,
  RootNodeMetric,
  RootNodeProposalsAggregated,
  RootNodeQTHVotingsAggregated,
  RootNodeVotingsAggregated
} from '@q-dev/q-js-sdk';
import { useInterval } from '@q-dev/react-hooks';
import {
  getCosignatureMetrics,
  getRNProposalsStats,
  getRNQTHVotingsStats,
  getRNVotingsStats,
  getRootNodesExclusion,
  getRootNodesL0,
} from 'helpers/root-node-metrics';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { useRootNodes } from 'store/root-nodes/hooks';

import { getRootNodesInstance } from 'contracts/contract-instance';
import { fetchBlockNumber } from 'contracts/helpers/block-number';

const SECONDS_IN_HALF_YEAR = 182.625 * 24 * 60 * 60;
const SECONDS_PER_BLOCK = 5;
const HALF_YEAR_BLOCKS = SECONDS_IN_HALF_YEAR / SECONDS_PER_BLOCK;

interface RootNodesOnchainDiffItem {
  address: string;
  isOnchain: boolean;
  isL0Active: boolean;
}

interface Props {
  children: ReactNode;
}

export interface RootNodesMonitoringData {
  rootNodesOnchainList: string[];
  rootNodesOnchainDiffList: RootNodesOnchainDiffItem[];
  rootNodesL0Active: L0RootListItem | null;
  rootNodesL0Proposed: L0RootListItem | null;
  rootNodesExclusionActive: L0ExclusionListItem | null;
  rootNodesExclusionProposed: L0ExclusionListItem | null;
  latestCosignatureMetrics: RootNodeMetric | null;
  cosignatureMetrics20: RootNodeMetric | null;
  cosignatureMetrics1000: RootNodeMetric | null;
  qTHVotingsStats: RootNodeQTHVotingsAggregated | null;
  votingsStats: RootNodeVotingsAggregated | null;
  proposalsStats: RootNodeProposalsAggregated | null;
  blockHeight: number;
};

export interface RootNodesMonitoringDataContext extends RootNodesMonitoringData{
  isInitiallyLoaded: boolean;
  isLoadingFailed: boolean;
};

export const RootNodesMonitoringContext =
  createContext<RootNodesMonitoringDataContext>({} as RootNodesMonitoringDataContext);

function RootNodesMonitoringContextProvider ({ children }: Props) {
  const { getRootMembers } = useRootNodes();
  const { indexerUrl } = useNetworkConfig();

  const [rootNodesMonitoringData, setRootNodesMonitoringData] = useState<RootNodesMonitoringData>({
    rootNodesOnchainList: [],
    rootNodesOnchainDiffList: [],
    rootNodesL0Active: null,
    rootNodesL0Proposed: null,
    rootNodesExclusionActive: null,
    rootNodesExclusionProposed: null,
    latestCosignatureMetrics: null,
    cosignatureMetrics20: null,
    cosignatureMetrics1000: null,
    qTHVotingsStats: null,
    votingsStats: null,
    proposalsStats: null,
    blockHeight: 0,
  });

  const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);
  const [isLoadingFailed, setIsLoadingFailed] = useState(false);

  const loadRootNodesMonitoringData = useCallback(async () => {
    if (!isInitiallyLoaded && isLoadingFailed) return;

    try {
      const rootNodesContract = await getRootNodesInstance();
      const [
        rootNodesL0Active,
        rootNodesL0Proposed,
        rootNodesExclusionActive,
        rootNodesExclusionProposed,
        latestCosignatureMetrics,
        cosignatureMetrics20,
        cosignatureMetrics1000,
        members,
        blockHeight,
      ] = await Promise.all([
        getRootNodesL0(indexerUrl, 'active'),
        getRootNodesL0(indexerUrl, 'proposed'),
        getRootNodesExclusion(indexerUrl, 'active'),
        getRootNodesExclusion(indexerUrl, 'proposed'),
        getCosignatureMetrics(indexerUrl, 2),
        getCosignatureMetrics(indexerUrl, 20, 10),
        getCosignatureMetrics(indexerUrl, 1000, 10),
        rootNodesContract.getMembers(),
        fetchBlockNumber(),
        getRootMembers()
      ]);

      const startBlock = blockHeight - HALF_YEAR_BLOCKS;

      const [qTHVotingsStats, votingsStats, proposalsStats] = await Promise.all([
        getRNQTHVotingsStats(indexerUrl, { startBlock }),
        getRNVotingsStats(indexerUrl, { startBlock }),
        getRNProposalsStats(indexerUrl, { startBlock }),
      ]);

      const rootNodesOnchainDiffMap = members.reduce((acc, address) => {
        acc[address] = {
          address,
          isOnchain: true,
          isL0Active: false,
        };
        return acc;
      }, {} as Record<string, RootNodesOnchainDiffItem>);

      rootNodesL0Active?.roots.forEach(({ mainAccount }) => {
        rootNodesOnchainDiffMap[mainAccount] = {
          address: mainAccount,
          isL0Active: true,
          isOnchain: rootNodesOnchainDiffMap?.[mainAccount]?.isOnchain || false,
        };
      });

      setRootNodesMonitoringData({
        rootNodesOnchainList: members,
        rootNodesOnchainDiffList: Object.values(rootNodesOnchainDiffMap),
        rootNodesL0Active,
        rootNodesL0Proposed,
        rootNodesExclusionActive,
        rootNodesExclusionProposed,
        latestCosignatureMetrics,
        cosignatureMetrics20,
        cosignatureMetrics1000,
        qTHVotingsStats,
        votingsStats,
        proposalsStats,
        blockHeight,
      });
      setIsInitiallyLoaded(true);
    } catch {
      setIsLoadingFailed(true);
    }
  }, [indexerUrl, isInitiallyLoaded, isLoadingFailed]);

  useInterval(loadRootNodesMonitoringData, 30000, { immediate: true });

  return (
    <RootNodesMonitoringContext.Provider
      value={{
        isInitiallyLoaded,
        isLoadingFailed,
        ...rootNodesMonitoringData
      }}
    >
      {children}
    </RootNodesMonitoringContext.Provider>
  );
}

export const useRootNodesMonitoringContext = () => useContext(RootNodesMonitoringContext);

export default RootNodesMonitoringContextProvider;
