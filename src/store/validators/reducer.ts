import { AddressWithBalance, ValidatorsWithdrawalInfo } from '@q-dev/q-js-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ValidatorMonitoring, ValidatorStats } from 'typings/validator';

type ValidatorWithAlias = AddressWithBalance & { alias: string };
type MonitoringValidatorWithAlias = ValidatorWithAlias & ValidatorMonitoring & { rank: number };

interface ValidatorsState {
  isValidator: boolean;
  isValidatorInLongList: boolean;
  compoundRateKeeperExists: boolean;

  totalStake: string;
  delegatedStake: string;
  accountableTotalStake: string;
  accountableSelfStake: string;

  inactiveCount: number;
  inactiveCountLoading: boolean;

  validators: ValidatorWithAlias[];
  validatorsLoading: boolean;

  validatorAddressesLongList: string[];

  validatorStats: ValidatorStats[];
  validatorStatsLoading: boolean;

  validatorsMonitoring: MonitoringValidatorWithAlias[];
  validatorsMonitoringLoading: boolean;

  withdrawalInfo: ValidatorsWithdrawalInfo;
}

const initialState: ValidatorsState = {
  isValidator: false,
  isValidatorInLongList: false,
  compoundRateKeeperExists: false,

  totalStake: '0',
  delegatedStake: '0',
  accountableTotalStake: '0',
  accountableSelfStake: '0',

  inactiveCount: 0,
  inactiveCountLoading: true,

  withdrawalInfo: {
    amount: '0',
    endTime: '0',
  },

  validators: [],
  validatorsLoading: true,

  validatorAddressesLongList: [],

  validatorStats: [],
  validatorStatsLoading: true,

  validatorsMonitoring: [],
  validatorsMonitoringLoading: true,
};

const validatorsSlice = createSlice({
  name: 'validators',
  initialState,
  reducers: {
    setIsValidator: (state, { payload }: PayloadAction<boolean>) => {
      state.isValidator = payload;
    },

    setIsValidatorInLongList: (state, { payload }: PayloadAction<boolean>) => {
      state.isValidatorInLongList = payload;
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
      state.inactiveCountLoading = false;
    },

    setWithdrawalInfo: (state, { payload }: PayloadAction<ValidatorsWithdrawalInfo>) => {
      state.withdrawalInfo = payload;
    },

    setValidators: (state, { payload }: PayloadAction<ValidatorWithAlias[]>) => {
      state.validators = payload;
      state.validatorsLoading = false;
    },

    setValidatorStats: (state, { payload }: PayloadAction<ValidatorStats[]>) => {
      state.validatorStats = payload;
      state.validatorStatsLoading = false;
    },

    setValidatorsMonitoring: (state, { payload }: PayloadAction<MonitoringValidatorWithAlias[]>) => {
      state.validatorsMonitoring = payload;
      state.validatorsMonitoringLoading = false;
    },

    setValidatorAddressesLongList: (state, { payload }: PayloadAction<string[]>) => {
      state.validatorAddressesLongList = payload;
    }
  }
});

export const {
  setIsValidator,
  setIsValidatorInLongList,
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
  setValidatorAddressesLongList,
} = validatorsSlice.actions;
export default validatorsSlice.reducer;
