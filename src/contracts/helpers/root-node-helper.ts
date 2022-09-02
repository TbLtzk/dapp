import { orderBy, round, sumBy } from 'lodash';
import { fromWei } from 'web3-utils';

export const prepareRootMembersTable = (
  members: string[],
  membersWithStakes: { root: string; value: string }[]
) => {
  const membersWithAmount = members.map((address) => {
    const memberWithStake = membersWithStakes.find(({ root }) => root === address);
    const stakeAmount = Number(fromWei(memberWithStake?.value || '0'));
    return { address, stakeAmount };
  });

  const totalStake = sumBy(membersWithAmount, item => item.stakeAmount);
  const membersWithShare = membersWithAmount.map(({ address, stakeAmount }) => ({
    address,
    stakeAmount,
    share: totalStake ? round(stakeAmount / totalStake * 100, 2) : 0,
  }));

  return {
    table: orderBy(membersWithShare, 'stakeAmount', 'desc'),
    totalStake
  };
};
