export const loadCounterSelector = (state) => state.validators.loadCounter;
export const delegatorsShareSelector = (state) => state.validators.delegatorsShare;
export const totalStakeSelector = (state) => state.validators.totalStake;
export const ownStakeSelector = (state) => state.validators.ownStake;
export const delegatedStakeSelector = (state) => state.validators.delegatedStake;
export const accountableTotalStake = (state) => state.validators.accountableTotalStake;
export const interestRateSelector = (state) => state.validators.interestRate;
export const selfStake = (state) => state.validators.selfStake;
export const isUserValidator = (state) => state.validators.isUserValidator;
export const validatorsMinimumTimeLock = (state) => state.validators.validatorsMinimumTimeLock;
export const validatorsTimeLocks = (state) => state.validators.validatorsTimeLocks;
export const validatorWithdrawalInfo = (state) => state.validators.validatorWithdrawalInfo;
export const compoundRateKeeperExistsSelector = (state) => state.validators.compoundRateKeeperExists;

export const validatorsShortSelector = (state) => state.validators.validatorsShort;
export const loadingValidatorsShortSelector = (state) => state.validators.loadingValidatorsShort;

export const validatorsWidenedSelector = (state) => state.validators.validatorsWidened;
export const loadingValidatorsWidenedSelector = (state) => state.validators.loadingValidatorsWidened;

export const validatorsMonitoringSelector = (state) => state.validators.validatorsMonitoring;
export const loadingValidatorsMonitoringSelector = (state) => state.validators.loadingValidatorsMonitoring;
