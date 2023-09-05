import { CosignatureStats, CosignatureStatus, L0ApprovalStatus, L0MembershipStatus } from 'typings/root-nodes';

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

export const l0ApprovalStatusSortFunc: TableColumn['sortFunc'] = (a: L0ApprovalStatus, b: L0ApprovalStatus, order) => {
  const aNum = l0ApprovalStatusSortNumberMap[a];
  const bNum = l0ApprovalStatusSortNumberMap[b];

  return order === 'asc'
    ? aNum - bNum
    : bNum - aNum;
};

export const l0MembershipStatusSortFunc: TableColumn['sortFunc'] = (a: L0MembershipStatus, b: L0MembershipStatus, order) => {
  const aNum = l0MembershipStatusSortNumberMap[a];
  const bNum = l0MembershipStatusSortNumberMap[b];

  return order === 'asc'
    ? aNum - bNum
    : bNum - aNum;
};

export const cosignatureStatusSortFunc: TableColumn['sortFunc'] = (a: CosignatureStatus, b: CosignatureStatus, order) => {
  const aNum = cosignatureStatusSortNumberMap[a];
  const bNum = cosignatureStatusSortNumberMap[b];

  return order === 'asc'
    ? aNum - bNum
    : bNum - aNum;
};

export const cosignatureStatsSortFunc: TableColumn['sortFunc'] = (a: CosignatureStats, b: CosignatureStats, order) => {
  const aNum = a.availability;
  const bNum = b.availability;

  return order === 'asc'
    ? aNum - bNum
    : bNum - aNum;
};
