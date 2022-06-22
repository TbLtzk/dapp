export interface OnEscrowCastObjection {
  type: 'ESCROW_CAST_OBJECTION'
  data: any
  contractName: string
  proposalId: string
}

export interface OnEscrowProposeDecision {
  type: 'ESCROW_PROPOSE_DECISION'
  data: any
  contractName: string
  proposalId: string
}

export interface OnEscrowProposerRemark {
  type: 'ESCROW_PROPOSER_REMARK'
  data: any
  contractName: string
  proposalId: string
}

export interface OnEscrowRecallProposeDecision {
  type: 'ESCROW_RECALL_PROPOSE_DECISION'
  contractName: string,
  proposalId: string
}

export interface OnEscrowConfirmDecision {
  type: 'ESCROW_CONFIRM_DECISION'
  contractName: string
  proposalId: string
}

export interface SetEscrowAction {
  type: 'SET_ESCROW_ACTION'
  contractName: string
  proposalId: string
  escrowType: string
}

export interface SetPurgeSlashing {
  type: 'SET_PURGE_SLASHING'
  slashingAddress: string
  contractType: string
}
