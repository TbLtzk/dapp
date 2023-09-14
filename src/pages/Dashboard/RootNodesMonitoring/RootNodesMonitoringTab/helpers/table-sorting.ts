import {
  CosignatureStats,
  CosignatureStatus,
  L0ApprovalStatus,
  L0MembershipStatus,
  VotingParticipationStats
} from 'typings/root-nodes';

import { TableColumn } from 'components/Table';

const l0ApprovalStatusSortNumberMap: Record<L0ApprovalStatus, number> = {
  'all-signed': 2,
  'not-signed': 1,
  'not-in-list': 0,
};

const l0MembershipStatusSortNumberMap: Record<L0MembershipStatus, number> = {
  active: 2,
  proposed: 1,
  'not-in-list': 0,
};

const cosignatureStatusSortNumberMap: Record<CosignatureStatus, number> = {
  online: 2,
  'waiting-approval': 1,
  offline: 0,
};

const baseSort = (a: number, b: number, order: 'asc' | 'desc') => {
  return order === 'asc' ? a - b : b - a;
};

export const l0ApprovalStatusSortFunc: TableColumn['sortFunc'] = (a: L0ApprovalStatus, b: L0ApprovalStatus, order) => {
  const aNum = l0ApprovalStatusSortNumberMap[a];
  const bNum = l0ApprovalStatusSortNumberMap[b];

  return baseSort(aNum, bNum, order);
};

export const l0MembershipStatusSortFunc: TableColumn['sortFunc'] = (a: L0MembershipStatus, b: L0MembershipStatus, order) => {
  const aNum = l0MembershipStatusSortNumberMap[a];
  const bNum = l0MembershipStatusSortNumberMap[b];

  return baseSort(aNum, bNum, order);
};

export const cosignatureStatusSortFunc: TableColumn['sortFunc'] = (a: CosignatureStatus, b: CosignatureStatus, order) => {
  const aNum = cosignatureStatusSortNumberMap[a];
  const bNum = cosignatureStatusSortNumberMap[b];

  return baseSort(aNum, bNum, order);
};

export const cosignatureStatsSortFunc: TableColumn['sortFunc'] = (a: CosignatureStats, b: CosignatureStats, order) => {
  const aNum = a.availability;
  const bNum = b.availability;

  return baseSort(aNum, bNum, order);
};

export const votingParticipationStatsSortFunc: TableColumn['sortFunc'] = (
  a: VotingParticipationStats,
  b: VotingParticipationStats,
  order
) => {
  const aNum = a.aggregatePercentage;
  const bNum = b.aggregatePercentage;

  return baseSort(aNum, bNum, order);
};
