import { ProposalEvent } from 'typings/contracts';

import { GetQProposals, SetQProposals } from './types';

export const getQProposals = (): GetQProposals => ({
  type: 'GET_Q_PROPOSALS'
});

export const setQProposals = (proposals: ProposalEvent[]): SetQProposals => ({
  type: 'SET_Q_PROPOSALS',
  proposals
});
