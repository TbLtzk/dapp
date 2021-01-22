export const rootMembersData = state => state.rootContract.rootMembersData;
export const rootMembersAmountStakes = state => state.rootContract.rootMembersAmountStakes;
export const loadingRootMembers = state => state.rootContract.loadingRootMembers;
export const errorM = state => state.rootContract.errorM;

export const isUserRootNode = state => state.rootContract.isUserRootNode;
export const loadingCheckingRootNode = state => state.rootContract.loadingCheckingRootNode;

export const rootNodeStake = state => state.rootContract.rootNodeStake;

export const stakeToPanelTransId = state => state.rootContract.stakeToPanelTransId;
export const announceWithdrawTransId = state => state.rootContract.announceWithdrawTransId;
export const withdrawTransId = state => state.rootContract.withdrawTransId;

export const withdrawals = state => state.rootContract.withdrawals;
