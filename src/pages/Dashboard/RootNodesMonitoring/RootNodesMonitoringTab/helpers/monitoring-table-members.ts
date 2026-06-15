import { OnchainRootNodeMetric } from '@q-dev/q-js-sdk';

import { RootNodeMember } from 'store/root-nodes/reducer';

export interface MonitoringTableDiffItem {
  address: string;
  isOnchain: boolean;
  isL0Active: boolean;
}

export interface MonitoringTableMember {
  address: string;
  alias?: string;
  metric?: OnchainRootNodeMetric;
  isOnchain: boolean;
  isL0Active: boolean;
}

export function buildMonitoringTableMembers (
  diffList: MonitoringTableDiffItem[],
  rootMembers: RootNodeMember[],
): MonitoringTableMember[] {
  const rootMembersByAddress = new Map(
    rootMembers.map((member) => [member.address.toLowerCase(), member]),
  );

  return diffList
    .map(({ address, isOnchain, isL0Active }) => {
      const onchainMember = rootMembersByAddress.get(address.toLowerCase());

      return {
        address,
        alias: onchainMember?.alias,
        metric: onchainMember?.metric,
        isOnchain,
        isL0Active,
      };
    })
    .sort((left, right) => {
      const leftJoinTime = left.metric?.attributes.startTime;
      const rightJoinTime = right.metric?.attributes.startTime;

      if (leftJoinTime != null && rightJoinTime != null && leftJoinTime !== rightJoinTime) {
        return leftJoinTime - rightJoinTime;
      }

      if (leftJoinTime != null && rightJoinTime == null) {
        return -1;
      }

      if (leftJoinTime == null && rightJoinTime != null) {
        return 1;
      }

      return left.address.localeCompare(right.address);
    });
}
