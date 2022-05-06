export const accountBalance = state => state.qVault.accountBalance;
export const userBalance = state => state.qVault.userBalance;
export const votingWeight = state => state.qVault.votingWeight;
export const votingLockingEnd = state => state.qVault.votingLockingEnd;

export const updateCompoundRate = state => state.qVault.updateCompoundRate;

export const delegationList = (state) => state.qVault.delegationList;
export const loadingDelegationList = (state) => state.qVault.loadingDelegationList;
export const errorDelegationList = (state) => state.qVault.errorDelegationList;

export const receivedWeight = (state) => state.qVault.receivedWeight;
export const votingAgent = (state) => state.qVault.votingAgent;
export const isPendingDelegation = (state) => state.qVault.isPendingDelegation;
export const votingAgentPassOverTime = (state) => state.qVault.votingAgentPassOverTime;

export const qvBalance = (state) => state.qVault.qvBalance;
export const outstandingDelegationRewards = (state) => state.qVault.outstandingDelegationRewards;
export const lastClaim = (state) => state.qVault.lastClaim;

export const qVaultMinimumTimeLock = (state) => state.qVault.qVaultMinimumTimeLock;
export const qVaultTimeLocks = (state) => state.qVault.qVaultTimeLocks;
