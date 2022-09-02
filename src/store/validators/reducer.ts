import { AddressWithBalance, TimeLockEntry, ValidatorsWithdrawalInfo } from '@q-dev/q-js-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Validator, ValidatorMonitoring } from 'typings/validator';

type ValidatorWithAlias = AddressWithBalance & { alias: string };

interface ValidatorsState {
  isValidator: boolean;
  compoundRateKeeperExists: boolean;

  totalStake: string;
  delegatedStake: string;
  accountableTotalStake: string;
  accountableSelfStake: string;

  inactiveCount: number;
  withdrawalInfo: ValidatorsWithdrawalInfo;

  validators: ValidatorWithAlias[];
  validatorsLoading: boolean;

  validatorStats: Validator[];
  validatorStatsLoading: boolean;

  validatorsMonitoring: ValidatorMonitoring[];
  validatorsMonitoringLoading: boolean;

  timeLocks: TimeLockEntry[];
  minimumTimeLock: string;
}

const initialState: ValidatorsState = {
  isValidator: false,
  compoundRateKeeperExists: false,

  totalStake: '0',
  delegatedStake: '0',
  accountableTotalStake: '0',
  accountableSelfStake: '0',

  inactiveCount: 0,
  withdrawalInfo: {
    amount: '0',
    endTime: '0',
  },

  validators: [],
  validatorsLoading: true,

  validatorStats: [],
  validatorStatsLoading: true,

  validatorsMonitoring: [],
  validatorsMonitoringLoading: true,

  timeLocks: [],
  minimumTimeLock: '0',
};

const validatorsSlice = createSlice({
  name: 'validators',
  initialState,
  reducers: {
    setIsValidator: (state, { payload }: PayloadAction<boolean>) => {
      state.isValidator = payload;
    },

    setCompoundRateKeeperExists: (state, { payload }: PayloadAction<boolean>) => {
      state.compoundRateKeeperExists = payload;
    },

    setTotalStake: (state, { payload }: PayloadAction<string>) => {
      state.totalStake = payload;
    },

    setDelegatedStake: (state, { payload }: PayloadAction<string>) => {
      state.delegatedStake = payload;
    },

    setAccountableTotalStake: (state, { payload }: PayloadAction<string>) => {
      state.accountableTotalStake = payload;
    },

    setAccountableSelfStake: (state, { payload }: PayloadAction<string>) => {
      state.accountableSelfStake = payload;
    },

    setInactiveCount: (state, { payload }: PayloadAction<number>) => {
      state.inactiveCount = payload;
    },

    setWithdrawalInfo: (state, { payload }: PayloadAction<ValidatorsWithdrawalInfo>) => {
      state.withdrawalInfo = payload;
    },

    setValidators: (state, { payload }: PayloadAction<ValidatorWithAlias[]>) => {
      state.validators = payload;
      state.validatorsLoading = false;
    },

    setValidatorStats: (state, { payload }: PayloadAction<Validator[]>) => {
      state.validatorStats = payload;
      state.validatorStatsLoading = false;
    },

    setValidatorsMonitoring: (state, { payload }: PayloadAction<ValidatorMonitoring[]>) => {
      state.validatorsMonitoring = payload;
      state.validatorsMonitoringLoading = false;
    },

    setTimeLocks: (state, { payload }: PayloadAction<TimeLockEntry[]>) => {
      state.timeLocks = payload;
    },

    setMinimumTimeLock: (state, { payload }: PayloadAction<string>) => {
      state.minimumTimeLock = payload;
    }
  }
});

export const {
  setIsValidator,
  setCompoundRateKeeperExists,
  setTotalStake,
  setDelegatedStake,
  setAccountableTotalStake,
  setAccountableSelfStake,
  setInactiveCount,
  setWithdrawalInfo,
  setValidators,
  setValidatorStats,
  setValidatorsMonitoring,
  setTimeLocks,
  setMinimumTimeLock,
} = validatorsSlice.actions;
export default validatorsSlice.reducer;
