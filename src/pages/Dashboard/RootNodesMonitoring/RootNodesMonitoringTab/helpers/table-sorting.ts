import { L0ApprovalStatus, L0MembershipStatus } from 'typings/root-nodes';

import { TableColumn } from 'components/Table';

const getL0ApprovalStatusSortNumber = (status: L0ApprovalStatus) => {
  switch (status) {
    case 'all-signed':
      return 2;
    case 'not-signed':
      return 1;
    case 'not-in-list':
      return 0;
  }
};

const getL0MembershipStatusSortNumber = (status: L0MembershipStatus) => {
  switch (status) {
    case 'active':
      return 2;
    case 'proposed':
      return 1;
    case 'not-in-list':
      return 0;
  }
};

export const l0ApprovalStatusSortFunc: TableColumn['sortFunc'] = (a, b, order) => {
  const aNum = getL0ApprovalStatusSortNumber(a);
  const bNum = getL0ApprovalStatusSortNumber(b);

  return order === 'asc'
    ? aNum - bNum
    : bNum - aNum;
};

export const l0MembershipStatusSortFunc: TableColumn['sortFunc'] = (a, b, order) => {
  const aNum = getL0MembershipStatusSortNumber(a);
  const bNum = getL0MembershipStatusSortNumber(b);

  return order === 'asc'
    ? aNum - bNum
    : bNum - aNum;
};
