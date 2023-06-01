import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParameterValue } from 'typings/parameters';

interface ParametersState {
  contractRegistry: ParameterValue[];
  contractRegistryLoading: boolean;
  contractRegistryError: string;

  epqfiParameters: ParameterValue[];
  epqfiParametersLoading: boolean;
  epqfiParametersError: string;

  epdrParameters: ParameterValue[];
  epdrParametersLoading: boolean;
  epdrParametersError: string;

  eprsParameters: ParameterValue[];
  eprsParametersLoading: boolean;
  eprsParametersError: string;
}

const initialState: ParametersState = {
  contractRegistry: [],
  contractRegistryLoading: true,
  contractRegistryError: '',

  epqfiParameters: [],
  epqfiParametersLoading: true,
  epqfiParametersError: '',

  epdrParameters: [],
  epdrParametersLoading: true,
  epdrParametersError: '',

  eprsParameters: [],
  eprsParametersLoading: true,
  eprsParametersError: ''
};

const parametersSlice = createSlice({
  name: 'parameters',
  initialState,
  reducers: {
    setContractRegistry: (state, { payload }: PayloadAction<ParameterValue[]>) => {
      state.contractRegistry = payload;
      state.contractRegistryLoading = false;
      state.contractRegistryError = '';
    },

    setContractRegistryError: (state, { payload }: PayloadAction<string>) => {
      state.contractRegistryLoading = false;
      state.contractRegistryError = payload;
    },

    setEpqfiParameters: (state, { payload }: PayloadAction<ParameterValue[]>) => {
      state.epqfiParameters = payload;
      state.epqfiParametersLoading = false;
      state.epqfiParametersError = '';
    },

    setEpqfiParametersError: (state, { payload }: PayloadAction<string>) => {
      state.epqfiParametersLoading = false;
      state.epqfiParametersError = payload;
    },

    setEpdrParameters: (state, { payload }: PayloadAction<ParameterValue[]>) => {
      state.epdrParameters = payload;
      state.epdrParametersLoading = false;
      state.epdrParametersError = '';
    },

    setEpdrParametersError: (state, { payload }: PayloadAction<string>) => {
      state.epdrParametersLoading = false;
      state.epdrParametersError = payload;
    },

    setEprsParameters: (state, { payload }: PayloadAction<ParameterValue[]>) => {
      state.eprsParameters = payload;
      state.eprsParametersLoading = false;
      state.eprsParametersError = '';
    },

    setEprsParametersError: (state, { payload }: PayloadAction<string>) => {
      state.eprsParametersLoading = false;
      state.eprsParametersError = payload;
    },
  }
});

export const {
  setContractRegistry,
  setContractRegistryError,
  setEpqfiParameters,
  setEpqfiParametersError,
  setEpdrParameters,
  setEpdrParametersError,
  setEprsParameters,
  setEprsParametersError,
} = parametersSlice.actions;
export default parametersSlice.reducer;
