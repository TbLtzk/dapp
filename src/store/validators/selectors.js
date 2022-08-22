// Tables
export const validatorsShortSelector = (state) => state.validators.validatorsShort;
export const loadingValidatorsShortSelector = (state) => state.validators.loadingValidatorsShort;

export const validatorsWidenedSelector = (state) => state.validators.validatorsWidened;
export const loadingValidatorsWidenedSelector = (state) => state.validators.loadingValidatorsWidened;

export const validatorsMonitoringSelector = (state) => state.validators.validatorsMonitoring;
export const loadingValidatorsMonitoringSelector = (state) => state.validators.loadingValidatorsMonitoring;

// Inactive
export const inactiveValidatorsSelector = (state) => state.validators.inactiveValidators;

// Time locks
export const validatorsMinimumTimeLock = (state) => state.validators.validatorsMinimumTimeLock;
export const validatorsTimeLocks = (state) => state.validators.validatorsTimeLocks;

// Withdrawal Info
export const validatorWithdrawalInfo = (state) => state.validators.validatorWithdrawalInfo;

// Check User for Validator
export const isUserValidatorSelector = (state) => state.validators.isUserValidator;
export const compoundRateKeeperExistsSelector = (state) => state.validators.compoundRateKeeperExists;

// Balances
export const validatorTotalStakeSelector = (state) => state.validators.validatorTotalStake;
export const validatorDelegatedStakeSelector = (state) => state.validators.validatorDelegatedStake;
export const validatorAcountableTotalStakeSelector = (state) => state.validators.validatorAcountableTotalStake;
export const validatorAccountableSelfStakeSelector = (state) => state.validators.validatorAccountableSelfStake;
