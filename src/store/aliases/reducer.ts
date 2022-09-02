import { Alias } from '@q-dev/q-js-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AliasEvent } from 'typings/validator';

interface AliasesState {
  isAliasesLoading: boolean;
  aliases: Alias[];
  isEventsLoading: boolean;
  events: AliasEvent[];
}

const initialState: AliasesState = {
  isAliasesLoading: false,
  isEventsLoading: false,
  aliases: [],
  events: []
};

const aliasesSlice = createSlice({
  name: 'aliases',
  initialState,
  reducers: {
    setAliases (state, { payload }: PayloadAction<Alias[]>) {
      state.aliases = payload;
    },
    setAliasesLoading (state, { payload }: PayloadAction<boolean>) {
      state.isAliasesLoading = payload;
    },
    setAliasEvents (state, { payload }: PayloadAction<AliasEvent[]>) {
      state.events = payload;
    },
    setEventsLoading (state, { payload }: PayloadAction<boolean>) {
      state.isEventsLoading = payload;
    }
  },
});

export const {
  setAliases,
  setAliasEvents,
  setAliasesLoading,
  setEventsLoading
} = aliasesSlice.actions;
export default aliasesSlice.reducer;
