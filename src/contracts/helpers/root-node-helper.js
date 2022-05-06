import { orderBy } from 'lodash';

import { fromWei } from 'func/balance';

export const prepareRootMembersTable = (members, membersWithStakes) => {
  let totalStake = 0;

  const membersWithAmount = members.map((member) => {
    const memberWithStake = membersWithStakes.find((mbr) => mbr.root === member);
    if (memberWithStake) {
      const stakeAmount = Number(fromWei(memberWithStake.value));
      totalStake += stakeAmount;
      return {
        address: member,
        stakeAmount
      };
    } else {
      return {
        address: member,
        stakeAmount: 0
      };
    }
  });

  const membersWithShare = membersWithAmount.map(({ address, stakeAmount }) => ({
    address,
    stakeAmount,
    share: totalStake ? Math.round(((stakeAmount * 100) / totalStake + Number.EPSILON) * 100) / 100 : 0
  }));

  return { table: orderBy(membersWithShare, ['stakeAmount'], ['desc', 'asc']), totalStake };
};
