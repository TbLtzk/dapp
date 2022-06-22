export type ProposalFilterStatus = 'all' | 'active' | 'ended';

export interface ProposalFilter {
  status: ProposalFilterStatus
}

export type FormProposalType = 'q' | 'rootNode' | 'expert' | 'slashing';
export type ProposalType = FormProposalType | 'contractUpdate';
