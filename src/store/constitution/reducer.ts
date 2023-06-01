import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParameterValue } from 'typings/parameters';

interface ConstitutionState {
  constitutionParams: ParameterValue[];
  isLoadingConstitution: boolean;
  constitutionError: string;
}

const initialState: ConstitutionState = {
  constitutionParams: [],
  isLoadingConstitution: true,
  constitutionError: '',
};

const constitutionSlice = createSlice({
  name: 'constitution',
  initialState,
  reducers: {
    setConstitutionParameters: (state, { payload }: PayloadAction<ParameterValue[]>) => {
      state.constitutionParams = payload;
      state.isLoadingConstitution = false;
      state.constitutionError = '';
    },
    setConstitutionError: (state, { payload }: PayloadAction<string>) => {
      state.isLoadingConstitution = false;
      state.constitutionError = payload;
    },

  }
});

export const {
  setConstitutionParameters,
  setConstitutionError,
} = constitutionSlice.actions;
export default constitutionSlice.reducer;
