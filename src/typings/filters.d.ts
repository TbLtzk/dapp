export type ProposalFilterStatus = 'all' | 'active' | 'ended';

export interface ProposalFilter {
  status: ProposalFilterStatus
}
