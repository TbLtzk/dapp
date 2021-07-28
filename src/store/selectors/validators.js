export const loadCounterSelector = (state) => state.validators.loadCounter
export const delegatorsShareSelector = (state) => state.validators.delegatorsShare
export const totalStakeSelector = (state) => state.validators.totalStake
export const ownStakeSelector = (state) => state.validators.ownStake
export const delegatedStakeSelector = (state) => state.validators.delegatedStake
export const accTotalStakeSelector = (state) => state.validators.accTotalStake
export const interestRateSelector = (state) => state.validators.interestRate

export const loadingMembers = (state) => state.validators.loadingMembers
export const validatorMembers = (state) => state.validators.validatorMembers
export const errorMembers = (state) => state.validators.errorMembers

export const isUserValidator = (state) => state.validators.isUserValidator
