import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

import { L0ExclusionListItem, L0RootListItem, RootNodeMetric } from '@q-dev/q-js-sdk';
import { useInterval } from '@q-dev/react-hooks';
import { getCosignatureMetrics, getRootNodesExclusion, getRootNodesL0 } from 'helpers/root-node-metrics';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { useRootNodes } from 'store/root-nodes/hooks';

import { getRootNodesInstance } from 'contracts/contract-instance';
import { fetchBlockNumber } from 'contracts/helpers/block-number';

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
  rootNodesL0Active:L0RootListItem | null;
  rootNodesL0Proposed: L0RootListItem | null;
  rootNodesExclusionActive: L0ExclusionListItem | null;
  rootNodesExclusionProposed: L0ExclusionListItem | null;
  latestCosignatureMetrics: RootNodeMetric | null;
  cosignatureMetrics20: RootNodeMetric | null;
  cosignatureMetrics1000: RootNodeMetric | null;
  blockHeight: number;
  isInitiallyLoaded: boolean;
  isLoadingFailed: boolean;
};

export const RootNodesMonitoringContext = createContext<RootNodesMonitoringData>({} as RootNodesMonitoringData);

function RootNodesMonitoringContextProvider ({ children }: Props) {
  const { getRootMembers } = useRootNodes();

  const [rootNodesOnchainDiffList, setRootNodesOnchainDiffList] = useState<RootNodesOnchainDiffItem[]>([]);
  const [rootNodesL0Active, setRootNodesL0Active] = useState<L0RootListItem | null>(null);
  const [rootNodesL0Proposed, setRootNodesL0Proposed] = useState<L0RootListItem | null>(null);
  const [rootNodesExclusionActive, setRootNodesExclusionActive] = useState<L0ExclusionListItem | null>(null);
  const [rootNodesExclusionProposed, setRootNodesExclusionProposed] = useState<L0ExclusionListItem | null>(null);
  const [rootNodesOnchainList, setRootNodesOnchainList] = useState<string[]>([]);
  const [latestCosignatureMetrics, setLatestCosignatureMetrics] = useState<RootNodeMetric | null>(null);
  const [cosignatureMetrics20, setCosignatureMetrics20] = useState<RootNodeMetric | null>(null);
  const [cosignatureMetrics1000, setCosignatureMetrics1000] = useState<RootNodeMetric | null>(null);
  const [blockHeight, setBlockHeight] = useState<number>(0);
  const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);
  const [isLoadingFailed, setIsLoadingFailed] = useState(false);
  const { indexerUrl } = useNetworkConfig();

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

      setRootNodesOnchainList(members);
      setRootNodesL0Active(rootNodesL0Active);
      setRootNodesL0Proposed(rootNodesL0Proposed);
      setRootNodesExclusionActive(rootNodesExclusionActive);
      setRootNodesExclusionProposed(rootNodesExclusionProposed);
      setRootNodesOnchainDiffList(Object.values(rootNodesOnchainDiffMap));
      setLatestCosignatureMetrics(latestCosignatureMetrics);
      setCosignatureMetrics20(cosignatureMetrics20);
      setCosignatureMetrics1000(cosignatureMetrics1000);
      setBlockHeight(blockHeight);
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
        rootNodesOnchainDiffList,
        rootNodesL0Active,
        rootNodesL0Proposed,
        rootNodesOnchainList,
        rootNodesExclusionActive,
        rootNodesExclusionProposed,
        latestCosignatureMetrics,
        cosignatureMetrics20,
        cosignatureMetrics1000,
        blockHeight,
      }}
    >
      {children}
    </RootNodesMonitoringContext.Provider>
  );
}

export const useRootNodesMonitoringContext = () => useContext(RootNodesMonitoringContext);

export default RootNodesMonitoringContextProvider;
