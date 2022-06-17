import { RootState } from 'store';

export const newParameterSelector = (state: RootState) => state.proposals.newParameter;
export const voteDetailsSelector = (state: RootState) => state.proposals.voteDetails;

export const constitutionHash = (state: RootState) => state.proposals.constitutionHash;
export const baseVotingWeightInfoSelector = (state: RootState) => state.proposals.baseVotingWeightInfo;
