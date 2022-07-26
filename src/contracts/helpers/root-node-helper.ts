import { orderBy } from 'lodash';

import { fromWei } from 'func/balance';

export const prepareRootMembersTable = (
  members: string[],
  membersWithStakes: { root: string, value: string }[]
) => {
  let totalStake = 0;

  const membersWithAmount: { address: string, stakeAmount: number }[] = [];
  members.forEach((member) => {
    const memberWithStake = membersWithStakes.find(({ root }) => root === member);
    if (memberWithStake) {
      const stakeAmount = Number(fromWei(memberWithStake.value));
      totalStake += stakeAmount;
      membersWithAmount.push({
        address: member,
        stakeAmount,
      });
    }
  });

  const membersWithShare = membersWithAmount.map(({ address, stakeAmount }) => ({
    address,
    stakeAmount,
    share: totalStake ? Math.round(((stakeAmount * 100) / totalStake + Number.EPSILON) * 100) / 100 : 0,
  }));

  return {
    table: orderBy(membersWithShare, ['stakeAmount'], ['desc', 'asc']),
    totalStake
  };
};
