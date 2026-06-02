import { useEffect, useMemo, useState } from 'react';

import { AliasPurpose, L0RootListItem } from '@q-dev/q-js-sdk';
import { useWeb3Context } from 'context/Web3ContextProvider';
import { ErrorHandler } from 'helpers';
import { getRootNodesL0 } from 'helpers/root-node-metrics';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { getAliasMap } from 'contracts/helpers/aliases-helper';

export type L0GovernanceEligibilityStatus =
  | 'loading'
  | 'disconnected'
  | 'wrong-network'
  | 'eligible-root'
  | 'eligible-alias'
  | 'read-only'
  | 'unknown-alias';

interface L0GovernanceEligibility {
  status: L0GovernanceEligibilityStatus;
  rootAccount?: string;
  aliasAccount?: string | null;
}

export function useL0GovernanceEligibility (): L0GovernanceEligibility {
  const { address, chainId, isConnected, isRightNetwork } = useWeb3Context();
  const { indexerUrl } = useNetworkConfig();

  const [isL0ActiveLoading, setIsL0ActiveLoading] = useState(true);
  const [rootNodesL0Active, setRootNodesL0Active] = useState<L0RootListItem | null>(null);
  const [l0RootAliasesMap, setL0RootAliasesMap] = useState<Record<string, string>>({});

  useEffect(() => {
    let isMounted = true;

    async function loadRootNodesL0Active () {
      setIsL0ActiveLoading(true);

      try {
        const activeList = await getRootNodesL0(indexerUrl, 'active');
        if (!isMounted) return;
        setRootNodesL0Active(activeList);

        const activeRoots = activeList?.roots || [];
        const rootAccounts = activeRoots.map(({ mainAccount }) => mainAccount);

        if (!rootAccounts.length) {
          setL0RootAliasesMap({});
          return;
        }

        const aliasesMap = await getAliasMap(
          rootAccounts,
          Number(chainId),
          AliasPurpose.ROOT_NODE_OPERATION
        );

        if (!isMounted) return;
        setL0RootAliasesMap(aliasesMap);
      } catch (error) {
        if (!isMounted) return;
        setRootNodesL0Active(null);
        setL0RootAliasesMap({});
        ErrorHandler.processWithoutFeedback(error);
      } finally {
        if (isMounted) {
          setIsL0ActiveLoading(false);
        }
      }
    }

    loadRootNodesL0Active();
    return () => {
      isMounted = false;
    };
  }, [chainId, indexerUrl]);

  return useMemo(() => {
    if (!isConnected || !address) return { status: 'disconnected' };
    if (!isRightNetwork) return { status: 'wrong-network' };
    if (isL0ActiveLoading) return { status: 'loading' };

    const normalizedAddress = address.toLowerCase();
    const activeRoots = rootNodesL0Active?.roots || [];
    const matchedRoot = activeRoots.find(({ mainAccount }) => mainAccount?.toLowerCase() === normalizedAddress);

    if (matchedRoot) {
      const matchedRootAlias = l0RootAliasesMap[matchedRoot.mainAccount] || null;

      return {
        status: 'eligible-root',
        rootAccount: matchedRoot.mainAccount,
        aliasAccount: matchedRootAlias
      };
    }

    const matchedAlias = activeRoots.find(({ mainAccount }) =>
      l0RootAliasesMap[mainAccount]?.toLowerCase() === normalizedAddress
    );

    if (matchedAlias) {
      const aliasAccount = l0RootAliasesMap[matchedAlias.mainAccount];
      if (!aliasAccount) {
        return {
          status: 'unknown-alias',
          rootAccount: matchedAlias.mainAccount
        };
      }

      return {
        status: 'eligible-alias',
        rootAccount: matchedAlias.mainAccount,
        aliasAccount
      };
    }

    return { status: 'read-only' };
  }, [address, isConnected, isRightNetwork, isL0ActiveLoading, l0RootAliasesMap, rootNodesL0Active]);
}
