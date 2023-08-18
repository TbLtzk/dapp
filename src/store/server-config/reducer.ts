import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ServerFeaturesMap {
  savingAndBorrowing: boolean;
};

interface ServerConfigState {
  features: ServerFeaturesMap;
}

const initialState: ServerConfigState = {
  features: {
    savingAndBorrowing: false,
  },
};

const serverConfigSlice = createSlice({
  name: 'server-config',
  initialState,
  reducers: {
    setFeatures: (state, { payload }: PayloadAction<ServerFeaturesMap>) => {
      state.features = payload;
    },
  }
});

export const { setFeatures } = serverConfigSlice.actions;
export default serverConfigSlice.reducer;
