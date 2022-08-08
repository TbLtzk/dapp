export enum ObjectionStatus {
  NONE = '0',
  OPEN = '1',
  ACCEPTED = '2',
  PENDING = '3',
  DECIDED = '4',
  EXECUTED = '5',
};

export const slashingTypes = {
  castObjection: 'cast-objection',
  proposerRemark: 'proposer-remark',
  proposeDecision: 'propose-decision'
};

export const escrowTypes = {
  confirm: 'confirm',
  recall: 'recall',
  execute: 'execute'
};
