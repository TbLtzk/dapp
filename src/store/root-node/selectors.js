export const withdrawals = (state) => state.rootContract.withdrawals;

export const isUserRootNode = (state) => state.rootContract.isUserRootNode;
export const rootNodeStake = (state) => state.rootContract.rootNodeStake;

export const rootMinimumTimeLock = (state) => state.rootContract.rootMinimumTimeLock;
export const rootTimeLocks = (state) => state.rootContract.rootTimeLocks;

export const rootMemebersTotalStakeSelector = (state) => state.rootContract.rootMemebersTotalStake;

export const rootMembersSelector = (state) => state.rootContract.rootMembers;
export const loadingRootMembersSelector = (state) => state.rootContract.loadingRootMembers;

export const rootMembersMonitoringSelector = (state) => state.rootContract.rootMembersMonitoring;
export const loadingRootMembersMonitoringSelector = (state) => state.rootContract.loadingRootMembersMonitoring;
